import React, { Component } from 'react';
import Media from 'react-media';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
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

export default App;
