/* eslint-disable */

import React from 'react';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { StyleSheet, css } from 'aphrodite';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { red700, white, yellow400, grey900, grey300 } from 'material-ui/styles/colors';
// deepOrange600
import PeopleIcon from 'material-ui/svg-icons/social/people';
import RaisedButton from 'material-ui/RaisedButton';
import { Toolbar } from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import BugReport from 'material-ui/svg-icons/action/bug-report';
import SettingsDialog from './SettingsDialog';
import NotificationsDialog from './NotificationsDialog';
import Search from './Search';
import config from '../../server/config';

const muiTheme = getMuiTheme({
  fontFamily: 'Roboto, sans-serif',
  palette: {
    accent1Color: red700,
    accent2Color: '#F98C25',
    textColor: white,
  },
  userAgent: (typeof navigator !== 'undefined' && navigator.userAgent) || 'all',
});

const styles = StyleSheet.create({
  toolbarContainer: {
    display: 'flex',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  feedDetails: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    // alignItems: 'center',
  },
  feedTopRow: {
    display: 'flex',
    alignItems: 'center',
    // justifyContent: 'space-between',
  },
  notificationsAndSettings: {
    display: 'flex',
    alignItems: 'center',
    flex: 1,
    '@media (max-width: 900px)': {
      display: 'none',
    },
  },
  searchBar: {
    '@media (max-width: 900px)': {
      display: 'none',
    },
    // flex: 1,
  },
  link: {
    maxWidth: 700,
    color: '#999',
    textDecoration: 'none',
    fontWeight: 'bold',
    transition: '.2s opacity ease',
    ':hover': {
      opacity: 0.6,
    },
  },
  topLink: {
    color: '#fff',
    fontSize: '20px',
  },
  activeLink: {
    color: '#000',
  },
  feedName: {
    fontSize: 33,
    paddingRight: 15,
  },
  feedDescription: {
    left: 25,
    fontSize: 20,
  },
  numMembers: {
    fontSize: 14,
    textDecoration: 'underline',
  },
});

export default class TopNav extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      value: 2,
      subscribed: false,
    };
    this.handleSubscribeClick = this.handleSubscribeClick.bind(this);
  }

  handleChange = (event, index, value) => this.setState({ value });

  handleSubscribeClick() {
    this.setState({ subscribed: !this.state.subscribed });
  }

  render() {
    let subButton = null;
    if (this.state.subscribed) {
      subButton = <RaisedButton label="unsubscribe" onClick={this.handleSubscribeClick} backgroundColor={red700} />;
    } else {
      subButton = <RaisedButton label="subscribe" onClick={this.handleSubscribeClick} backgroundColor={yellow400} labelColor={grey900} />;
    }
    /*
      when not yet response from button click, use
      import RefreshIndicator from 'material-ui/lib/refresh-indicator';
    <RefreshIndicator
     size={40}
     left={10}
     top={0}
     status="loading"
     style={style.refresh}
   />
      */
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <Toolbar style={{ position: 'fixed', zIndex: 200, height: 90, top: 0, left: 0, width: '100%', color: white, fontFamily: 'Roboto, sans-serif', boxShadow: '0 2px 4px rgba(0,0,0,0.15), 0 2px 4px rgba(0,0,0,0.22)' }}>
          <div className={css(styles.toolbarContainer)}>
            <div className={css(styles.feedDetails)}>
              <div className={css(styles.feedTopRow)}>
                <div className={css(styles.feedName)}>{this.props.currentFeedName || 'Notist'}</div>


              </div>
              <div className={css(styles.feedDescription)}>{this.props.feedDescription}</div>
            </div>
            <div className={css(styles.notificationsAndSettings)}>
              Found any bugs?
              <div>
                <a href="https://docs.google.com/forms/d/e/1FAIpQLScKa0F2eyB9fpUbVB9LrCGnwhnWHbiU-eJ2Ab4vPTC5LcUM9g/viewform?usp=sf_link" target="_blank" rel="noopener noreferrer">
                  <IconButton tooltip="Submit a bug report">
                    <BugReport color={white} hoverColor={grey300} />
                  </IconButton>
                </a>
              </div>
            </div>
            <div>
              <a className={css(styles.link, styles.topLink)}
                  href={`${config.apiHost}/logout`}>Logout</a>
            </div>
          </div>
        </Toolbar>
      </MuiThemeProvider>
    );
  }
}

// <div><PeopleIcon /></div>

// <div className={css(styles.searchBar)}>
//   <Search />
// </div>

//<div className={css(styles.numMembers)}>{this.props.numFeedMembers || 0} members</div>

//   <div style={{ paddingRight: 15 }}>{subButton}</div>

// <div>
//   <SettingsDialog />
// </div>

// <div>
//   <NotificationsDialog numNotifications={this.props.numNotifications || 0} />
// </div>
