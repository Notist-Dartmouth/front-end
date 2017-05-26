import React, { PropTypes, Component } from 'react';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { connect } from 'react-redux';
import ExploreSetup from './components/ExploreSetup';
import ExploreFeed from './components/ExploreFeed';
import ExploreError from './components/ExploreError';
import { fetchUser } from '../../actions/groups';

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
    this.shouldShowSetup = this.shouldShowSetup.bind(this);
    this.shouldShowFeed = this.shouldShowFeed.bind(this);
  }

  componentDidMount() {
    this.props.loadUserExploreInfo();
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

  shouldShowSetup() {
    return !this.state.isExploreComplete && !this.state.exploreError && this.props.exploreNumber === -1;
  }

  shouldShowFeed() {
    return !this.state.exploreError && (this.props.exploreNumber !== -1 || this.state.isExploreComplete);
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme} >
        <div>
          { this.shouldShowSetup() &&
            <ExploreSetup
              onExploreComplete={this.onExploreComplete}
              onExploreError={this.onExploreError}
            />
          }
          { this.shouldShowFeed() && <ExploreFeed /> }
          { this.state.exploreError &&
            <ExploreError handleRetry={this.onErrorRetry} />
          }
        </div>
      </MuiThemeProvider>
    );
  }
}

App.propTypes = {
  exploreNumber: PropTypes.number.isRequired,
};

const mapStateToProps = state => ({
  exploreNumber: state.user.exploreNumber || -1,
});

const mapDispatchToProps = dispatch => ({
  loadUserExploreInfo: () => dispatch(fetchUser()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
