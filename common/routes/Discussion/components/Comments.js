import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import CommentBox from './CommentBox';
import order from '../produceCommentGraph';


class Comments extends Component {
  constructor(props) {
    super(props);
    this.nodes = order;
  }

  render() {
    this.nodes = order;
    console.log('ORDERING: '.concat(this.props.ordering));
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

/* eslint-disable */

Comments.propTypes = {
  ordering: PropTypes.array.isRequired,
};

/* eslint-enable */

function mapStateToProps(state) {
  const { ordering } = state;
  return {
    ordering,
  };
}

export default connect(mapStateToProps)(Comments);
