import {
  GET_PROFILE,
  GET_PROFILES,
  UPDATE_PROFILE,
  PROFILE_ERROR,
  CLEAR_PROFILE,
  FOLLOW_USER,
  UNFOLLOW_USER,
  GET_FOLLOWERS,
  GET_FOLLOWING,
  CLEAR_ERRORS,
  SET_LOADING
} from '../types';

const initialState = {
  profile: null,
  profiles: [],
  followers: [],
  following: [],
  loading: true,
  error: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_PROFILE:
      return {
        ...state,
        profile: action.payload,
        loading: false
      };
    case GET_PROFILES:
      return {
        ...state,
        profiles: action.payload,
        loading: false
      };
    case UPDATE_PROFILE:
      return {
        ...state,
        profile: action.payload,
        loading: false
      };
    case PROFILE_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    case CLEAR_PROFILE:
      return {
        ...state,
        profile: null,
        loading: false
      };
    case FOLLOW_USER:
      return {
        ...state,
        profile: {
          ...state.profile,
          followers: [...state.profile.followers, action.payload],
          followersCount: state.profile.followersCount + 1
        }
      };
    case UNFOLLOW_USER:
      return {
        ...state,
        profile: {
          ...state.profile,
          followers: state.profile.followers.filter(
            follower => follower.user !== action.payload
          ),
          followersCount: state.profile.followersCount - 1
        }
      };
    case GET_FOLLOWERS:
      return {
        ...state,
        followers: action.payload,
        loading: false
      };
    case GET_FOLLOWING:
      return {
        ...state,
        following: action.payload,
        loading: false
      };
    case SET_LOADING:
      return {
        ...state,
        loading: true
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
