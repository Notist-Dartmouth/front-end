import { createStore } from 'redux';
import { injectAsyncReducer } from '../../store';
import discussionViewReducer from './reducer';
import DiscussionPage from './containers/DiscussionPage';

export const discussionStore = createStore(discussionViewReducer);

export default function createRoutes() {
  return {
    path: 'discussion/:slug',
    getComponents(location, cb) {
      injectAsyncReducer(discussionStore, 'currentPost', discussionViewReducer);
      cb(null, DiscussionPage);
    },
  };
}
