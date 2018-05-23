import https from 'https';
import LocalStorage from 'localStorage';

const querystring = require('querystring');

const globalHeaders = {};
const RequestHandler = https;

class ApiCallLib {
  /**
   * Ajoute des header pour toutes les requêtes envoyées
   * @param {string} key - le nom du header
   * @param {string} value - la valeur du header
   */
  static setGlobalHeader(key, value) {
    globalHeaders[key] = value;
  }

  /**
   * requête DELETE
   * @param {string} path - le chemin
   * @returns {Promise.<Object>}
   */
  destroy(path) {
    return this.request(path, 'DELETE');
  }

  /**
   * requête GET
   * @param {string} path - le chemin
   * @returns {Promise.<Object>}
   */
  get(path) {
    return this.request(path, 'GET');
  }

  /**
   * requête POST
   * @param {string} path - le chemin
   * @returns {Promise.<Object>}
   */
  post(path, data) {
    return this.request(path, 'POST', data);
  }

  /**
   * requête PUT
   * @param {string} path - le chemin
   * @returns {Promise.<Object>}
   */
  put(path, data) {
    return this.request(path, 'PUT', data);
  }

  /**
   * renvoie les header à ajouter à la requête
   * @param {object} data - le corps de la requête
   * @param multipart
   * @returns {*}
   * @private
   */
  getHeaders(data) {
    const token = LocalStorage.getItem('token');
    const headers = {
    };
    if (data) {
      const postData = querystring.stringify(data);
      headers['Content-Length'] = Buffer.byteLength(postData);
    }
    headers['Content-Type'] = 'application/json';
    if (token) {
      headers['x-authentication-token'] = token;
    }
    return Object.assign(headers, globalHeaders);
  }

  /**
   * envoie une requête vers une url distante
   * @param {string} path - le chemin
   * @param {string} method - la méthode http
   * @param {object} [dataToSend] - le corps de la requête si besoin
   * @returns {Promise.<object>} - renvoie la réponse
   * @private
   */
  request(path, method, dataToSend) {
    const jsonBody = JSON.stringify(dataToSend);

    const options = {
      headers: this.getHeaders(jsonBody),
      protocol: 'https:',
      host: 'epiblog-api.herokuapp.com',
      path,
      method,
    };

    return new Promise((resolve, reject) => {
      const req = https.request(options, (response) => {
        let fullData = '';
        response.on('data', (chunk) => {
          if (!/^20\d$/.test(response.statusCode)) {
            // if (ApiCallLib.IsJsonString(chunk)) {
            return reject(JSON.parse(chunk));
            // } else {
            //   console.log(chunk);
            //   return (reject(true));
            // }
          }

          fullData += chunk;
        });

        response.on('end', () => {
          if (!/^20\d$/.test(response.statusCode)) {
            return reject(response.statusCode === 0 ? new Error('Error got an http status 0') : response.statusCode);
          }

          return resolve(ApiCallLib.tryParseJSON(fullData));
        });
      });

      req.on('error', e => reject(e));
      if (jsonBody) {
        req.write(jsonBody);
      }

      req.end();
    });
  }

  /**
   * parse du JSON
   * @param {string} data - les données à parser
   * @returns {object|string} - renvoie la valeur en string ou l'objet JSON
   * @private
   */
  static tryParseJSON(data) {
    console.log(data);

    let result = data;
    try {
      result = JSON.parse(data);
    } catch (ex) {
      return (result || '').toString();
    }

    return result;
  }

  static IsJsonString(str) {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  }
}

export default ApiCallLib;
