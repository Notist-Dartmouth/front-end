import * as types from '../../constants/ActionTypes';
import { fetchExploreArticles } from '../../api';

function loadExploreSuccess(articles) {
  return {
    type: types.LOAD_EXPLORE_SUCCESS,
    articles,
  };
}

function loadExploreFailure(error) {
  return {
    type: types.LOAD_EXPLORE_FAILURE,
    error,
  };
}

function loadExploreRequest() {
  return {
    type: types.LOAD_EXPLORE_REQUEST,
  };
}

function handleExploreResponse(dispatch, articles) {
  if (articles.ERROR) {
    return dispatch(loadExploreFailure(articles.ERROR));
  } else {
    return dispatch(loadExploreSuccess(articles));
  }
}

export default function loadArticles(groupId, isPublic) {
  return (dispatch, getState) => {
    dispatch(loadExploreRequest());
    if (!getState().isLoading) {
      return fetchExploreArticles()
        .then(res => dispatch(handleExploreResponse(dispatch, res)))
        .catch(error => loadExploreFailure(error));
    } else {
      return Promise.resolve();
    }
  };
}
