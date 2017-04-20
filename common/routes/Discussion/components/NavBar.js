import React, { Component } from 'react';
import { styles } from '../styles/styles';

const ARTICLETITLE = 'Fans of Hard Hitting News';

/* eslint-disable */

export default class NavBar extends Component {
  render() {
    return (
      <div style={styles.navBar}>
        <p style={styles.title}>{ARTICLETITLE}</p>
      </div>
    );
  }
}

/* eslint-enable */
