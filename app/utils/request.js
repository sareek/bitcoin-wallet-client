import "whatwg-fetch";

/**
 * Parses the JSON returned by a network request
 *
 * @param  {object} response A response from a network request
 *
 * @return {object}          The parsed JSON from the request
 */
function parseJSON(response) {
  if (response.status === 204 || response.status === 205) {
    return null;
  }
  return response.json();
}

/**
 * Checks if a network request came back fine, and throws an error if not
 *
 * @param  {object} response   A response from a network request
 *
 * @return {object|undefined} Returns either the response, or throws an error
 */
function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  if (response.status === 401 && window.location.pathname !== '/login') {
    localStorage.clear();
    window.location.reload();
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

export function requestJSON(url, options) {
  if (options === undefined) {
    options = {}; // eslint-disable-line no-param-reassign
  }
  // To send the cookies for same domain
  options.credentials = "same-origin"; // eslint-disable-line no-param-reassign

  return fetch(url, options)
  .then(checkStatus)
  .then(parseJSON)
    .catch(err => {
      if (err.message === 'Failed to fetch') {
        throw new Error('internet error');
      }
      throw err;
    });
}

/**
 * Requests a URL, returning a promise
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 *
 * @return {object}           The response data
 */
export function request(url, options) {
  return fetch(url, options)
  .then(checkStatus)
  .then(parseJSON)
  .catch(err => {
    if (err.message === 'Failed to fetch') {
      throw new Error('internet error');
    }
    throw err;
  });
}

export default request;
