import * as api from '../../api';
import { fetchUser } from '../../actions/groups';

function handleRecentAnnotations(recentAnnotations) {
  return {
    type: 'GET_RECENT_ANNOTATIONS',
    recentAnnotations,
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

export function unfollowUser(userId) {
  return (dispatch) => {
    api.unfollowUser(userId).then(() => {
      dispatch(fetchUser());
      dispatch(fetchUserProfileInfo(userId));
    });
  };
}

export function followUser(userId) {
  console.log(`Attempting to follow user with Id: ${userId}`);
  return (dispatch) => {
    api.followUser(userId).then(() => {
      dispatch(fetchUser());
      dispatch(fetchUserProfileInfo(userId));
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
