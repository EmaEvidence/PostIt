import { ADD_USER_DETAILS, ADD_USER_DETAILS_ERROR } from './types/types';

const authAction = (data, message) => {
  if (message === 'Error') {
    return {
      type: ADD_USER_DETAILS_ERROR,
      data,
      message
    };
  } else {
    return {
      type: ADD_USER_DETAILS,
      data
    };
  }
};

export default authAction;
