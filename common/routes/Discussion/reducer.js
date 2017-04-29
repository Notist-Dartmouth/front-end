import * as types from '../../constants/ActionTypes';

export default function discussionViewReducer(state = {
  parentIdx: 0,
  replyText: '',
  isVisible: true,
  annotations: [],
  ordering: [],
  error: null,
}, action) {
  switch (action.type) {
    case 'TOGGLE_REPLY':
      return Object.assign({}, state, {
        parentIdx: action.parentIdx,
        replyText: action.replyText,
        isVisible: action.isVisible,
        ordering: action.ordering,
      });
    case 'POST_REPLY':
      return Object.assign({}, state, {
        parentIdx: action.parentIdx,
        replyText: action.replyText,
        isVisible: action.isVisible,
        ordering: action.ordering,
      });
    case types.LOAD_DISCUSSION_FAILURE:
      return Object.assign({}, state, {
        error: action.error,
      });
    case types.LOAD_DISCUSSION_SUCCESS:
      return Object.assign({}, state, {
        annotations: action.annotations,
      });
    default:
      return state;
  }
}
