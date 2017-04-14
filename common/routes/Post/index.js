import { createStore } from 'redux';
import { injectAsyncReducer } from '../../store';
import postReducer from './reducer';
import PostPage from './containers/PostPage';

const postStore = createStore(postReducer);

export default function createRoutes() {
  return {
    path: 'post/:slug',
    getComponents(location, cb) {
      injectAsyncReducer(postStore, 'currentPost', postReducer);
      cb(null, PostPage);
    },
  };
}
