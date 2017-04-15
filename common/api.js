import fetch from 'isomorphic-fetch';
import config from '../server/config';

const headers = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
};

export const fetchUser = () => {
  return fetch(`http://${config.apiHost}/api/user`, {
    method: 'GET',
    credentials: 'include',
    headers,
  })
  .then((res) => {
    if (res.status === 401) {
      console.log('unauthorized');
      return {};
    } else {
      return res.json();
    }
  });
};

export const saveGroup = (group) => {
  return fetch(`http://${config.apiHost}/api/group`, {
    method: 'POST',
    mode: 'cors',
    credentials: 'include',
    headers,
    body: JSON.stringify(group),
  })
  .then((res) => {
    if (res.status === 401) {
      return {};
    } else {
      return res.json();
    }
  });
};
