import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import { StyleSheet, css } from 'aphrodite';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import FlatButton from 'material-ui/FlatButton';
// import ActionAssignment from 'material-ui/svg-icons/action/assignment';
import { red700, red300 } from 'material-ui/styles/colors';

const muiTheme = getMuiTheme();

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


  componentDidMount() {
    document.addEventListener('explore_done', () => {
      console.log('explore finished!');
      this.props.onExploreComplete();
    });

    document.addEventListener('explore_error', () => {
      console.log('explore errored!');
      this.props.onExploreError('error');
    });
  }

  componentWillUnmount() {
    // How do I remove an event listener if I defined the function inline ^^ ??
    // document.removeEventListener('explore_done');
    // document.removeEventListener('explore_error');
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme} >
        <div className={css(styles.container)}>
          <Helmet title="Explore" />
          <div>
            <h2 className={css(styles.header)}>
              To use this feature:
            </h2>
          </div>
          <ol>
            <li className={css(styles.listItem)}>
              <span className={css(styles.helpText)}>
                <a href="https://chrome.google.com/webstore/detail/notist/acpmllpdmdhomcokgcacekihcfihapcf"> Download Chrome Extension </a> and enable it!
                </span>
            </li>
            <li className={css(styles.listItem)}>
              <span className={css(styles.helpText)}>
                <a href="https://www.facebook.com/">Login</a> to Facebook on chrome!
              </span>
            </li>
            <li className={css(styles.listItem)}>
              <FlatButton
                className={css(styles.exploreButton)}
                label="Get Started!"
                primary
                hoverColor={red300}
                backgroundColor={red700}
                onClick={(ev) => {
                  const event = document.createEvent('Event');
                  event.initEvent('init_explore');
                  document.dispatchEvent(event);
                }}
              />
            </li>
          </ol>
        </div>
      </MuiThemeProvider>
    );
  }
}

ExploreSetup.propTypes = {
  onExploreComplete: PropTypes.func.isRequired,
  onExploreError: PropTypes.func.isRequired,
};

export default ExploreSetup;
