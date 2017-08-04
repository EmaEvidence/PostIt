import { combineReducers } from 'redux';
import authUser from './authReducers';
import createGroupReducer from './createGroupReducer';


export default combineReducers({
  authUser,
  createGroupReducer
});
