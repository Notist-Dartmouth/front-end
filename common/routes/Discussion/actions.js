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

export default function loadAnnotations(articleURI) {
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
