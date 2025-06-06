import {
  GET_PLAYLISTS,
  GET_PLAYLIST,
  CREATE_PLAYLIST,
  UPDATE_PLAYLIST,
  DELETE_PLAYLIST,
  ADD_TO_PLAYLIST,
  REMOVE_FROM_PLAYLIST,
  PLAYLIST_ERROR,
  CLEAR_PLAYLIST,
  SET_LOADING
} from '../types';

const initialState = {
  playlists: [],
  currentPlaylist: null,
  loading: true,
  error: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_PLAYLISTS:
      return {
        ...state,
        playlists: action.payload,
        loading: false
      };
    case GET_PLAYLIST:
      return {
        ...state,
        currentPlaylist: action.payload,
        loading: false
      };
    case CREATE_PLAYLIST:
      return {
        ...state,
        playlists: [action.payload, ...state.playlists],
        loading: false
      };
    case UPDATE_PLAYLIST:
      return {
        ...state,
        playlists: state.playlists.map(playlist =>
          playlist.id === action.payload.id ? action.payload : playlist
        ),
        currentPlaylist: action.payload,
        loading: false
      };
    case DELETE_PLAYLIST:
      return {
        ...state,
        playlists: state.playlists.filter(
          playlist => playlist.id !== action.payload
        ),
        loading: false
      };
    case ADD_TO_PLAYLIST:
      return {
        ...state,
        currentPlaylist: {
          ...state.currentPlaylist,
          videos: [action.payload, ...state.currentPlaylist.videos]
        }
      };
    case REMOVE_FROM_PLAYLIST:
      return {
        ...state,
        currentPlaylist: {
          ...state.currentPlaylist,
          videos: state.currentPlaylist.videos.filter(
            video => video.id !== action.payload
          )
        }
      };
    case PLAYLIST_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    case CLEAR_PLAYLIST:
      return {
        ...state,
        currentPlaylist: null
      };
    case SET_LOADING:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
}
