import * as types from '../../constants/ActionTypes';

const initialState = {
  data: [],
  annotations: [],
  lastFetched: null,
  publicgroups: [],
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
      });
    case 'FETCH_PUBLIC_GROUPS':
      console.log('Hello, I called the reducer!!!!!!');
      return Object.assign({}, state, {
        ...state,
        publicgroups: action.publicgroups,
      });
    default:
      return state;
  }
}
