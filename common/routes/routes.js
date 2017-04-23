import React from 'react';
import { Route, IndexRoute, Router, browserHistory } from 'react-router';
import App from '../components/App';
import Login from '../components/Login';
import Home from './Home';
import NotFound from './NotFound';
import { injectAsyncReducer } from '../store';
// import discussion from './Discussion/content';
// import discussionReducer from './Discussion/reducer';
// import PostPage from './Post/containers/PostPage';
// import postReducer from './Post/reducer';
// import postListPage from './PostList/containers/PostList';
// import postListReducer from './PostList/reducer';

// function lazyLoadComponents(lazyModules) {
//   return (location, cb) => {
//     const moduleKeys = Object.keys(lazyModules);
//     const promises = moduleKeys.map(key =>
//       new Promise(resolve => lazyModules[key](resolve)),
//     );
//
//     Promise.all(promises).then((modules) => {
//       cb(null, modules.reduce((obj, module, i) => {
//         obj[moduleKeys[i]] = module;
//         return obj;
//       }, {}));
//     });
//   };
// }

// function lazyLoadComponentPost(store, lazyModule) {
//   return (location, cb) => {
//     lazyModule(module => cb(null, PostPage));
//     // injectAsyncReducer(store, 'PostList', postListReducer);
//     // injectAsyncReducer(store, 'Post', postReducer);
//   };
// }

// function lazyLoadComponentDiscussion(store, lazyModule) {
//   return (location, cb) => {
//     lazyModule(module => cb(null, discussion));
//     // injectAsyncReducer(store, 'currentPost', discussionReducer);
//   };
// }

//  Should return all the routes
export default function createRouter(store) {
  return (
    <Router history={browserHistory} >
      <Route path="/login" component={Login} />
      <Route path="/" component={App} >
        <IndexRoute component={Home} />
        <Route path="discussion" getComponent={(props, cb) => {
          require.ensure(['./Discussion/content', './Discussion/reducer'], (require) => {
            const discussion = require('./Discussion/content').default;
            const discussionReducer = require('./Discussion/reducer').default;
            injectAsyncReducer(store, 'Discussion', discussionReducer);
            cb(null, discussion);
          });
        }}
        />
        <Route path="posts" getComponent={(props, cb) => {
          require.ensure(['./Post/containers/PostPage', './Post/reducer'], (require) => {
            const postPage = require('./Post/containers/PostPage').default;
            const postReducer = require('./PostList/reducer').default;
            injectAsyncReducer(store, 'currentPost', postReducer);
            cb(null, postPage);
          });
        }}
        />
        <Route path="posts" getComponent={(props, cb) => {
          require.ensure(['./PostList/containers/PostList', './PostList/reducer'], (require) => {
            const postListPage = require('./PostList/containers/AnnotationList').default;
            const postListReducer = require('./PostList/reducer').default;
            injectAsyncReducer(store, 'currentPost', postListReducer);
            cb(null, postListPage);
          });
        }}
        />
        <Route path="*" component={NotFound} />
      </Route>
    </Router>
  );
}
