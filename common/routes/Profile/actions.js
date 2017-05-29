import * as api from '../../api';
// import { fetchUser } from '../../actions/groups';

function handleRecentAnnotations(recentAnnotations) {
  return {
    type: 'GET_RECENT_ANNOTATIONS',
    recentAnnotations,
  };
}

export function toggleFollowUser(userId) {
  console.log(userId);
  // return (dispatch) => {
  //   api.toggleFollowUser(userId).then(() => {
  //     dispatch(fetchUser()); // Update isFollowing accordingly
  //   });
  // };
}

export default function getRecentUserAnnotations(userId) {
  console.log(`userId inside getRecent is ${userId}`);
  return (dispatch) => {
    api.getRecentUserAnnotations(userId).then((recentAnnotations) => {
      dispatch(handleRecentAnnotations(recentAnnotations));
    });
  };
}
