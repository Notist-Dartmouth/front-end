import React from 'react';
import Helmet from 'react-helmet';
import { StyleSheet, css } from 'aphrodite';
import injectTapEventPlugin from 'react-tap-event-plugin';
import TopNav from './TopNav';
import LeftNav from './LeftNav';

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

const groupList = [
  {
    id: 'abcd190d',
    groupName: 'Group 1',
    groupLink: 'posts',
    icon: 'iconName',
  },
  {
    id: 'bacd190d',
    groupName: 'Group 2',
    groupLink: 'posts',
    icon: 'iconName',
  },
  {
    id: 'dacd190d',
    groupName: 'Group 3',
    groupLink: 'posts',
    icon: 'iconName',
  },
];

const personalList = [
  {
    id: 'xx',
    groupName: 'Personal 1',
    groupLink: 'posts',
    icon: 'iconName',
  },
];

const exploreList = [
  {
    id: 'xx',
    groupName: 'Explore 1',
    groupLink: 'posts',
    icon: 'iconName',
  },
  {
    id: 'xx',
    groupName: 'Explore 2',
    groupLink: 'post',
    icon: 'iconName',
  },
];

const followingList = [
  {
    id: 'xx',
    groupName: 'Person 1',
    groupLink: 'posts',
    icon: 'iconName',
  },
  {
    id: 'xx',
    groupName: 'Person 2',
    groupLink: 'posts',
    icon: 'iconName',
  },
];

const App = ({ children }) => (
  <div className={css(styles.root)}>
    <Helmet title="Notist" titleTemplate="%s - Annotate Everything" />
    <LeftNav
      groupList={groupList}
      personalList={personalList}
      exploreList={exploreList}
      followingList={followingList}
      profilePicture="https://i.imgur.com/9zgiD0u.jpg"
      userName="ethan"
      userPoints={994}
    />
    <div className={css(styles.shiftRight)}>
      <TopNav
        currentFeedName="My feed name"
        subscribed
        numFeedMembers={6}
        numNotifications={4}
        feedDescription="My feed description"
      />
      {children}
      <footer className={css(styles.footer)}>
        Copyright © 2017 <a className={css(styles.footerLink)} href="http://notist.io/" target="_blank" rel="noopener noreferrer">Notist</a>
      </footer>
    </div>
  </div>
);

export default App;
