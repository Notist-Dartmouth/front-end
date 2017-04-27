import React, { PropTypes, Component } from 'react';
// import CommentBox from './CommentBox';

// const Comments = props => (
//   <div>
//     {console.log('About to print the result of loadAnnotations!')}
//     {console.log(loadAnnotations(props.location)())}
//     {loadAnnotations(props.location).map((node, i) => {
//       /* eslint-disable */
//       return (<CommentBox node={node} key={i} id={i} />);
//       /* eslint-enable */
//     })}
//   </div>
// );

class Comments extends Component {
  constructor(props) {
    super(props);
    console.log('blank');
    console.log(props.replies);
  }

  render() {
    return (
      <div>
        blah
      </div>
    );
  }
}


/* eslint-disable */

Comments.propTypes = {
  replies: PropTypes.array.isRequired,
};

/* eslint-enable */

export default Comments;
