import React from 'react';
import Media from 'react-media';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import MiddleContent from './components/MiddleContent';
import RightSideBar from './components/RightSideBar';

const App = props => (
  <div>
    <MuiThemeProvider>
      <Media query="(min-width: 4000px)" render={() => (
        <RightSideBar /> //  Only show if user's screen is big enough
        )}
      />
    </MuiThemeProvider>
    <MuiThemeProvider>
      <MiddleContent />
    </MuiThemeProvider>
  </div>
);

export default App;
