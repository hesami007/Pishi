import { combineReducers } from 'redux';
import authReducer from './authReducer';
import videoReducer from './videoReducer';
import userReducer from './userReducer';
import playlistReducer from './playlistReducer';

// Combine all reducers into a single root reducer
export default combineReducers({
  auth: authReducer,
  videos: videoReducer,
  users: userReducer,
  playlists: playlistReducer
});
