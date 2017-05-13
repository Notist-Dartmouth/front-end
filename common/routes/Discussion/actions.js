import path from 'path';
import * as types from '../../constants/ActionTypes';
import * as api from '../../api';

const headers = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
};

let apiHost;
// @if ENVIRONMENT='production'
apiHost = 'https://notist.herokuapp.com';
// @endif
// @if ENVIRONMENT='development'
apiHost = 'http://localhost:3000';
// @endif

function loadDiscussionRequest() {
  return {
    type: types.LOAD_ANNOTATIONS_REQUEST,
  };
}

function loadDiscussionFailure(error) {
  return {
    type: types.LOAD_DISCUSSION_FAILURE,
    error,
  };
}

function loadDiscussionSuccess(annotations) {
  return {
    type: types.LOAD_DISCUSSION_SUCCESS,
    annotations,
  };
}

export function loadDiscussion(articleURI) {
  return (dispatch, getState) => {
    dispatch(loadDiscussionRequest);
    return api.fetchArticleAnnotations(articleURI).then((annotations) => {
      if (annotations.ERROR) {
        return dispatch(loadDiscussionFailure(annotations.ERROR));
      } else {
        return dispatch(loadDiscussionSuccess(annotations));
      }
    });
  };
}

export function saveReply(text, parent, articleURI) {
  return (dispatch, getState) => {
    return api.saveReply(text, parent, articleURI).then((reply) => {
      if (reply.ERROR) {
        return dispatch(loadDiscussionFailure(reply.ERROR));
      } else {
        return dispatch(loadDiscussion(articleURI));
      }
    });
  };
}

export function deleteAnnotation(annotationId) {
  return {
    type: types.REQUEST_DELETE_ANNOTATION,
    annotationId,
  };
}

export function handleDeleteAnnotationSuccess(annotationId) {
  return {
    type: types.DELETE_ANNOTATION,
    annotationId,
  };
}

export function deleteAnnotationAsync(annotationId) {
  return (dispatch, getState) => {
    const deleteEndpoint = path.join(apiHost, `api/annotation/${annotationId}`);
    return fetch(deleteEndpoint, {
      method: 'DELETE',
      credentials: 'include',
      headers,
    })
    .then(res => res.json())
    .then((json) => {
      if (json.SUCCESS) {
        dispatch(handleDeleteAnnotationSuccess(annotationId));
      }
    });
  };
}
