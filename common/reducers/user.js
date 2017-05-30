import * as types from '../constants/ActionTypes';

function groups(state = [], action) {
  switch (action.type) {
    case types.RECEIVE_GROUP:
      return [
        ...state,
        action.group,
      ];
    default:
      return state;
  }
}

const initialState = {
  isFetchingUser: false,
  isAuthenticated: false,
  groups: [],
  name: '',
};

function user(state = initialState, action) {
  switch (action.type) {
    case types.UPDATE_USER:
      return Object.assign({}, state, {
        isFetchingUser: false,
        groups: action.groups,
        name: action.name,
        _id: action._id,
        bio: action.bio,
        photoSrc: action.photoSrc,
        isAdmin: action.isAdmin,
        usersFollowingMe: action.usersFollowingMe,
        usersIFollow: action.usersIFollow,
        exploreNumber: action.exploreNumber,
        numExplorations: action.numExplorations,
        exploreStandardDev: action.exploreStandardDev,
      });
    case types.RECEIVE_GROUP:
      return Object.assign({}, state, {
        groups: groups(state.groups, action),
      });
    case types.FETCH_USER:
      return Object.assign({}, state, {
        isFetchingUser: true,
      });
    case types.UPDATE_AUTH_STATUS:
      return Object.assign({}, state, {
        isFetchingUser: false,
        isAuthenticated: action.isAuthenticated,
      });
    case 'GET_RECENT_ANNOTATIONS':
      return Object.assign({}, state, {
        ...state,
        recentAnnotations: action.recentAnnotations,
      });
    default:
      return state;
  }
}

export default user;
