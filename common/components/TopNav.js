import React from 'react';
import IndexLink from 'react-router/lib/IndexLink';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { StyleSheet, css } from 'aphrodite';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { red700, white, yellow400, grey900 } from 'material-ui/styles/colors';
// deepOrange600
import PeopleIcon from 'material-ui/svg-icons/social/people';
import RaisedButton from 'material-ui/RaisedButton';
import { Toolbar, ToolbarGroup, ToolbarSeparator } from 'material-ui/Toolbar';
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
  link: {
    maxWidth: 700,
    color: '#999',
    margin: '1.5rem 1rem 1.5rem 0',
    display: 'inline-block',
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
    marginTop: -40,
  },
  feedDescription: {
    position: 'fixed',
    left: 25,
    fontSize: 20,
    marginTop: 20,
  },
  numMembers: {
    fontSize: 14,
    textDecoration: 'underline',
    marginTop: -40,
    marginLeft: 10,
  },
});

export default class TopNav extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      value: 2,
      subscribed: false,
    };
    this.currentFeedName = props.currentFeedName || 'No feed name given';
    this.numFeedMembers = props.numFeedMembers || 0;
    this.numNotifications = props.numNotifications || 0;
    this.handleSubscribeClick = this.handleSubscribeClick.bind(this);
    this.feedDescription = props.feedDescription || 'No feed description given';
  }

  handleChange = (event, index, value) => this.setState({ value });

  handleSubscribeClick() {
    this.setState({ subscribed: !this.state.subscribed });
  }

  render() {
    let subButton = null;
    // LOOK: this logic is backwards! remove the flag on line 83 for normal behavior! only like this for presentation on 4/25
    if (!this.state.subscribed) {
      subButton = <RaisedButton label="unsubscribe" onClick={this.handleSubscribeClick} backgroundColor={red700} style={{ marginTop: -20 }} />;
    } else {
      subButton = <RaisedButton label="subscribe" onClick={this.handleSubscribeClick} backgroundColor={yellow400} labelColor={grey900} style={{ marginTop: -20 }} />;
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
        <Toolbar style={{ height: 90, top: 0, left: 0, width: '100%', position: 'fixed', zIndex: 200, color: white, fontFamily: 'Roboto, sans-serif' }}>
          <ToolbarGroup>
            <span className={css(styles.feedName)}>{this.currentFeedName}</span>
            {subButton}
            <PeopleIcon style={{ marginTop: -40 }} />
            <span className={css(styles.numMembers)}>{this.numFeedMembers} members</span>
            <p className={css(styles.feedDescription)}>{this.feedDescription}</p>
          </ToolbarGroup>
          <ToolbarGroup>
            <NotificationsDialog
              numNotifications={this.numNotifications}
            />
            <SettingsDialog />
            <ToolbarSeparator />
            <Search />
            <IndexLink to="/" className={css(styles.link)} activeClassName={css(styles.link, styles.activeLink)}>
              Home
            </IndexLink>
            <a href="http://about.notist.io" style={{ color: grey900 }}>
              About
            </a>
          </ToolbarGroup>
        </Toolbar>
      </MuiThemeProvider>
    );
  }
}
