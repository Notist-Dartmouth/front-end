import React, { Component } from 'react';
import CommentBox from './CommentBox';
import { discussionStore } from '../index';

export default class Comments extends Component {
  constructor(props) {
    super(props);
    this.nodes = discussionStore.getState().ordering;
  }

  render() {
    this.nodes = discussionStore.getState().ordering;
    return (
      <div>
        {this.nodes.map((node, i) => {
          /* eslint-disable */
          return (<CommentBox node={node} key={i} id={i} />);
          /* eslint-enable */
        })}
      </div>
    );
  }
}
