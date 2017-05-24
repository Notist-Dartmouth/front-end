import * as types from '../constants/ActionTypes';
import * as api from '../api';
import { fetchPublicGroups } from '../routes/PostList/actions';

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
        if (savedGroup.SUCCESS.isPublic) {
          dispatch(fetchPublicGroups());
        }
      } // TODO handle error
    });
}

export function updateUser(groups, username, _id, bio, usersFollowingMe, usersIFollow, exploreNumber, numExplorations, exploreStandardDev) {
  return {
    type: types.UPDATE_USER,
    groups,
    name,
    _id,
    bio,
    usersFollowingMe,
    usersIFollow,
    exploreNumber,
    numExplorations,
    exploreStandardDev,
  };
}

export function fetchUser() {
  return (dispatch, getState) => {
    api.fetchUser().then((user) => {
      dispatch(updateUser(user.groups, user.username, user._id, user.bio, user.usersFollowingMe, user.usersIFollow, user.exploreNumber, user.numExplorations, user.exploreStandardDev));
    });
  };
}

function handleRecentAnnotations(recentAnnotations) {
  return {
    type: 'GET_RECENT_ANNOTATIONS',
    recentAnnotations,
  };
}

export function getRecentUserAnnotations(userId) {
  console.log(`userId inside getRecent is${userId}`);
  return (dispatch) => {
    api.getRecentUserAnnotations(userId).then((recentAnnotations) => {
      dispatch(handleRecentAnnotations(recentAnnotations));
    });
  };
}

export function updateAuthStatus(isAuthenticated) {
  return {
    type: types.UPDATE_AUTH_STATUS,
    isAuthenticated,
  };
}
