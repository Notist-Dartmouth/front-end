import React from 'react';
import { Route, Router, browserHistory } from 'react-router';
import App from '../components/App';
import ArticleList from './PostList/containers/ArticleList';
import articleReducer from './PostList/reducer';
import Login from '../components/Login';
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
      <Route path="/login" component={Login} />
      <Route path="/" component={App} >
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
        <Route path="feed/:group" getComponent={(props, cb) => {
          injectAsyncReducer(store, 'articles', articleReducer);
          cb(null, ArticleList);
        }}
        />
        <Route path="*" component={NotFound} />
      </Route>
    </Router>
  );
}
