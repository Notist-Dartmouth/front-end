import * as types from '../../constants/ActionTypes';
import * as api from '../../api';

// function loadAnnotationsRequest() {
//   return {
//     type: types.LOAD_ANNOTATIONS_REQUEST,
//   };
// }

function loadAnnotationsFailure(error) {
  return {
    type: types.LOAD_DISCUSSION_FAILURE,
    error,
  };
}

function loadAnnotationsSuccess(annotations) {
  return {
    type: types.LOAD_DISCUSSION_SUCCESS,
    annotations,
  };
}

export function loadAnnotations(articleURI) {
  return (dispatch, getState) => {
    // dispatch(loadAnnotationsRequest);
    return api.fetchArticleAnnotations(articleURI).then((annotations) => {
      if (annotations.ERROR) {
        return dispatch(loadAnnotationsFailure(annotations.ERROR));
      } else {
        return dispatch(loadAnnotationsSuccess(annotations));
      }
    });
  };
}

export function saveReply(text, parent, articleURI) {
  return (dispatch, getState) => {
    return api.saveReply(text, parent, articleURI).then((reply) => {
      if (reply.ERROR) {
        return dispatch(loadAnnotationsFailure(reply.ERROR));
      } else {
        return dispatch(loadAnnotations(articleURI));
      }
    });
  };
}
