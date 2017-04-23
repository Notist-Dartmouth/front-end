import React from 'react';
import { Route, IndexRoute, Router, browserHistory } from 'react-router';
import App from '../components/App';
import Home from './Home';
import NotFound from './NotFound';
import { injectAsyncReducer } from '../store';

// import discussion from './Discussion/content';
// import discussionReducer from './Discussion/reducer';
// import profile from './Profile';
// import profileReducer from './Profile/reducer';
// import PostPage from './Post/containers/PostPage';
// import postReducer from './Post/reducer';
// import postListPage from './PostList/containers/PostList';
// import postListReducer from './PostList/reducer';


//  Should return all the routes
export default function createRouter(store) {
  return (
    <Router history={browserHistory} >
      <Route path="/" component={App} onChange={console.log('Hi')} >
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
        <Route path="profile" getComponent={(props, cb) => {
          require.ensure(['./Profile', './Profile/reducer'], (require) => {
            const profile = require('./Profile').default;
            const profileReducer = require('./Profile/reducer').default;
            injectAsyncReducer(store, 'Profile', profileReducer);
            cb(null, profile);
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
            const postListPage = require('./PostList/containers/PostList').default;
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
