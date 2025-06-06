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
import { videoService } from '../../services/videoService';

// Get all videos
export const getVideos = (category = 'all') => async dispatch => {
  try {
    dispatch({ type: SET_LOADING });
    
    const videos = await videoService.getVideos(category);
    
    dispatch({
      type: GET_VIDEOS,
      payload: videos
    });
  } catch (err) {
    dispatch({
      type: VIDEOS_ERROR,
      payload: err.response?.data?.msg || 'Error fetching videos'
    });
  }
};

// Get single video
export const getVideo = id => async dispatch => {
  try {
    dispatch({ type: SET_LOADING });
    
    const video = await videoService.getVideoById(id);
    
    dispatch({
      type: GET_VIDEO,
      payload: video
    });
  } catch (err) {
    dispatch({
      type: VIDEOS_ERROR,
      payload: err.response?.data?.msg || 'Error fetching video'
    });
  }
};

// Add comment
export const addComment = (videoId, commentText) => async dispatch => {
  try {
    const comment = await videoService.addComment(videoId, commentText);
    
    dispatch({
      type: ADD_COMMENT,
      payload: comment
    });
  } catch (err) {
    dispatch({
      type: VIDEOS_ERROR,
      payload: err.response?.data?.msg || 'Error adding comment'
    });
  }
};

// Like video
export const likeVideo = videoId => async dispatch => {
  try {
    const data = await videoService.likeVideo(videoId);
    
    dispatch({
      type: LIKE_VIDEO,
      payload: data
    });
  } catch (err) {
    dispatch({
      type: VIDEOS_ERROR,
      payload: err.response?.data?.msg || 'Error liking video'
    });
  }
};

// Unlike video
export const unlikeVideo = videoId => async dispatch => {
  try {
    await videoService.unlikeVideo(videoId);
    
    dispatch({
      type: UNLIKE_VIDEO,
      payload: videoId
    });
  } catch (err) {
    dispatch({
      type: VIDEOS_ERROR,
      payload: err.response?.data?.msg || 'Error unliking video'
    });
  }
};

// Set current category
export const setCurrentCategory = category => dispatch => {
  dispatch({
    type: SET_CURRENT_CATEGORY,
    payload: category
  });
  
  dispatch(getVideos(category));
};

// Clear Errors
export const clearErrors = () => ({ type: CLEAR_ERRORS });
