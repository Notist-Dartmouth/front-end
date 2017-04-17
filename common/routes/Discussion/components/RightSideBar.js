import React from 'react';
import ChipExampleArray from './ChipExampleArray';
import { styles } from '../styles/styles';

const ARTICLEURL = 'http://www.theonion.com/article/trump-spends-entire-classified-national-security-b-53550';

const RightSideBar = props =>
(
  <div id="rightSidebar" style={styles.rightSidebar}>
    <p style={styles.rightSidebarText}>At a glance:</p>
    <div className="iframeContainer" style={styles.iframeContainer}>
      <iframe src={ARTICLEURL} style={styles.iframe} />
    </div>
    <p style={styles.rightSidebarText}>Filters:</p>
    <ChipExampleArray />
  </div>
);

export default RightSideBar;
