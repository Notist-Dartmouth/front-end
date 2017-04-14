import React from 'react';
import { Route, IndexRoute } from 'react-router';
import { Provider } from 'redux';
import App from '../components/App';
import Home from './Home';
import d, { discussionStore } from './Discussion';
import a from './PostList';
import b from './Post';
import c from './NotFound';
import discussion from './Discussion/content';

const routeCompD = d();
const routeCompA = a();
const routeCompB = b();
const routeCompC = c();

console.log(`Hello!${JSON.stringify(routeCompD)}`);

const routes = (
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
    <Route path="/hi" component={discussion} />
    <Route path={routeCompA.path} component={routeCompA.component} />
    <Route path={routeCompB.path} component={routeCompB.component} />
    <Route path="*" component={routeCompC.component} />
  </Route>
);

export default routes;
