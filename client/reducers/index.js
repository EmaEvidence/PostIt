import { combineReducers } from 'redux';
import authUser from './authReducers';
import createGroupReducer from './createGroupReducer';
import getUserGroupsReducer from './getUserGroupsReducer';
import postMessageReducer from './postMessageReducer';


export default combineReducers({
  authUser,
  createGroupReducer,
  getUserGroupsReducer,
  postMessageReducer
});
