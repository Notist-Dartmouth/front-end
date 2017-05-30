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

export function handleEditBioSuccess(userId, text) {
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
      dispatch(handleUserProfileInfo(json));
    });
  };
}

export function editBio(userId, editText) {
  return (dispatch) => {
    api.editBio(editText).then((json) => {
      if (json.SUCCESS) {
        Promise.resolve(dispatch(handleEditBioSuccess(editText))).then(() => {
          dispatch(fetchUserProfileInfo(userId));
        });

        dispatch();
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
