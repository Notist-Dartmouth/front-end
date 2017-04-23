import * as types from '../../constants/ActionTypes';

const initialState = {
  data: [],
  lastFetched: null,
  isLoading: false,
  error: null,
};

export default function articles(state = initialState, action) {
  switch (action.type) {
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
    case types.LOAD_ARTICLES_FAILURE:
      return Object.assign({}, state, {
        error: action.error,
      });
    default:
      return state;
  }
}
