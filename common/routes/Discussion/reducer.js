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
    case types.LOAD_DISCUSSION_REQUEST:
      return Object.assign({}, state, {
        isLoading: true,
      });
    case types.LOAD_DISCUSSION_FAILURE:
      return Object.assign({}, state, {
        error: action.error,
        isLoading: false,
      });
    case types.LOAD_DISCUSSION_SUCCESS:
      return Object.assign({}, state, {
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
