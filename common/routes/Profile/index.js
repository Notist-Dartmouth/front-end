import React from 'react';
import ProfileCard from './components/profileCard';
import Annotation from '../Discussion/components/MyCard';

const Profile = props => (
  <div>
    <ProfileCard />
    <Annotation />
  </div>
);

// CommentBox.propTypes = {
//   parentIdx: PropTypes.number.isRequired,
//   isVisible: PropTypes.bool.isRequired,
//   dispatch: PropTypes.func.isRequired,
//   ordering: PropTypes.array.isRequired,
// };

/* eslint-enable */

// function mapStateToProps(state) {
//   const { parentIdx, isVisible, ordering } = state.Discussion;
//   return {
//     parentIdx,
//     isVisible,
//     ordering,
//   };
// }

// export default connect(mapStateToProps)(Profile);

export default Profile;
