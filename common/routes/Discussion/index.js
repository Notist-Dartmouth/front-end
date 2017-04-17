import { injectAsyncReducer } from '../../store';
import discussionViewReducer from './reducer';

export default function createRoutes(store) {
  return {
    path: 'discussion/:slug',
    getComponents(location, cb) {
      injectAsyncReducer(store, 'currentPost', discussionViewReducer);
    },
  };
}
