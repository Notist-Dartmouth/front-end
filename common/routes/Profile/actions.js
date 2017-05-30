import * as api from '../../api';
import { fetchUser } from '../../actions/groups';

function handleRecentAnnotations(recentAnnotations) {
  return {
    type: 'GET_RECENT_ANNOTATIONS',
    recentAnnotations,
  };
}

export function toggleFollowUser(userId) {
  return (dispatch) => {
    api.followUser(userId).then(() => {
      dispatch(fetchUser()); // Update isFollowing accordingly
    });
  };
}

export function handleEditBioSuccess(annotationId, text) {
  return {
    type: 'EDIT_BIO',
    editText: text,
    isEditing: false,
  };
}

function handleUserProfileInfo(info) {
  return {
    type: 'PROFILE_INFO_UPDATE',
    info,
  };
}

export function fetchUserProfileInfo(userId) {
  return (dispatch) => {
    api.fetchUserProfileInfo(userId).then((json) => {
      if (json.SUCCESS) {
        dispatch(handleUserProfileInfo(userId));
      }
    });
  };
}

export function editBio(userId, editText) {
  return (dispatch) => {
    api.editBio(userId, editText).then((json) => {
      if (json.SUCCESS) {
        dispatch(handleEditBioSuccess(userId, editText));
      }
    });
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
