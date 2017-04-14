import order from './produceCommentGraph';

export default function discussionViewReducer(state = {
  parentIdx: 0,
  replyText: '',
  isVisible: true,
  ordering: order,
}, action) {
  console.log('I called the reducer! Yay!');
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
    default:
      return state;
  }
}
