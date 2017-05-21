import * as types from '../../constants/ActionTypes';

const initialState = {
  isLoading: false,
  articles: [],
  error: null,
};

export default function explore(state = initialState, action) {
  switch (action.type) {
    case types.LOAD_EXPLORE_FAILURE:
      return Object.assign({}, state, {
        isLoading: false,
        error: action.error,
      });
    case types.LOAD_EXPLORE_REQUEST:
      return Object.assign({}, state, {
        isLoading: true,
      });
    case types.LOAD_EXPLORE_SUCCESS:
      return Object.assign({}, state, {
        articles: action.articles,
        isLoading: false,
      });
    default:
      return state;
  }
}
