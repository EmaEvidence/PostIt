import { combineReducers } from 'redux';

import authUser from './authReducers';
import groupReducer from './groupReducer';
import setUsersReducer from './setUsersReducer';
import setCurrentMembersReducer from './setCurrentMembersReducer';
import addNewMemberReducer from './addNewMemberReducer';
import searchUserReducer from './searchUserReducer';
import resetPasswordReducer from './resetPasswordReducer';
import getAllUsersReducer from './getAllUsersReducer';
import messageReducer from './messageReducer';

export default combineReducers({
  authUser,
  groupReducer,
  setUsersReducer,
  setCurrentMembersReducer,
  addNewMemberReducer,
  searchUserReducer,
  resetPasswordReducer,
  getAllUsersReducer,
  messageReducer
});
