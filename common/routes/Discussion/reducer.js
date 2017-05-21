import * as types from '../../constants/ActionTypes';

export default function discussionViewReducer(state = {
  parentIdx: 0,
  replyText: '',
  isVisible: true,
  currentlyOpen: 'BBB',
  annotations: [],
  ordering: [],
  error: null,
  isLoading: false,
}, action) {
  switch (action.type) {
    case 'TOGGLE_REPLY':
      return Object.assign({}, state, {
        ...state,
        currentlyOpen: action.currentlyOpen,
        parentIdx: action.parentIdx,
        replyText: action.replyText,
        isVisible: action.isVisible,
        ordering: action.ordering,
        isEditing: action.isEditing,
      });
    case 'POST_REPLY':
      return Object.assign({}, state, {
        ...state,
        parentIdx: state.parentIdx,
        replyText: action.replyText,
        isVisible: action.isVisible,
        ordering: action.ordering,
        isEditing: action.isEditing,
      });
    case 'EDIT':
      return Object.assign({}, state, {
        ...state,
        editText: action.editText,
        editId: action.editId,
        isEditing: action.isEditing,
      });
    case types.DELETE_ANNOTATION:
      return Object.assign({}, state, {
        ...state,
        isEditing: action.isEditing,
      });
    case types.REQUEST_DELETE_ANNOTATION:
      return Object.assign({}, state, {
        ...state,
        parentIdx: state.parentIdx,
        replyText: action.replyText,
        isVisible: action.isVisible,
        ordering: action.ordering,
      });
    case types.LOAD_DISCUSSION_REQUEST:
      return Object.assign({}, state, {
        ...state,
        isLoading: true,
      });
    case types.LOAD_DISCUSSION_FAILURE:
      return Object.assign({}, state, {
        ...state,
        error: action.error,
        isLoading: false,
      });
    case types.LOAD_DISCUSSION_SUCCESS:
      return Object.assign({}, state, {
        ...state,
        annotations: action.annotations,
        parentIdx: 0,
        replyText: '',
        isVisible: true,
        isLoading: false,
      });
    default:
      return state;
  }
}
