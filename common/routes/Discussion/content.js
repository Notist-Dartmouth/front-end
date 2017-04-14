import React, { Component } from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import ReactDOM from 'react-dom';
import Media from 'react-media';
import { createStore } from 'redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import discussionViewReducer from './reducers';
import NavBar from './components/NavBar';
import LeftSideBar from './components/LeftSideBar';
import MiddleContent from './components/MiddleContent';
import RightSideBar from './components/RightSideBar';

class App extends Component {

  render() {
    return (
      <div>
        <MuiThemeProvider>
          <Media query="(min-width: 1200px)" render={() => (
            <RightSideBar /> //  Only show if user's screen is big enough
          )}
          />
        </MuiThemeProvider>
        <MuiThemeProvider>
          <MiddleContent />
        </MuiThemeProvider>
      </div>
    );
  }
}

export const discussionStore = createStore(discussionViewReducer);
export default App;
