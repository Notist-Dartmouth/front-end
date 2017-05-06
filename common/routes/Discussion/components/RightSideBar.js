import React, { Component } from 'react';
import { styles } from '../styles/styles';

export default class RightSideBar extends Component {

  render() {
    return (
      <div id="rightSidebar" style={styles.rightSidebar}>
        <p style={styles.rightSidebarText}>At a glance:</p>
        <div className="iframeContainer" style={styles.iframeContainer}>
          <iframe src={this.props.articleURI} style={styles.iframe} />
        </div>
        <p style={styles.rightSidebarText}>Filters:</p>
      </div>
    );
  }
}
