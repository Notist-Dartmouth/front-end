import * as types from '../../constants';

const initialState = {
  data: [],
  lastFetched: null,
  isLoading: false,
  error: null,
};

export default function comments(state = initialState, action) {
  switch (action.type) {
    case types.LOAD_COMMENTS_REQUEST:
      return { ...state,
        isLoading: true,
        error: null };
    case types.LOAD_COMMENTS_SUCCESS:
      return { ...state,
        data: action.payload,
        lastFetched: action.meta.lastFetched,
        isLoading: false };
    case types.LOAD_COMMENTS_FAILURE:
      return { ...state,
        error: action.payload };
    default:
      return state;
  }
}

// Example of a co-located selector
export const selectComments = state => state.comments;
