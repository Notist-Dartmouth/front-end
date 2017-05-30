import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import { StyleSheet, css } from 'aphrodite';
import CircularProgress from 'material-ui/CircularProgress';
import FlatButton from 'material-ui/FlatButton';
import { red700, red300 } from 'material-ui/styles/colors';

const styles = StyleSheet.create({
  container: {
    margin: 'auto',
    width: '75%',
    padding: '10%',
  },
  header: {
    fontSize: '40px',
  },
  divider: {
    lineHeight: '110px',
    fontSize: '36px',
  },
  exploreButton: {
    marginLeft: '30px',
    color: 'white',
  },
  progressContainer: {
    marginTop: '25px',
  },
  listItem: {
    listStylePosition: 'inside',
    fontSize: '36px',
    color: 'gray',
    lineHeight: '100px',
  },
  helpText: {
    fontSize: '36px',
    paddingLeft: '20px',
    color: 'gray',
  },
});


class ExploreSetup extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      progress: [0, 282],
    };
    this.handleExploreComplete = this.handleExploreComplete.bind(this);
    this.handleExploreError = this.handleExploreError.bind(this);
    this.handleExploreProgress = this.handleExploreProgress.bind(this);
    this.startExplore = this.startExplore.bind(this);
  }

  componentDidMount() {
    document.addEventListener('explore_progress', this.handleExploreProgress);
    document.addEventListener('explore_done', this.handleExploreComplete);
    document.addEventListener('explore_error', this.handleExploreError);
  }

  componentWillUnmount() {
    document.removeEventListener('explore_progress', this.handleExploreProgress);
    document.removeEventListener('explore_done', this.handleExploreComplete);
    document.removeEventListener('explore_error', this.handleExploreError);
  }

  handleExploreComplete() {
    this.setState({ isLoading: false });
    console.log('explore finished!');
    this.props.onExploreComplete();
  }

  handleExploreError() {
    this.setState({ isLoading: false });
    console.log('explore errored!');
    this.props.onExploreError('error');
  }

  handleExploreProgress(progressEvent) {
    const { progress } = progressEvent.detail;
    this.setState({ progress });
  }

  startExplore() {
    this.setState({ isLoading: true });
    const event = document.createEvent('Event');
    event.initEvent('init_explore');
    document.dispatchEvent(event);
  }

  render() {
    return (
      <div className={css(styles.container)}>
        <Helmet title="Explore" />
        { !this.state.isLoading && <div>
          <h2 className={css(styles.header)}>
              To use this feature:
            </h2>
          </div> }
        { this.state.isLoading ?
          <div style={{ textAlign: 'center' }}>
            <h1>Finding articles for you...</h1>
            <div className={css(styles.progressContainer)}>
              <CircularProgress
                mode="determinate"
                value={this.state.progress[0]}
                size={150}
                color={red700}
                thickness={10}
                max={this.state.progress[1]}
              />
            </div>
          </div> :
          <ol>
            <li className={css(styles.listItem)}>
              <span className={css(styles.helpText)}>
                <a href="https://chrome.google.com/webstore/detail/notist/acpmllpdmdhomcokgcacekihcfihapcf" target="_blank" rel="noopener noreferrer"> Download the Notist chrome extension </a>
              </span>
            </li>
            <li className={css(styles.listItem)}>
              <span className={css(styles.helpText)}>
                <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">Login</a> to Facebook on chrome
                </span>
            </li>
            <li className={css(styles.listItem)}>
              <FlatButton
                className={css(styles.exploreButton)}
                label="Get Started!"
                primary
                hoverColor={red300}
                backgroundColor={red700}
                onClick={this.startExplore}
              />
            </li>
          </ol> }
      </div>
    );
  }
}

ExploreSetup.propTypes = {
  onExploreComplete: PropTypes.func.isRequired,
  onExploreError: PropTypes.func.isRequired,
};

export default ExploreSetup;
