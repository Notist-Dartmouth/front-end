import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from '../components/App';
import Home from './Home';
import d from './Discussion';
import a from './PostList';
import b from './Post';
import c from './NotFound';

const routes = (
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
    <Route path="/discussion" component={d} />
    <Route path="post" component={a} />
    <Route path="/postlist" component={b} />
    <Route path="*" component={c} />
  </Route>
);

export default routes;
