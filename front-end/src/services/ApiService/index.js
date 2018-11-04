import axios from 'axios';
import { push } from 'connected-react-router';
import querystring from 'querystring';

import store from '@Root/store';

export const client = axios.create({
  baseURL: window.location.href,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers':
      'Origin, X-Requested-With, Content-Type, Accept',
  },
  paramsSerializer: p => {
    const params = { ...p };

    return querystring.stringify(params, '&', '=', { arrayFormat: 'repeat' });
  },
});

const request = (options, byPassError) => {
  const onSuccess = response => {
    const { data } = response;

    return typeof data.data === 'undefined' ? data : data.data;
  };

  const onError = error => {
    if (error.response) {
      // Request was made but server responded with 403
      if (!byPassError && error.response.status === 401) {
        // Log out user if API call fails.

        store.dispatch(push('/'));

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
