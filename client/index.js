import 'babel-polyfill';
// import { trigger } from 'redial';
import React from 'react';
import ReactDOM from 'react-dom';
// import match from 'react-router/lib/match';
// import browserHistory from 'react-router/lib/browserHistory';
import { Provider } from 'react-redux';
import { StyleSheet } from 'aphrodite';
import { configureStore } from '../common/store';
import * as api from '../common/api';
import { updateUser } from '../common/actions/groups';
import createRouter from '../common/routes/routes';

/* I'm being a bad dude and disabling some eslint rules on a per file basis -- Byrne */
/* eslint-disable no-shadow */

// We need to have a root route for HMR to work.


const initialState = window.INITIAL_STATE || {};
// Set up Redux (note: this API requires redux@>=3.1.0):
const store = configureStore(initialState);
// const { dispatch } = store;
const container = document.getElementById('root');

// const routes = createRouter(store).props.routes;

StyleSheet.rehydrate(window.renderedClassNames);

const render = () => {
  api.fetchUser().then((user) => {
    store.dispatch(updateUser(user.groups, user.username));
    ReactDOM.render(
      <Provider store={store}>
        { createRouter(store) }
      </Provider>,
      container,
    );
  });
};

render();

//   return browserHistory.listen((location) => {
//     // Match routes based on location object:
//     match({ routes, location }, (error, redirectLocation, renderProps) => {
//       if (error) console.log(error);
//       // Get array of route handler components:
//       const { components } = renderProps;
//
//       // Define locals to be provided to all lifecycle hooks:
//       const locals = {
//         path: renderProps.location.pathname,
//         query: renderProps.location.query,
//         params: renderProps.params,
//
//         // Allow lifecycle hooks to dispatch Redux actions:
//         dispatch,
//       };
//
//       // Don't fetch data for initial route, server has already done the work:
//       if (window.INITIAL_STATE) {
//         // Delete initial data so that subsequent data fetches can occur:
//         delete window.INITIAL_STATE;
//       } else {
//         // Fetch mandatory data dependencies for 2nd route change onwards:
//         trigger('fetch', components, locals);
//       }
//
//       // Fetch deferred, client-only data dependencies:
//       trigger('defer', components, locals);
//     });
//   });
// };
//
// const unsubscribeHistory = render();
//
// if (module.hot) {
//   module.hot.accept('../common/routes/routes', () => {
//     unsubscribeHistory();
//     setTimeout(render);
//   });
// }
