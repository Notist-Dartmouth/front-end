

import React from 'react';
import { Route, IndexRoute } from 'react-router';
// import { Provider } from 'redux';
import App from '../components/App';
import Home from './Home';
// import { discussionStore } from './Discussion';
// import a from './PostList';
// import b from './Post';
import PostPage from './Post/containers/PostPage';
import NotFound from './NotFound';
import discussion from './Discussion/content';

// const routeCompD = d();
// const routeCompA = a();
// const routeCompB = b();

const routes = (
  <Route path="/" component={App} onChange={console.log('Hi')} >
    <IndexRoute component={Home} />
    <Route path="/discussion" component={discussion} />
    <Route path="/post" component={PostPage} />
    <Route path="*" component={NotFound} />
  </Route>
);

export default routes;
