import React from 'react';
import { Router, browserHistory } from 'react-router';
import routes from './routes';
// import { syncHistoryWithStore, routerReducer } from 'react-router-redux';


const myRouter = (
  <Router routes={routes} history={browserHistory} />
);

export default myRouter;
