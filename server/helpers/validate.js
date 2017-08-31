import errorResponseHandler from '../helpers/errorresponsehandler';


export const messageData = (groupId, message, priority, from, res) => {
  if (groupId === '' || groupId === undefined) {
    errorResponseHandler(res, 400, 'Group must be specified');
  } else if (from === '' || from === undefined) {
    errorResponseHandler(res, 400, 'Sender must be specified');
  } else if (message === '' || message === undefined || (message.trim()).length === 0) {
    errorResponseHandler(res, 400, 'message cannot be empty');
  } else if (priority !== 'Normal' && priority !== 'Critical' && priority !== 'Urgent') {
    errorResponseHandler(res, 400, 'Wrong Priority level');
  } else {
    return true;
  }
};

export const signIn = (username, password, res) => {
  if (username === undefined || username === '') {
    errorResponseHandler(res, 400, 'Username can not be empty');
  } else if (password === undefined || password === '') {
    errorResponseHandler(res, 400, 'Password can not be empty');
  } else {
    return true;
  }
};

export const search = (searchTerm, offset, groupId, res) => {
  if ((searchTerm === '' || searchTerm === undefined) ||
      (offset === '' || offset === undefined) ||
      (groupId === '' || groupId === undefined)
    ) {
    errorResponseHandler(res, 400, 'Please supply a search term');
  } else {
    return true;
  }
};

export const group = (groupId, res) => {
  if ((isNaN(groupId) || parseInt(groupId, 10) > 10000000000)) {
    errorResponseHandler(res, 400, 'Invalid Group Selected');
  } else {
    return true;
  }
};

export const googleDetails = (name, email, username, state, res) => {
  if ((name === '' && name === undefined) &&
  (email === '' && email === undefined) &&
  (username === '' && username === undefined) &&
  (state !== 'Sign Up' && username !== 'Sign In')) {
    errorResponseHandler(res, 400, 'Invalid Data Supplied');
  } else {
    return true;
  }
};
