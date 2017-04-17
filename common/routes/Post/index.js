import { injectAsyncReducer } from '../../store';
import postReducer from './reducer';
import PostPage from './containers/PostPage';

export default function createRoutes(store) {
  return {
    path: 'post/:slug',
    getComponents(location, cb) {
      injectAsyncReducer(store, 'currentPost', postReducer);
      cb(null, PostPage);
    },
  };
}
