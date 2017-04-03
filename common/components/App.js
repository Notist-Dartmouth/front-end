import React from 'react';
import Helmet from 'react-helmet';
import { StyleSheet, css } from 'aphrodite';
import injectTapEventPlugin from 'react-tap-event-plugin';
/* only for Card test */
// import ReactVote from './ReactVote';
import TopNav from './TopNav';
import LeftNav from './LeftNav';

injectTapEventPlugin();

const styles = StyleSheet.create({
  root: {
    position: 'relative',
    top: 90,
    left: '22%',
    color: '#000',
    margin: '2rem auto',
    padding: '0 1rem',
    // width: '70%'
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

const groupList = [
  {
    id: 'abcd190d',
    groupName: 'Group 1',
    groupLink: 'url',
    icon: 'iconName',
  },
  {
    id: 'bacd190d',
    groupName: 'Group 2',
    groupLink: 'url',
    icon: 'iconName',
  },
  {
    id: 'dacd190d',
    groupName: 'Group 3',
    groupLink: 'url',
    icon: 'iconName',
  },
];

const App = ({ children }) => (
  <div className={css(styles.root)}>
    <Helmet title="Notist" titleTemplate="%s - Annotate Everything" />
    <LeftNav
      groupList={groupList}
    />
    {/*
    personalList={personalList}
    exploreList={exploreList}
    followingList={followingList}
    */}
    <TopNav
      currentFeedName="Name of the group!"
      subscribed
      numFeedMembers={4}
      numNotifications={9}
    />
    {children}
    <footer className={css(styles.footer)}>
      Copyright © 2017 <a className={css(styles.footerLink)} href="http://notist.io/" target="_blank" rel="noopener noreferrer">Notist</a>
    </footer>
  </div>
);

export default App;
