import React from 'react';
import Helmet from 'react-helmet';
import { StyleSheet, css } from 'aphrodite';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

const muiTheme = getMuiTheme();

const styles = StyleSheet.create({
  container: {
    textAlign: 'center',
  },
});

const ExploreFeed = props => (
  <MuiThemeProvider muiTheme={muiTheme} >
    <div className={css(styles.container)}>
      <Helmet title="Explore" />
      <div>
        <h2>To use this feature:</h2>
      </div>
      <ol>
        <li>
          <span>Login to Notist with Facebook</span>
        </li>
        <li>
          <span>Annotate at least five articles shared in groups</span>
        </li>
      </ol>
    </div>
  </MuiThemeProvider>
);

export default ExploreFeed;
