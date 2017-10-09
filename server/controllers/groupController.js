import User from '../helpers/User';
import errorResponseHandler from '../helpers/errorResponseHandler';
import * as validate from '../helpers/validate';

const user = new User();

/**
 * addUser controls the addition of a user to a group
 * @method addUser
 *
 * @param  {object} req request sent from frontend
 * @param  {object} res response from the server
 *
 * @return {object} API response
 */
export const addUser = (req, res) => {
  const groupId = req.params.groupId;
  const userToAdd = req.body.user;
  const userAdding = req.token.data.id;
  if (validate.addUser(groupId, userToAdd, res)) {
    user.addUsers(groupId, userToAdd, userAdding, (result) => {
      if (typeof result === 'string') {
        if (result.search('UserId') >= 0) {
          errorResponseHandler(res, 404, 'User Does not exist');
        } else if (result.search('GroupId') >= 0) {
          errorResponseHandler(res, 404, 'Group Does not exist');
        } else if (result === 'User is already a member') {
          errorResponseHandler(res, 409, result);
        } else if ((result.search('invalid input syntax for integer') >= 0) ||
      (result.search('is out of range for type integer') >= 0)) {
          const errorMessage = 'Supplied Group or User Identity Out of Range';
          errorResponseHandler(res, 400, errorMessage);
        } else if (result === 'Group Id must be stated' ||
          result === 'User Id must be stated') {
          errorResponseHandler(res, 400, result);
        } else {
          errorResponseHandler(res, 500, 'Internal Server Error');
        }
      } else {
        res.status(200).json({
          user: result,
          message: 'Added Successfully'
        });
      }
    });
  }
};

/**
 * createGroup controls the creation of a group
 * @method createGroup
 *
 * @param  {object} req request sent from frontend
 * @param  {object} res response from the server
 *
 * @return {object} API response
 */
export const createGroup = (req, res) => {
  const groupName = req.body.groupName;
  let users = req.body.users;
  const userId = req.token.data.id;
  if (typeof users === 'string') {
    users = users.replace(/ /g, '');
    users = users.split(',');
  } if (validate.createGroup(groupName, users, res)) {
    user.createGroup(groupName, userId, users, (result) => {
      if (typeof result === 'string') {
        const groupNameError = 'value too long for type character varying(255)';
        if (result === 'Group Exists already') {
          errorResponseHandler(res, 409, result);
        } else if (result === groupNameError) {
          const errorMessage = 'Group Name should be below 225 characters';
          errorResponseHandler(res, 400, errorMessage);
        } else if (result === 'Internal Server Error') {
          errorResponseHandler(res, 500, result);
        } else {
          errorResponseHandler(res, 400, result);
        }
      } else {
        res.status(201).json({
          group: result,
          message: 'Group creation Successful'
        });
      }
    });
  }
};

/**
 * getGroupMessages controls the retrieval of messages for a group
 * @method getGroupMessages
 *
 * @param  {object} req request sent from frontend
 * @param  {object} res response from the server
 *
 * @return {object} API response
 */
export const getGroupMessages = (req, res) => {
  const groupId = req.params.groupId;
  const username = req.token.data.username;
  if (validate.group(groupId, res)) {
    user.retrieveMessage(groupId, username, (result) => {
      if (result.length === 0) {
        errorResponseHandler(res, 404, 'No Message For that Group');
      } else if (typeof result === 'string') {
        errorResponseHandler(res, 500, 'Error Reading Message');
      } else {
        res.status(200).json({
          messages: result,
          message: 'Message Retrival Successful'
        });
      }
    });
  }
};

/**
 * getGroupUsers controls the retrieval of every member of a group
 * @method getGroupUsers
 *
 * @param  {object} req request sent from frontend
 * @param  {object} res response from the server
 *
 * @return {object} API response
 */
export const getGroupUsers = (req, res) => {
  const groupId = req.params.groupId;
  if (validate.group(groupId, res)) {
    user.getGroupMembers(groupId, (result) => {
      if (typeof result === 'string') {
        errorResponseHandler(res, 500, 'Internal Error');
      } else if (result.length === 0) {
        errorResponseHandler(res, 404, 'No Member for this Group');
      } else if (result === null) {
        errorResponseHandler(res, 404, 'No Such Group');
      } else {
        res.status(200).json({
          users: result,
          message: 'Users Retrival Successful'
        });
      }
    });
  }
};

/**
 * postMessage sends a message to a group
 * @method postMessage
 *
 * @param  {object} req request sent from frontend
 * @param  {object} res response from the server
 *
 * @return {object} API response
 */
export const postMessage = (req, res) => {
  const { groupName, message } = req.body;
  const groupId = req.params.groupId;
  const priority = (req.body.priority) ? req.body.priority : 'Normal';
  const sender = req.token.data.id;
  const username = req.token.data.username;
  if (validate.messageData(groupId, message, priority, groupName,
     sender, res)) {
    user.postMessage(groupId,
      username, sender, message, priority, (result, users) => {
        if (typeof result === 'string') {
          if (result === 'Not a Group Member') {
            errorResponseHandler(res, 403, 'Not a Group Member');
          } else if (result === 'Internal Error') {
            errorResponseHandler(res, 500, 'Internal Error');
          } else {
            errorResponseHandler(res, 404, 'Group does not Exist');
          }
        } else {
          const userId = req.token.data.id;
          user.inAppNotify(users, groupId, username, groupName, userId);
          res.status(201).json({
            messageData: result,
            message: 'Message Added.',
            notification: {
              message: 'Notification sent'
            }
          });
        }
      });
  }
};
