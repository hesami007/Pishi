import { createStore, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk'; // Updated import for redux-thunk v3
import rootReducer from './reducers';

// Create the Redux store with thunk middleware for async actions
const initialState = {};

const store = createStore(
  rootReducer,
  initialState,
  applyMiddleware(thunk)
);

export default store;
