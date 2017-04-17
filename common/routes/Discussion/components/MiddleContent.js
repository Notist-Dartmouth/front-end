import React from 'react';
import MyCard from './MyCard';
import Comments from './Comments';
import { styles } from '../styles/styles';

const MiddleContent = props =>
(
  <div id="card1" style={styles.card}>
    <MyCard title="Trump lol" />
    <Comments />
  </div>
);

export default MiddleContent;
