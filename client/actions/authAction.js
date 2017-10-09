import { ADD_USER_DETAILS, ADD_USER_DETAILS_ERROR } from './types/types';

/**
 * authAction creates redux actions
 * @method authAction
 *
 * @param {object} data authentication response object
 * @param {string} message authentication status response
 *
 * @return {function} redux action
 */
const authAction = (data, message) => {
  if (message === 'Error') {
    return {
      data,
      message,
      type: ADD_USER_DETAILS_ERROR
    };
  } else {
    return {
      data,
      type: ADD_USER_DETAILS,
    };
  }
};

export default authAction;
