import React from 'react';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { StyleSheet, css } from 'aphrodite';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { red700, white, yellow400, grey900 } from 'material-ui/styles/colors';
// deepOrange600
import PeopleIcon from 'material-ui/svg-icons/social/people';
import RaisedButton from 'material-ui/RaisedButton';
import { Toolbar } from 'material-ui/Toolbar';
import SettingsDialog from './SettingsDialog';
import NotificationsDialog from './NotificationsDialog';
import Search from './Search';

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
    flex: 2,
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
  },
  // searchBar: {
  //   flex: 1,
  // },
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
  activeLink: {
    color: '#000',
  },
  feedName: {
    fontSize: 30,
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
        <Toolbar style={{ position: 'fixed', zIndex: 200, height: 90, top: 0, left: 0, width: '100%', color: white, fontFamily: 'Roboto, sans-serif' }}>
          <div className={css(styles.toolbarContainer)}>
            <div className={css(styles.feedDetails)}>
              <div className={css(styles.feedTopRow)}>
                <div className={css(styles.feedName)}>{this.props.currentFeedName}</div>
                <div style={{ paddingRight: 15 }}>{subButton}</div>
                <div><PeopleIcon /></div>
                <div className={css(styles.numMembers)}>{this.props.numFeedMembers || 0} members</div>
              </div>
              <div className={css(styles.feedDescription)}>{this.props.feedDescription}</div>
            </div>
            <div className={css(styles.notificationsAndSettings)}>
              <div>
                <NotificationsDialog numNotifications={this.props.numNotifications || 0} />
              </div>
              <div>
                <SettingsDialog />
              </div>
            </div>
            <div className={css(styles.searchBar)}>
              <Search />
            </div>
          </div>
        </Toolbar>
      </MuiThemeProvider>
    );
  }
}
