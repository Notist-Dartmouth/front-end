import { injectAsyncReducer } from '../../store';

if (typeof require.ensure !== 'function') require.ensure = (d, c) => c(require);

export default function createRoutes(store) {
  return {
    path: 'comments/:slug',
    getComponents(location, cb) {
      require.ensure([
        './containers/CommentPage',
        './reducer',
      ], (require) => {
        const PostPage = require('./containers/CommentPage').default;
        const postReducer = require('./reducer').default;
        injectAsyncReducer(store, 'currentPost', postReducer);
        cb(null, PostPage);
      });
    },
  };
}
