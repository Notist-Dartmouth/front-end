import React, { Component } from 'react';
import { connect } from 'react-redux';

class DiscussionContainer extends Component {
  render() {
    return (
      <div>
        <p>Hi</p>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { comments: state.xxx };
}

// Connect will pass the store.getState to mapStateToProps

const Connector = connect(mapStateToProps)(DiscussionContainer);
export default Connector;
