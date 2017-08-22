import { ADD_USER_DETAILS, ADD_USER_DETAILS_ERROR } from './types/types';
/**
 * [authAction updates store with logged in user data]
 * @method authAction
 * @param  {[object]}   data [user data]
 * @return {[object]}        [redux action]
 */
export default function authAction(data, message) {
  if(message === 'Error') {
    return {
      type: ADD_USER_DETAILS_ERROR,
      data
    };
  } else {
    return {
      type: ADD_USER_DETAILS,
      data
    };
  }
}
