import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import CommentBox from './CommentBox';

class Comments extends Component {
  constructor(props) {
    super(props);
    console.log('blank');
    console.log(props.replies);
  }

  render() {
    return (
      <div>
        {this.props.replies.map((node, i) => {
          return (
            <CommentBox
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
