import * as types from '../../constants/ActionTypes';

const initialState = {
  data: [],
  annotations: [],
  lastFetched: null,
  publicgroups: [],
  search: [],
  toggled: false,
  searchIsEmpty: true,
  isLoading: false,
  error: null,
};

export default function articles(state = initialState, action) {
  switch (action.type) {
    case types.LOAD_ANNOTATIONS_REQUEST:
    case types.LOAD_ARTICLES_REQUEST:
      return Object.assign({}, state, {
        isLoading: true,
        error: null,
      });
    case types.LOAD_ARTICLES_SUCCESS:
      return Object.assign({}, state, {
        data: action.articles,
        lastFetched: action.lastFetched,
        isLoading: false,
      });
    case types.LOAD_ANNOTATIONS_FAILURE:
    case types.LOAD_ARTICLES_FAILURE:
      return Object.assign({}, state, {
        error: action.error,
      });
    case types.LOAD_ANNOTATIONS_SUCCESS:
      return Object.assign({}, state, {
        annotations: [
          ...state.annotations,
          ...action.annotations.filter(a => !state.annotations.map(sa => sa._id).includes(a._id)),
        ],
        isLoading: false,
      });
    case 'EXECUTE_SEARCH':
      return Object.assign({}, state, {
        ...state,
        search: action.search,
        searchIsEmpty: action.searchIsEmpty,
      });
    case 'TOGGLE_SHOW_GROUPS':
      return Object.assign({}, state, {
        ...state,
        toggled: action.toggled,
        search: action.search,
      });
    case 'FETCH_PUBLIC_GROUPS':
      return Object.assign({}, state, {
        ...state,
        publicgroups: action.publicgroups,
        search: action.publicgroups.filter(pg => state.search.map(sg => sg._id).includes(pg._id)),
      });
    case 'UPDATE_UNREAD_NOTIFICATIONS':
      return Object.assign({}, state, {
        ...state,
        numUnreadNotifications: action.numUnreadNotifications,
      });
    case 'NOTIFICATIONS':
      return Object.assign({}, state, {
        ...state,
        notifications: action.notifications,
      });
    default:
      return state;
  }
}
