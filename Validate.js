import errorResponseHandler from '../helpers/errorResponseHandler';

/**
 * messageData validates data sent to postMessage endpoint
 * @method messageData
 *
 * @param  {number} groupId id of the group the message is for
 * @param  {string} message body of the message
 * @param  {string} priority level of priority
 * @param  {string} groupName level of priority
 * @param  {number} sender id of the user sending the message
 * @param  {object} res response object if the data is invalid
 *
 * @return {boolean} validity response back to the controller
 */
export const messageData = (groupId,
  message, priority, groupName, sender, res) => {
  if (groupId === '' || groupId === undefined) {
    errorResponseHandler(res, 400, 'Group must be specified');
  } else if (sender === '' || sender === undefined) {
    errorResponseHandler(res, 400, 'Sender must be specified');
  } else if (message === '' ||
    message === undefined || (message.trim()).length === 0) {
    errorResponseHandler(res, 400, 'message cannot be empty');
  } else if (priority !== 'Normal' &&
    priority !== 'Critical' && priority !== 'Urgent') {
    errorResponseHandler(res, 400, 'Please Select a Priority level');
  } else if (groupName === '' && groupName === undefined) {
    errorResponseHandler(res, 400, 'Group Name must be defined');
  } else {
    return true;
  }
};

/**
 * signIn validates data sent to signin endpoint
 * @method signIn
 *
 * @param  {string} username user's username
 * @param  {string} password user password
 * @param  {object} res server response
 *
 * @return {boolean} response sent back to the controller
 */
export const signIn = (username, password, res) => {
  if (username === undefined || username === '') {
    errorResponseHandler(res, 400, 'Username can not be empty');
  } else if (password === undefined || password === '') {
    errorResponseHandler(res, 400, 'Password can not be empty');
  } else {
    return true;
  }
};

/**
 * search validates data sent to the search end point
 * @method search
 *
 * @param  {string} searchTerm the term being looked for
 * @param  {number} offset the number of records to be skipped in the database
 * @param  {number} groupId id of the group from where the search is being done
 * @param  {object} res server response
 *
 * @return {boolean} response sent back to the controller
 */
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

/**
 * group validates data sent to group routes
 * @method group
 *
 * @param  {number} groupId id of the group
 * @param  {object} res server response
 *
 * @return {boolean} response sent back to the controller
 */
export const group = (groupId, res) => {
  if ((isNaN(groupId) || parseInt(groupId, 10) > 10000000000)) {
    errorResponseHandler(res, 404, 'Group Not Found');
  } else {
    return true;
  }
};

/**
 * googleDetails validates the data sent for authentication with google
 * @method googleDetails
 *
 * @param  {string} name name of the user
 * @param  {string} email email of the user
 * @param  {string} username username of the user
 * @param  {string} type authentication type
 * @param  {object} res server response
 *
 * @return {boolean} response sent back to the controller
 */
export const googleDetails = (name, email, username, type, res) => {
  if ((name === '' && name === undefined) &&
  (email === '' && email === undefined) &&
  (username === '' && username === undefined) &&
  (type !== 'Sign Up' && username !== 'Sign In')) {
    errorResponseHandler(res, 400, 'Invalid Data Supplied');
  } else {
    return true;
  }
};

/**
 * addUser validates data sent to addUser
 * @method addUser
 *
 * @param  {number} groupId unique identifier for the group
 * @param  {number} user unique identifier for the user
 * @param  {boolean} res server response
 *
 * @return {boolean} response sent back to the controller
 */
export const addUser = (groupId, user, res) => {
  if ((groupId === '' && groupId === undefined) && (isNaN(groupId))) {
    errorResponseHandler(res, 400, 'Invalid Group Id Supplied');
  } else if (isNaN(user)) {
    errorResponseHandler(res, 400, 'Invalid user data Supplied');
  } else {
    return true;
  }
};

/**
 * createGroup validates data sent to createGroup
 * @method createGroup
 *
 * @param  {string} groupName name of the group
 * @param  {array} users array or string of unique identifier for the users
 * @param  {boolean} res server response
 *
 * @return {boolean} response sent back to the controller
 */
export const createGroup = (groupName, users, res) => {
  if ((groupName === null &&
    groupName === undefined) && (groupName.search(' '))) {
    errorResponseHandler(res, 400, 'Invalid Group Name Supplied');
  } else if (typeof users !== 'string' && !(Array.isArray(users))) {
    errorResponseHandler(res, 400, 'Invalid users Supplied');
  } else {
    return true;
  }
};
