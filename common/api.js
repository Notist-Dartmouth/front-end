import 'isomorphic-fetch';
import URLSearchParams from 'url-search-params';
import config from '../server/config';


const headers = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  Accept: 'application/json',
};

const handleUnauthorizedRequest = () => {
  if (window.location.host !== 'localhost:5000') { window.location = 'https://notist.io/login'; } // If not in dev mode then redirect
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
  const endpointString = `${config.apiHost}/api/article/annotations`;
  const annotationsEndpoint = new URL(endpointString);
  annotationsEndpoint.search = new URLSearchParams(`?uri=${articleURI}`);
  return fetch(annotationsEndpoint, {
    method: 'GET',
    credentials: 'include',
    headers,
  })
  .then(res => handleResponse(res));
};

export const fetchExploreArticles = () => {
  return fetch(`${config.apiHost}/api/explore`, {
    method: 'GET',
    credentials: 'include',
    headers,
  }).then(res => handleResponse(res));
};

export const fetchUser = () => {
  return fetch(`${config.apiHost}/api/user`, {
    method: 'GET',
    credentials: 'include',
    headers,
  }).then(res => handleResponse(res));
};

export const fetchPublicArticles = () => {
  return fetch(`${config.apiHost}/api/public/articles/paginated`, {
    method: 'GET',
    credentials: 'include',
    headers,
  }).then(res => handleResponse(res));
};

export const fetchGroupArticles = (groupId) => {
  return fetch(`${config.apiHost}/api/group/${groupId}/articles`, {
    method: 'GET',
    credentials: 'include',
    headers,
  })
  .then(res => handleResponse(res));
};

export const saveGroup = (group) => {
  return fetch(`${config.apiHost}/api/group`, {
    method: 'POST',
    mode: 'cors',
    credentials: 'include',
    headers,
    body: JSON.stringify(group),
  })
  .then(res => handleResponse(res));
};

export const getGroupMembers = (groupId) => {
  return fetch(`${config.apiHost}/api/group/${groupId}/members`, {
    method: 'GET',
    credentials: 'include',
    headers,
  })
  .then(res => handleResponse(res));
};

export const fetchPublicGroups = () => {
  return fetch(`${config.apiHost}/api/public/groups`, {
    method: 'GET',
    credentials: 'include',
    headers,
  }).then(res => handleResponse(res));
};

export const editAnnotation = (annotationId, text) => { // Where do I add the body text to this? Is it a header or... ?
  return fetch(`${config.apiHost}/api/annotation/${annotationId}/edit`, {
    method: 'POST',
    credentials: 'include',
    headers,
    body: JSON.stringify({ text }),
  }).then(res => handleResponse(res));
};

export const deleteAnnotation = (annotationId) => {
  return fetch(`${config.apiHost}/api/annotation/${annotationId}`, {
    method: 'DELETE',
    credentials: 'include',
    headers,
  }).then(res => handleResponse(res));
};

export const saveReply = (text, parent, articleURI) => {
  return fetch(`${config.apiHost}/api/annotation`, {
    method: 'POST',
    credentials: 'include',
    headers,
    body: JSON.stringify({
      text,
      parent,
      groups: [], // TODO save reply to groups
      uri: articleURI,
    }),
  })
  .then(res => handleResponse(res));
};

export const toggleGroupMembership = (groupId, userId) => { // ?userId=USERB.id
  return fetch(`${config.apiHost}/api/group/${groupId}/user?userId=${userId}`, {
    method: 'POST',
    credentials: 'include',
    headers,
  }).then(res => handleResponse(res));        // '/api/group/:groupId/user'
};
