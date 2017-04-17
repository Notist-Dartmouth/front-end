import React, { Component } from 'react';
import MyCard from './MyCard';
import Comments from './Comments';
import { styles } from '../styles/styles';

export default class MiddleContent extends Component {
  render() {
    return (
      <div id="card1" style={styles.card}>
        <MyCard title="Trump lol" />
        <Comments />
      </div>
    );
  }
}
