import * as types from '../../constants/ActionTypes';
import * as api from '../../api';

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

export function handleDeleteReplySuccess(annotationId) {
  return {
    type: types.DELETE_ANNOTATION,
    annotationId,
  };
}

export function deleteReply(commentId) {
  return (dispatch, getState) => {
    api.deleteAnnotation(commentId)
    .then((json) => {
      if (json.SUCCESS) {
        dispatch(handleDeleteReplySuccess(commentId));
      }
    });
  };
}

export function handleEditReplySuccess(annotationId, text) {
  return {
    type: 'EDIT',
    editText: text,
    isEditing: false,
  };
}

export function editReply(commentId, text) {
  return (dispatch, getState) => {
    api.editAnnotation(commentId, text).then((json) => {
      if (json.SUCCESS) {
        dispatch(handleEditReplySuccess(commentId, text));
      }
    });
  };
}
