import React from 'react';
import { Route, IndexRoute, Router, browserHistory } from 'react-router';
import App from '../components/App';
import Home from './Home';
import PostPage from './Post/containers/PostPage';
import NotFound from './NotFound';
import discussion from './Discussion/content';

function lazyLoadComponents(lazyModules) {
  return (location, cb) => {
    const moduleKeys = Object.keys(lazyModules);
    const promises = moduleKeys.map(key =>
      new Promise(resolve => lazyModules[key](resolve)),
    );

    Promise.all(promises).then((modules) => {
      cb(null, modules.reduce((obj, module, i) => {
        obj[moduleKeys[i]] = module;
        return obj;
      }, {}));
    });
  };
}

function lazyLoadComponent(lazyModule) {
  return (location, cb) => {
    lazyModule(module => cb(null, module));
  };
}

//  Should return all the routes
export const myRouter =
  (
    <Router history={browserHistory} >
      <Route path="/" component={App} onChange={console.log('Hi')} >
        <IndexRoute component={Home} />
        <Route path="/discussion" getComponent={lazyLoadComponent(discussion)} />
        <Route path="posts" getComponent={lazyLoadComponent(PostPage)} />
        <Route path="*" component={NotFound} />
      </Route>
    </Router>
  );

export default myRouter;
