import React, { Component } from 'react';
import CommentBox from './CommentBox';
import { store } from '../index';

export default class Comments extends Component {
  constructor(props) {
    super(props);
    this.nodes = store.getState().ordering;
  }

  render() {
    this.nodes = store.getState().ordering;
    return (
      <div>
        {this.nodes.map(function (node, i) {
          return (<CommentBox node={node} key={i} id={i} />);
        })}
      </div>
    );
  }
}
