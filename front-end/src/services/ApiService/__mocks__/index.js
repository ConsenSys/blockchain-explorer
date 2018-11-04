import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import createHistory from 'history/createBrowserHistory';
import querystring from 'querystring';

const browserHistory = createHistory();
export const client = axios.create({
  baseURL: window.location.href,
  headers: { 'Content-Type': 'application/json' },
  paramsSerializer: params =>
    querystring.stringify({ ...params }, '&', '=', { arrayFormat: 'repeat' }),
});

export const mock = new MockAdapter(client);

const request = (options, byPassError) => {
  const onSuccess = response => response.data;

  const onError = error => {
    if (error.response) {
      // Request was made but server responded with 403
      if (!byPassError && error.response.status === 401) {
        // Log out user if API call fails.
        browserHistory.replace('/');
        return {};
      }
    } else {
      // eslint-disable-next-line no-console
      console.error('Error Message:', error.message);
    }

    return Promise.reject(error.response || error.message);
  };

  return client(options)
    .then(onSuccess)
    .catch(onError);
};

export default request;
