import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import CommentBox from './CommentBox';
/* eslint-disable */
import traverseDF from '../produceCommentGraph';
import moment from 'moment';
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

    return (
      <div>
        {order.map((node, i) => {
          let name = 'Anonymous';
          if (node.author && node.author.name) {
            name = node.author.name;
            const filteredName = node.author.name.split(' ');

            if (filteredName.length >= 2) {
              if (filteredName[1].charAt(0)) { // If it's not null
                name = `${`${filteredName[0]} ${filteredName[1][0]}`}.`;
              }
            }
          }

          return (
            <CommentBox
              articleURI={this.props.articleURI}
              articleText={this.props.replies.articleText}
              authorName={name}
              profilePicture={name}
              timeSince={moment(node.createDate).fromNow()}
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
