import * as api from '../../api';

function handleRecentAnnotations(recentAnnotations) {
  return {
    type: 'GET_RECENT_ANNOTATIONS',
    recentAnnotations,
  };
}

export default function getRecentUserAnnotations(userId) {
  console.log(`userId inside getRecent is ${userId}`);
  return (dispatch) => {
    api.getRecentUserAnnotations(userId).then((recentAnnotations) => {
      dispatch(handleRecentAnnotations(recentAnnotations));
    });
  };
}
