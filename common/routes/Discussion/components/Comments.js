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

    // const newOrder = sortByTime(order);

    console.log('Posting ordering!');
    // console.log(newOrder);
    return (
      <div>
        {order.map((node, i) => {
          return (
            <CommentBox
              articleURI={this.props.articleURI}
              articleText={this.props.replies.articleText}
              ordering={order}
              node={node}
              key={node._id}
              commentId={node._id}
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
  articleURI: PropTypes.string.isRequired,
  replies: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
};

/* eslint-enable */

export default connect()(Comments);
