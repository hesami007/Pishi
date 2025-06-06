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
import { userService } from '../../services/userService';

// Get current user profile
export const getCurrentProfile = () => async dispatch => {
  try {
    dispatch({ type: SET_LOADING });
    
    const profile = await userService.getCurrentProfile();
    
    dispatch({
      type: GET_PROFILE,
      payload: profile
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: err.response?.data?.msg || 'Error fetching profile'
    });
  }
};

// Get profile by ID
export const getProfileById = userId => async dispatch => {
  try {
    dispatch({ type: SET_LOADING });
    
    const profile = await userService.getProfileById(userId);
    
    dispatch({
      type: GET_PROFILE,
      payload: profile
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: err.response?.data?.msg || 'Error fetching profile'
    });
  }
};

// Get all profiles
export const getProfiles = () => async dispatch => {
  try {
    dispatch({ type: CLEAR_PROFILE });
    dispatch({ type: SET_LOADING });
    
    const profiles = await userService.getProfiles();
    
    dispatch({
      type: GET_PROFILES,
      payload: profiles
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: err.response?.data?.msg || 'Error fetching profiles'
    });
  }
};

// Update profile
export const updateProfile = profileData => async dispatch => {
  try {
    const profile = await userService.updateProfile(profileData);
    
    dispatch({
      type: UPDATE_PROFILE,
      payload: profile
    });
    
    return profile;
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: err.response?.data?.msg || 'Error updating profile'
    });
    
    throw err;
  }
};

// Follow user
export const followUser = userId => async dispatch => {
  try {
    const data = await userService.followUser(userId);
    
    dispatch({
      type: FOLLOW_USER,
      payload: data
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: err.response?.data?.msg || 'Error following user'
    });
  }
};

// Unfollow user
export const unfollowUser = userId => async dispatch => {
  try {
    await userService.unfollowUser(userId);
    
    dispatch({
      type: UNFOLLOW_USER,
      payload: userId
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: err.response?.data?.msg || 'Error unfollowing user'
    });
  }
};

// Get followers
export const getFollowers = userId => async dispatch => {
  try {
    dispatch({ type: SET_LOADING });
    
    const followers = await userService.getFollowers(userId);
    
    dispatch({
      type: GET_FOLLOWERS,
      payload: followers
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: err.response?.data?.msg || 'Error fetching followers'
    });
  }
};

// Get following
export const getFollowing = userId => async dispatch => {
  try {
    dispatch({ type: SET_LOADING });
    
    const following = await userService.getFollowing(userId);
    
    dispatch({
      type: GET_FOLLOWING,
      payload: following
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: err.response?.data?.msg || 'Error fetching following users'
    });
  }
};

// Clear profile
export const clearProfile = () => ({ type: CLEAR_PROFILE });

// Clear errors
export const clearErrors = () => ({ type: CLEAR_ERRORS });
