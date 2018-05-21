const host = 'https://epiblog-api.herokuapp.com';

function get(path) {
  return fetch(`${host}${path}`)
    .then(response => response.json());
}

module.exports.api = {
  get,
};
