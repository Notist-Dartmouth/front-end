import React from 'react';
import { Route, IndexRoute, Router, browserHistory } from 'react-router';
import App from '../components/App';
import Home from './Home';
import PostPage from './Post/containers/PostPage';
import NotFound from './NotFound';
import discussion from './Discussion/content';
import injectAsyncReducer from '../store';
import discussionReducer from './Discussion/reducer';
import postListReducer from './PostList/reducer';
import postReducer from './Post/reducer';

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

function lazyLoadComponentPost(store, lazyModule) {
  return (location, cb) => {
    lazyModule(module => cb(null, module));
    injectAsyncReducer(store, 'PostList', postListReducer);
    injectAsyncReducer(store, 'Post', postReducer);
  };
}

function lazyLoadComponentDiscussion(store, lazyModule) {
  return (location, cb) => {
    lazyModule(module => cb(null, module));
    injectAsyncReducer(store, 'currentPost', discussionReducer);
  };
}

//  Should return all the routes
export default function createRouter(store) {
  return (
    <Router history={browserHistory} >
      <Route path="/" component={App} onChange={console.log('Hi')} >
        <IndexRoute component={Home} />
        <Route path="/discussion" getComponent={lazyLoadComponentDiscussion(store, discussion)} />
        <Route path="posts" getComponent={lazyLoadComponentPost(store, PostPage)} />
        <Route path="*" component={NotFound} />
      </Route>
    </Router>
  );
}
