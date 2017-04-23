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
    articles.forEach(a => dispatch(loadAnnotations(a.uri)));
    return {
      type: types.LOAD_ARTICLES_SUCCESS,
      articles,
      lastFetched: Date.now(),
    };
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

export default function loadArticles(groupId) {
  return (dispatch, getState) => {
    dispatch(loadArticlesRequest());
    if (!getState().isLoading) {
      return api.fetchGroupArticles(groupId).then((articles) => {
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
