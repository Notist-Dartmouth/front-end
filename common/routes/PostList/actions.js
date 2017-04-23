import * as types from '../../constants/ActionTypes';
import * as api from '../../api';

function loadArticlesSuccess(articles) {
  return {
    type: types.LOAD_ARTICLES_SUCCESS,
    articles,
    lastFetched: Date.now(),
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

export default function loadArticles() {
  return (dispatch, getState) => {
    dispatch(loadArticlesRequest());
    if (!getState().isLoading) {
      return api.fetchArticles().then((articles) => {
        if (articles.ERROR) {
          return dispatch(loadArticlesFailure(articles.ERROR));
        } else {
          return dispatch(loadArticlesSuccess(articles));
        }
      });
    } else {
      return Promise.resolve();
    }
  };
}
