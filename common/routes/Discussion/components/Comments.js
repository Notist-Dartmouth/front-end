import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import CommentBox from './CommentBox';
/* eslint-disable */
import traverseDF from '../produceCommentGraph';
/* eslint-enable */

// function sortByTime(order) {
//   // Loop through the order array and update and bucketized neighbors in same array if of the same depth
//   // Sort each of the sub arrays in the big array in probably O(nlgn) time
//   // Flatten the newly sorted array to obtain array sorted by most recent!
//
//   // 1 Divide into sub arrays
//   for elem in ordering:
//
//     if (ordering.length < 2) { //Array is only one element -- already sorted
//       return;
//     }
//
//     if (i == ordering.length - 2) { //Don't go out of bounds of the array
//       break;
//     }
//
//     a = new Array[];
//
//     if (ordering[i].depth == ordering[i+1].depth)
//       a.push;
//
// // 2 // Sort sub arrays
// for (elem in a) {
//   if (!(elem.length < 2)) {
//     elem = sort(elem);
//   }
// }
//
// // 3 Flatten Array
//   var merged = [].concat([a]);
//
//
//
//   order.map((node, i) => {
//     const date = node.createDate;
//
//     return 5;
//   });
//   return 0;
// }

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
