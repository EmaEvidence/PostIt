import { ADD_USER_DETAILS, ADD_USER_DETAILS_ERROR } from './types/types';

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
