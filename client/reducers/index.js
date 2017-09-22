import { combineReducers } from 'redux';

import authUser from './authReducers';
import groupReducer from './groupReducer';
import postMessageReducer from './postMessageReducer';
import setUsersReducer from './setUsersReducer';
import setCurrentMessagesReducer from './setCurrentMessagesReducer';
import setCurrentMembersReducer from './setCurrentMembersReducer';
import addNewMemberReducer from './addNewMemberReducer';
import myMessagesReducer from './myMessageReducer';
import searchUserReducer from './searchUserReducer';
import resetPasswordReducer from './resetPasswordReducer';
import archivedMessageReducer from './archivedMessageReducer';

export default combineReducers({
  authUser,
  groupReducer,
  postMessageReducer,
  setUsersReducer,
  setCurrentMessagesReducer,
  setCurrentMembersReducer,
  addNewMemberReducer,
  myMessagesReducer,
  searchUserReducer,
  resetPasswordReducer,
  archivedMessageReducer
});
