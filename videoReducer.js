import {
  GET_VIDEOS,
  GET_VIDEO,
  SET_LOADING,
  VIDEOS_ERROR,
  CLEAR_ERRORS,
  ADD_COMMENT,
  LIKE_VIDEO,
  UNLIKE_VIDEO,
  SET_CURRENT_CATEGORY
} from '../types';

const initialState = {
  videos: [],
  trending: [],
  newReleases: [],
  recommended: [],
  currentVideo: null,
  currentCategory: 'all',
  loading: false,
  error: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_VIDEOS:
      return {
        ...state,
        videos: action.payload,
        loading: false
      };
    case GET_VIDEO:
      return {
        ...state,
        currentVideo: action.payload,
        loading: false
      };
    case SET_CURRENT_CATEGORY:
      return {
        ...state,
        currentCategory: action.payload
      };
    case SET_LOADING:
      return {
        ...state,
        loading: true
      };
    case VIDEOS_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    case ADD_COMMENT:
      return {
        ...state,
        currentVideo: {
          ...state.currentVideo,
          comments: [action.payload, ...state.currentVideo.comments]
        }
      };
    case LIKE_VIDEO:
      return {
        ...state,
        currentVideo: {
          ...state.currentVideo,
          likes: [...state.currentVideo.likes, action.payload],
          likesCount: state.currentVideo.likesCount + 1
        }
      };
    case UNLIKE_VIDEO:
      return {
        ...state,
        currentVideo: {
          ...state.currentVideo,
          likes: state.currentVideo.likes.filter(
            like => like.user !== action.payload
          ),
          likesCount: state.currentVideo.likesCount - 1
        }
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null
      };
    default:
      return state;
  }
}
