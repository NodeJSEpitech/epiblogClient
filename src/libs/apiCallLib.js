import https from 'https';
import LocalStorage from 'localStorage';

const querystring = require('querystring');

const globalHeaders = {};

/**
 * renvoie les header à ajouter à la requête
 * @param {object} data - le corps de la requête
 * @param multipart
 * @returns {*}
 * @private
 */
function getHeaders(data) {
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
 * parse du JSON
 * @param {string} data - les données à parser
 * @returns {object|string} - renvoie la valeur en string ou l'objet JSON
 * @private
 */
function tryParseJSON(data) {
  let result = data;
  try {
    result = JSON.parse(data);
  } catch (ex) {
    return (result || '').toString();
  }

  return result;
}
/**
 * envoie une requête vers une url distante
 * @param {string} path - le chemin
 * @param {string} method - la méthode http
 * @param {object} [dataToSend] - le corps de la requête si besoin
 * @returns {Promise.<object>} - renvoie la réponse
 * @private
 */
function request(path, method, dataToSend) {
  const jsonBody = JSON.stringify(dataToSend);

  const options = {
    headers: getHeaders(jsonBody),
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
        return true;
      });

      response.on('end', () => {
        if (!/^20\d$/.test(response.statusCode)) {
          return reject(response.statusCode === 0 ? new Error('Error got an http status 0') : response.statusCode);
        }

        return resolve(tryParseJSON(fullData));
      });
    });

    req.on('error', e => reject(e));
    if (jsonBody) {
      req.write(jsonBody);
    }

    return req.end();
  });
}

/**
 * requête DELETE
 * @param {string} path - le chemin
 * @returns {Promise.<Object>}
 */
function destroy(path) {
  return request(path, 'DELETE');
}

/**
 * requête GET
 * @param {string} path - le chemin
 * @returns {Promise.<Object>}
 */
function get(path) {
  return request(path, 'GET');
}

/**
 * requête POST
 * @param {string} path - le chemin
 * @returns {Promise.<Object>}
 */
function post(path, data) {
  return request(path, 'POST', data);
}

/**
 * requête PUT
 * @param {string} path - le chemin
 * @returns {Promise.<Object>}
 */
function put(path, data) {
  return request(path, 'PUT', data);
}

export default {
  destroy,
  get,
  post,
  put,
};
