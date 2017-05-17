import React from 'react';
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

const ExploreFeed = props => (
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
            <a href="/login">Login</a> to Notist with Facebook
          </span>
        </li>
        <li className={css(styles.listItem)}>
          <FlatButton
            className={css(styles.exploreButton)}
            label="Explore"
            primary
            hoverColor={red300}
            backgroundColor={red700}
          />
        </li>
        <div>
          <h3 className={css(styles.divider)}>OR</h3>
        </div>
        <div>
          <span className={css(styles.helpText)}>
            Annotate at least five articles shared in groups
          </span>
        </div>
      </ol>
    </div>
  </MuiThemeProvider>
);

export default ExploreFeed;
