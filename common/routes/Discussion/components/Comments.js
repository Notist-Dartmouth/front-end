import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import CommentBox from './CommentBox';
import loadAnnotations from '../actions';

const Comments = props => (
  <div>
    {console.log('About to print the result of loadAnnotations!')}
    {console.log(loadAnnotations(props.location)())}
    {loadAnnotations(props.location).map((node, i) => {
      /* eslint-disable */
      return (<CommentBox node={node} key={i} id={i} />);
      /* eslint-enable */
    })}
  </div>
);


/* eslint-disable */

Comments.propTypes = {
  ordering: PropTypes.array.isRequired,
  location: PropTypes.string.isRequired,
};

/* eslint-enable */

function mapStateToProps(state) {
  const { ordering } = state.Discussion;
  return {
    ordering,
    location,
  };
}

export default connect(mapStateToProps)(Comments);
