import * as types from '../../constants/ActionTypes';
import * as api from '../../api';

function loadAnnotationsRequest() {
  return {
    type: types.LOAD_ANNOTATIONS_REQUEST,
  };
}

function loadAnnotationsFailure(error) {
  return {
    type: types.LOAD_ANNOTATIONS_FAILURE,
    error,
  };
}

function loadAnnotationsSuccess(annotations) {
  return {
    type: types.LOAD_ANNOTATIONS_SUCCESS,
    annotations,
  };
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

function loadAnnotations(articleURI) {
  return (dispatch, getState) => {
    dispatch(loadAnnotationsRequest);
    return api.fetchArticleAnnotations(articleURI).then((annotations) => {
      if (annotations.ERROR) {
        return dispatch(loadAnnotationsFailure(annotations.ERROR));
      } else {
        return dispatch(loadAnnotationsSuccess(annotations));
      }
    });
  };
}

function loadArticlesSuccess(articles) {
  return (dispatch, getState) => {
    articles.forEach(article => dispatch(loadAnnotations(article.uri)));
    return dispatch({
      type: types.LOAD_ARTICLES_SUCCESS,
      articles,
      lastFetched: Date.now(),
    });
  };
}

function loadArticlesFailure(error) {
  return {
    type: types.LOAD_ARTICLES_FAILURE,
    error,
  };
}

function loadArticlesRequest() {
  return {
    type: types.LOAD_ARTICLES_REQUEST,
  };
}

function handleArticleResponse(dispatch, articles) {
  if (articles.ERROR) {
    return dispatch(loadArticlesFailure(articles.ERROR));
  } else {
    return dispatch(loadArticlesSuccess(articles));
  }
}

export default function loadArticles(groupId, isPublic) {
  return (dispatch, getState) => {
    dispatch(loadArticlesRequest());
    if (!getState().isLoading) {
      if (isPublic) {
        return api.fetchPublicArticles().then(articles =>
          handleArticleResponse(dispatch, articles));
      } else {
        return api.fetchGroupArticles(groupId).then(articles =>
          handleArticleResponse(dispatch, articles));
      }
    } else {
      return Promise.resolve();
    }
  };
}

function handleFetchNotifications(dispatch, notifications) {
  return dispatch({ type: 'NOTIFICATIONS', notifications });
}

function handleNumUnreadNotifications(dispatch, numUnreadNotifications) {
  return dispatch({ type: 'UPDATE_UNREAD_NOTIFICATIONS', numUnreadNotifications });
}

export function fetchNumUnreadNotifications() {
  return (dispatch, getState) => {
    api.fetchNumUnreadNotifications().then(numUnreadNotifications =>
      handleNumUnreadNotifications(dispatch, numUnreadNotifications));
  };
}

export function fetchNotifications() {
  return (dispatch) => {
    api.fetchNotifications().then(notifications =>
      handleFetchNotifications(dispatch, notifications));
  };
}

function handleFetchPublicGroupsResponse(dispatch, groups) {
  return dispatch({ type: 'FETCH_PUBLIC_GROUPS', publicgroups: groups });
}

export function fetchPublicGroups() {
  return (dispatch, getState) => {
    api.fetchPublicGroups().then(groups =>
      handleFetchPublicGroupsResponse(dispatch, groups));
  };
}

function handleToggleMembershipResponse(dispatch, res) {
  if (res.ERROR) {
    console.log('ERROR ERROR ERROR!'); // If you see this message then it's possible for it to throw errors
    return dispatch({ type: 'LOAD_ANNOTATIONS_ERROR', error: res.ERROR });
  } else {
    dispatch(fetchPublicGroups());
    return dispatch(fetchUser());
  }
}

export function toggleGroupMembership(groupId, userId = '') {
  return (dispatch) => {
    api.toggleGroupMembership(groupId, userId).then((res) => {
      handleToggleMembershipResponse(dispatch, res);
    });
  };
}
