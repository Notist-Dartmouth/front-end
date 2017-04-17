import { injectAsyncReducer } from '../../store';
import discussionViewReducer from './reducer';
import DiscussionPage from './containers/DiscussionPage';

export default function createRoutes(store) {
  return {
    path: 'discussion/:slug',
    getComponents(location, cb) {
      injectAsyncReducer(store, 'currentPost', discussionViewReducer);
      cb(null, DiscussionPage);
    },
  };
}
