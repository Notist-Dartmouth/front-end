import React from 'react';
import { Route, IndexRoute, Router, browserHistory } from 'react-router';
import App from '../components/App';
import Login from '../components/Login';
import Home from './Home';
import NotFound from './NotFound';
import { injectAsyncReducer } from '../store';

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
        <Route path="feed" getComponent={(props, cb) => {
          require.ensure(['./PostList/containers/ArticleList', './PostList/reducer'], (require) => {
            const postListPage = require('./PostList/containers/ArticleList').default;
            const annotationListReducer = require('./PostList/reducer').default;
            injectAsyncReducer(store, 'articles', annotationListReducer);
            cb(null, postListPage);
          });
        }}
        />
        <Route path="*" component={NotFound} />
      </Route>
    </Router>
  );
}
