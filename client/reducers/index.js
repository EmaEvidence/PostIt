import { combineReducers } from 'redux';
import authUser from './authReducers';
import createGroupReducer from './createGroupReducer';
import getUserGroupsReducer from './getUserGroupsReducer';
import postMessageReducer from './postMessageReducer';
import setUsersReducer from './setUsersReducer';
import setCurrentMessagesReducer from './setCurrentMessagesReducer';
import setCurrentMembersReducer from './setCurrentMembersReducer';
import AddNewMemberReducer from './AddNewMemberReducer';
import myMessagesReducer from './myMessageReducer';
import archivedMessagesReducer from './archivedMessagesReducer';

export default combineReducers({
  authUser,
  createGroupReducer,
  getUserGroupsReducer,
  postMessageReducer,
  setUsersReducer,
  setCurrentMessagesReducer,
  setCurrentMembersReducer,
  AddNewMemberReducer,
  myMessagesReducer,
  archivedMessagesReducer
});
