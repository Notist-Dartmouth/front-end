import * as types from '../../constants';

export default function discussionViewReducer(state = {
  parentIdx: 0,
  replyText: '',
  isVisible: true,
  annotations: [],
  ordering: [],
}, action) {
  console.log('I called the reducer! Yay!');
  console.log('ORDERING is: '.concat(state.ordering)); // Have the ordering here
  switch (action.type) {
    case types.LOAD_ANNOTATIONS_REQUEST:
    case types.LOAD_ANNOTATIONS_FAILURE:
    case types.LOAD_ANNOTATIONS_SUCCESS:
      return Object.assign({}, state, {
        annotations: [
          ...state.annotations,
          ...action.annotations.filter(a => !state.annotations.includes(a)),
        ],
        isLoading: false,
      });
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
    default:
      return state;
  }
}
