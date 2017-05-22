import React, { Component } from 'react';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import ExploreSetup from './components/ExploreSetup';
import ExploreFeed from './components/ExploreFeed';
import ExploreError from './components/ExploreError';

const muiTheme = getMuiTheme();

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isExploreComplete: false,
      exploreError: null,
    };
    this.onExploreComplete = this.onExploreComplete.bind(this);
    this.onExploreError = this.onExploreError.bind(this);
    this.onErrorRetry = this.onErrorRetry.bind(this);
  }

  onExploreComplete() {
    this.setState({ isExploreComplete: true });
  }

  onExploreError(exploreError) {
    this.setState({ exploreError });
  }

  onErrorRetry() {
    this.setState({ exploreError: null });
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme} >
        <div>
          { !this.state.isExploreComplete && !this.state.exploreError &&
            <ExploreSetup
              onExploreComplete={this.onExploreComplete}
              onExploreError={this.onExploreError}
            />
          }
          { this.state.isExploreComplete && !this.state.exploreError &&
            <ExploreFeed />
          }
          { this.state.exploreError &&
            <ExploreError handleRetry={this.onErrorRetry} />
          }
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
