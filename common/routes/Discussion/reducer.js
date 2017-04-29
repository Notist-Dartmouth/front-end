import * as types from '../../constants/ActionTypes';

export default function discussionViewReducer(state = {
  parentIdx: '',
  replyText: '',
  isVisible: true,
  currentlyOpen: 'BBB',
  annotations: [],
  ordering: [],
  error: null,
}, action) {
  switch (action.type) {
    case 'TOGGLE_REPLY':
      return Object.assign({}, state, {
        currentlyOpen: action.currentlyOpen,
        parentIdx: action.parentIdx,
        replyText: action.replyText,
        isVisible: action.isVisible,
        ordering: action.ordering,
      });
    case 'POST_REPLY':
      return Object.assign({}, state, {
        parentIdx: state.parentIdx,
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
        parentIdx: '',
        replyText: '',
        isVisible: true,
      });
    default:
      return state;
  }
}
