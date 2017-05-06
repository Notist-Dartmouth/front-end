import * as types from '../constants/ActionTypes';
import * as api from '../api';

function handleSaveGroupSuccess(group) {
  return {
    type: types.RECEIVE_GROUP,
    group,
  };
}

export function saveGroup(group) {
  return (dispatch, getState) =>
    api.saveGroup(group)
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

export function fetchUser() {
  return (dispatch, getState) => {
    api.fetchUser().then((user) => {
      dispatch(updateUser(user.groups, user.username));
    });
  };
}

export function updateAuthStatus(isAuthenticated) {
  return {
    type: types.UPDATE_AUTH_STATUS,
    isAuthenticated,
  };
}
