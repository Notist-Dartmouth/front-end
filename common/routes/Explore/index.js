import React, { Component } from 'react';
import ExploreSetup from './components/ExploreSetup';
import ExploreFeed from './components/ExploreFeed';
import ExploreError from './components/ExploreError';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isExploreComplete: false,
      exploreError: null,
    };
    this.onExploreComplete = this.onExploreComplete.bind(this);
    this.onExploreError = this.onExploreError.bind(this);
  }

  onExploreComplete() {
    this.setState({ isExploreComplete: true });
  }

  onExploreError(exploreError) {
    this.setState({ exploreError });
  }

  render() {
    return (
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
          <ExploreError />
        }
      </div>
    );
  }
}

export default App;
