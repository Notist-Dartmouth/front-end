import React from 'react';
import Helmet from 'react-helmet';
import { StyleSheet, css } from 'aphrodite';
import injectTapEventPlugin from 'react-tap-event-plugin';
import TopNav from './TopNav';
import LeftNavContainer from '../containers/LeftNavContainer';

injectTapEventPlugin();

const styles = StyleSheet.create({
  root: {
    position: 'relative',
    top: 80,
    margin: '2rem auto',
    maxWidth: '100%',
    overflowX: 'hidden',
    // width: '70%',
  },
  shiftRight: {
    position: 'relative',
    left: 350,
    width: '75%',
  },
  title: {
    color: '#000',
    maxWidth: 300,
    fontWeight: 'bold',
    fontSize: 56,
  },
  footer: {
    margin: '4rem auto',
    textAlign: 'center',
    color: '#b7b7b7',
  },
  footerLink: {
    display: 'inline-block',
    color: '#000',
    textDecoration: 'none',
  },
});

const App = ({ children, location }) => (
  <div className={css(styles.root)}>
    <Helmet title="Notist" titleTemplate="%s - Annotate Everything" />
    <LeftNavContainer />
    <div className={css(styles.shiftRight)}>
      <TopNav
        currentFeedName={location.state ? location.state.groupName : ''}
        subscribed
        numFeedMembers={6}
        numNotifications={4}
        feedDescription={location.state ? location.state.groupDescription : ''}
      />
      {children}
      <footer className={css(styles.footer)}>
        Copyright © 2017 <a className={css(styles.footerLink)} href="http://notist.io/" target="_blank" rel="noopener noreferrer">Notist</a>
      </footer>
    </div>
  </div>
);

export default App;
