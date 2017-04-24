import React from 'react';
import { Route, IndexRoute, Router, browserHistory } from 'react-router';
import App from '../components/App';
import ArticleList from './PostList/containers/ArticleList';
import articleReducer from './PostList/reducer';
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
          injectAsyncReducer(store, 'articles', articleReducer);
          cb(null, ArticleList);
        }}
        />
        <Route path="*" component={NotFound} />
      </Route>
    </Router>
  );
}
