import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import CommentBox from './CommentBox';
/* eslint-disable */
import traverseDF from '../produceCommentGraph';
/* eslint-enable */


class Comments extends Component {
  constructor(props) {
    super(props);
    console.log(props.replies);
  }
// Connect this to comment id -- rerender --> compute order in the action
  render() {
    const order = traverseDF(this.props.replies, () => {

    });

    console.log('Posting ordering!');
    console.log(order);
    return (
      <div>
        {order.map((node, i) => {
          return (
            <CommentBox
              ordering={order}
              node={node}
              key={node._id}
              dispatch={this.props.dispatch}
              id={i}
            />);
        })}
      </div>
    );
  }
}

/* eslint-disable */

Comments.propTypes = {
  replies: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired,
};

/* eslint-enable */

export default connect()(Comments);
