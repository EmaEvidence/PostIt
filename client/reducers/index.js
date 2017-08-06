import { combineReducers } from 'redux';
import authUser from './authReducers';
import createGroupReducer from './createGroupReducer';
import getUserGroupsReducer from './getUserGroupsReducer';
import postMessageReducer from './postMessageReducer';
import setCurrentGroupReducer from './setCurrentGroupReducer';
import setCurrentMessagesReducer from './setCurrentMessagesReducer';
import setCurrentMembersReducer from './setCurrentMembersReducer';

export default combineReducers({
  authUser,
  createGroupReducer,
  getUserGroupsReducer,
  postMessageReducer,
  setCurrentGroupReducer,
  setCurrentMessagesReducer,
  setCurrentMembersReducer
});
