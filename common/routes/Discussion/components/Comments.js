import React, { Component } from 'react';
import { connect } from 'react-redux';
import CommentBox from './CommentBox';


class Comments extends Component {
  constructor(props) {
    super(props);
    this.nodes = this.props.ordering;
  }

  render() {
    this.nodes = this.props.ordering;
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

function mapStateToProps(state) {
  const { ordering } = state;
  return {
    ordering,
  };
}

export default connect(mapStateToProps)(Comments);
