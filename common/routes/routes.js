import React from 'react';
import { IndexRoute, Route, Router, browserHistory } from 'react-router';
import App from '../components/App';
import ArticleList from './PostList/containers/ArticleList';
import articleReducer from './PostList/reducer';
import Login from '../components/Login';
import NotFound from './NotFound';
import { injectAsyncReducer } from '../store';
import discussion from './Discussion/content';
import discussionReducer from './Discussion/reducer';
import profile from './Profile';
import profileReducer from './Profile/reducer';

export default function createRouter(store) {
  return (
    <Router history={browserHistory} >
      <Route path="/login" component={Login} />
      <Route path="/" component={App} >
        <IndexRoute path="/" getComponent={(props, cb) => {
          injectAsyncReducer(store, 'articles', articleReducer);
          cb(null, ArticleList);
        }}
        />
        <Route path="discussion/:annotation" getComponent={(props, cb) => {
          injectAsyncReducer(store, 'Discussion', discussionReducer);
          cb(null, discussion);
        }}
        />
        <Route path="profile" getComponent={(props, cb) => {
          injectAsyncReducer(store, 'Profile', profileReducer);
          cb(null, profile);
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
