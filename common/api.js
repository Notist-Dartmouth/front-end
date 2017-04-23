import fetch from 'isomorphic-fetch';
import { URL } from 'isomorphic-url';
import URLSearchParams from 'url-search-params';
import config from '../server/config';


const headers = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
};

const handleUnauthorizedRequest = () => {
  console.log('unauthorized');
  return { ERROR: 'Unauthorized: you must be logged in' };
};

const handleResponse = (res) => {
  if (res.status === 401) {
    return handleUnauthorizedRequest();
  } else {
    return res.json();
  }
};

export const fetchArticleAnnotations = (articleURI) => {
  const annotationsEndpoint = new URL(`http://${config.apiHost}/api/articles/annotations`);
  annotationsEndpoint.search = new URLSearchParams(`?uri=${articleURI}`);
  return fetch(annotationsEndpoint, {
    method: 'GET',
    credentials: 'include',
    headers,
  })
  .then(res => handleResponse(res));
};

export const fetchUser = () => {
  return fetch(`http://${config.apiHost}/api/user`, {
    method: 'GET',
    credentials: 'include',
    headers,
  })
  .then(res => handleResponse(res));
};

export const fetchGroupArticles = (groupId) => {
  return fetch(`http://${config.apiHost}/api/group/${groupId}/articles`, {
    method: 'GET',
    credentials: 'include',
    headers,
  })
  .then(res => handleResponse(res));
};

export const saveGroup = (group) => {
  return fetch(`http://${config.apiHost}/api/group`, {
    method: 'POST',
    mode: 'cors',
    credentials: 'include',
    headers,
    body: JSON.stringify(group),
  })
  .then(res => handleResponse(res));
};
