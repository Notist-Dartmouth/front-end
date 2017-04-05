/* I'm being a bad dude and disabling some eslint rules on a per file basis -- Byrne */
/* eslint-disable react/no-array-index-key */

import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import data from '../data';

/* I added padding so it doesn't go underneath nav --Byrne */
const styles = StyleSheet.create({
  root: {
    position: 'relative',
  },
});

// This is a static page. It uses an array to hold data about the resources
// and maintain DRY
const Home = props => (
  <div className={css(styles.root)}>

    <h2 className={css(styles.header)}>About</h2>
    <p className={css(styles.lead)}>
      This is an example react application (master-detail feed) with isomorphic rendering, async react-router routes, async redux reducers, async data fetching, and code-splitting.
    </p>
    <h2 className={css(styles.header)}>Motivation</h2>
    <p className={css(styles.lead)}>
      The file size of isomorphic React apps can quickly get out of hand. Many isomorphic starter kits look awesome to begin with but yield a several megabyte javascript
      file for the client to download. This project aims to demonstrate some possible solutions.
    </p>
    <h2 className={css(styles.header)}>Under the Hood</h2>
    <ul className={css(styles.list)}>
      {data.map((item, i) => (
        <li key={i}>
          <h3><a className={css(styles.link)} href={item.link} target="_blank" rel="noopener noreferrer">{item.resource}</a></h3>
          <p className={css(styles.body)}>{item.description}</p>
        </li>
       ))}
    </ul>
  </div>
);

export default Home;
