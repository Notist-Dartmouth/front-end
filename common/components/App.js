import React from 'react';
import Helmet from 'react-helmet';
import { StyleSheet, css } from 'aphrodite';
import injectTapEventPlugin from 'react-tap-event-plugin';
import TopNav from './TopNav';
import LeftNavContainer from '../containers/LeftNavContainer';

injectTapEventPlugin();

const styles = StyleSheet.create({

  underlay: {
    position: 'fixed',
    width: '100%',
    height: '100%',
    left: '0',
    top: '0',
    background: '#E0F7FA',
    zIndex: '-1000001',
  },

  belowTopNav: {
    paddingTop: 60,
  },
  shiftRight: {
    paddingLeft: 320,
  },
  leftNavShiftDown: {
    paddingTop: 25,
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
  <div>
    <div className={css(styles.underlay)} />
    <div className={css(styles.root)}>
      <Helmet title="Notist" titleTemplate="%s - Annotate Everything" />
      <TopNav
        currentFeedName={location.state ? location.state.groupName : ''}
        subscribed
        numFeedMembers={6}
        numNotifications={4}
        feedDescription={location.state ? location.state.groupDescription : ''}
      />
      <div className={css(styles.belowTopNav)}>
        <div className={css(styles.leftNavShiftDown)}>
          <LeftNavContainer />
        </div>
        <div className={css(styles.shiftRight)}>
          {children}
          <footer className={css(styles.footer)}>
            Copyright © 2017 <a className={css(styles.footerLink)} href="http://about.notist.io/" target="_blank" rel="noopener noreferrer">Notist</a>
          </footer>
        </div>
      </div>
    </div>
  </div>
);

export default App;
