import 'whatwg-fetch';
import * as types from '../constants/ActionTypes';
import config from '../../server/config';

const headers = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
};

function handleSaveGroupSuccess(group) {
  return {
    type: types.RECEIVE_GROUP,
    group,
  };
}

export default function saveGroup(group) {
  return (dispatch, getState) =>
    fetch(`http://${config.apiHost}/api/group`, {
      method: 'POST',
      mode: 'cors',
      credentials: 'include',
      headers,
      body: JSON.stringify(group),
    })
    .then(res => res.json())
    .then((savedGroup) => {
      if (savedGroup.SUCCESS) {
        dispatch(handleSaveGroupSuccess(savedGroup.SUCCESS));
      } // TODO handle error
    });
}

export function updateUser(groups, username) {
  return {
    type: types.UPDATE_USER,
    groups,
    username,
  };
}

export function updateAuthStatus(isAuthenticated) {
  return {
    type: types.UPDATE_AUTH_STATUS,
    isAuthenticated,
  };
}

export function fetchUser() {
  return (dispatch, getState) => {
    const { isFetchingUser } = getState().user;
    if (isFetchingUser) {
      return Promise.resolve();
    } else {
      return fetch(`http://${config.apiHost}/api/user`, {
        method: 'GET',
        credentials: 'include',
        headers,
      })
      .then((res) => {
        if (res.status === 401) {
          dispatch(updateAuthStatus(false));
          return {};
        } else {
          return res.json();
        }
      })
      .then((user) => {
        if (user.groups && user.username) {
          dispatch(updateUser(user.groups, user.username));
          dispatch(updateAuthStatus(true));
        }
      });
    }
  };
}
