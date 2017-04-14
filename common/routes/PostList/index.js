import { createStore } from 'redux';
import { injectAsyncReducer } from '../../store';
import PostPage from './containers/PostList';
import postReducer from './reducer';

const postStore = createStore(postReducer);

export default function createRoutes() {
  return {
    path: 'posts',
    getComponents(location, cb) {
      injectAsyncReducer(postStore, 'posts', postReducer);
      cb(null, PostPage);
    },
  };
}
