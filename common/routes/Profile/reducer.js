import * as types from '../../constants';

const initialState = {
  data: [],
  lastFetched: null,
  isEditing: false,
  isLoading: false,
  error: null,
};

export default function posts(state = initialState, action) {
  switch (action.type) {
    case types.LOAD_POSTS_REQUEST:
      return { ...state,
        isLoading: true,
        error: null };
    case types.LOAD_POSTS_SUCCESS:
      return { ...state,
        data: action.payload,
        lastFetched: action.meta.lastFetched,
        isLoading: false };
    case types.LOAD_POSTS_FAILURE:
      return { ...state,
        error: action.payload };
    case 'GET_RECENT_ANNOTATIONS':
      return { ...state,
        recentAnnotations: action.recentAnnotations,
      };
    case 'TOGGLE_EDIT':
      return { ...state,
        isEditing: !action.isEditing,
      };
    case 'EDIT_BIO':
      return { ...state,
        bio: action.editText,
        isEditing: false,
      };
    case 'PROFILE_INFO_UPDATE':
      return { ...state,
        info: action.info,
      };
    default:
      return state;
  }
}

// Example of a co-located selector
export const selectPosts = state => state.posts;
