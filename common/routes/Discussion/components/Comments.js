import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import CommentBox from './CommentBox';
// import order from '../produceCommentGraph';


const Comments = props => (
  <div>
    {props.ordering.map((node, i) => {
      /* eslint-disable */
      return (<CommentBox node={node} key={i} id={i} />);
      /* eslint-enable */
    })}
  </div>
);

/* eslint-disable */

Comments.propTypes = {
  ordering: PropTypes.array.isRequired,
};

/* eslint-enable */

function mapStateToProps(state) {
  const { ordering } = state.Discussion;
  return {
    ordering,
  };
}

export default connect(mapStateToProps)(Comments);
