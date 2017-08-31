import User from '../helpers/user';
import errorResponseHandler from '../helpers/errorresponsehandler';
import * as validate from '../helpers/validate';

const user = new User();

const Controller = {
  /**
   * addUser controls the addition of a user to a group
   *
   * @param  {object} req request sent from frontend
   * @param  {object} res response from the server
   *
   * @return {object} []
   */
  addUser: (req, res) => {
    const groupId = req.params.groupId;
    const usersToAdd = req.body.user;
    const userAdding = req.token.data.id;
    user.addUsers(groupId, usersToAdd, userAdding, (result) => {
      if (typeof result === 'string') {
        if (result.search('UserId') >= 0) {
          errorResponseHandler(res, 404, 'User Does not exist');
        } else if (result.search('GroupId') >= 0) {
          errorResponseHandler(res, 404, 'Group Does not exist');
        }
        errorResponseHandler(res, 400, result);
      } else {
        res.status(200).json({
          user: result,
          message: 'Added Successfully'
        });
      }
    });
  },
  /**
   * createGroup controls the creation of a group
   *
   * @param  {object} req request sent from frontend
   * @param  {object} res response from the server
   *
   * @return {object} []
   */
  createGroup: (req, res) => {
    const groupName = req.body.groupName;
    console.log(groupName, '=========-------===========');
    let users = req.body.users;
    const userId = req.token.data.id;
    if (typeof users === 'string') {
      users = users.replace(/ /g, '');
      users = users.split(',');
    }
    user.createGroup(groupName, userId, users, (result) => {
      if (typeof result === 'string') {
        errorResponseHandler(res, 400, result);
      } else {
        res.status(201).json({
          group: result,
          message: 'Group creation Successful'
        });
      }
    });
  },
  /**
   * deleteUser controls the removal of an existing user
   *
   * @param {object} req request sent from frontend
   * @param {object} res response from the server
   *
   * @return {object} []
   */
  deleteUser: (req, res) => {
    const userId = req.body.user || req.token.data.email;
    user.deleteUserss(userId, (result) => {
      if (result === 1) {
        res.status(200).json({
          message: 'Deleted'
        });
      }
    });
  },

  /**
   * getGroupMessages controls the retrieval of messages for a group
   *
   * @param  {object} req request sent from frontend
   * @param  {object} res response from the server
   *
   * @return {object} []
   */
  getGroupMessages: (req, res) => {
    const groupId = req.params.groupId;
    if (validate.group(groupId, res)) {
      user.retrieveMessage(groupId, (result) => {
        if (result.length === 0) {
          errorResponseHandler(res, 404, 'No Message For that Group');
        } else {
          res.status(200).json({
            messages: result,
            message: 'Message Retrival Successful'
          });
        }
      });
    }
  },
  /**
   * getGroupUsers controls the retrieval of every member of a group
   *
   * @param  {object} req request sent from frontend
   * @param  {object} res response from the server
   *
   * @return {object} []
   */
  getGroupUsers: (req, res) => {
    const groupId = req.params.groupId;
    if (validate.group(groupId, res)) {
      user.getGroupMembers(groupId, (result) => {
        if (typeof result === 'string' || result.length === 0) {
          errorResponseHandler(res, 404, 'No Such Group');
        } else {
          res.status(200).json({
            users: result,
            message: 'Users Retrival Successful'
          });
        }
      });
    }
  },
  /**
   * getUserGroups controls retrieval of every group a user belongs to
   *
   * @param {object} req request sent from frontend
   * @param {object} res response from the server
   *
   * @return {object} []
   */
  getUserGroups: (req, res) => {
    const userId = req.token.data.id;
    user.getUserGroups(userId, (result) => {
      if (result.length === 0) {
        errorResponseHandler(res, 404, 'No Group Yet');
      } else {
        res.status(200).json({
          groups: result,
          message: 'Group Retrival Successful'
        });
      }
    });
  },
  /**
   * postMessage controls posting of messages to a group
   *
   * @param {object} req request sent from frontend
   * @param {object} res response from the server
   *
   * @return {object} []
   */
  postMessage: (req, res) => {
    const groupId = req.params.groupId;
    const message = req.body.message;
    const priority = (req.body.priority) ? req.body.priority : 'Normal';
    const from = req.token.data.id;
    if (validate.messageData(groupId, message, priority, from, res)) {
      user.postMessage(groupId, from, message, priority, (result, users) => {
        if (typeof result === 'string') {
          errorResponseHandler(res, 404, 'Group does not Exist');
        } else {
          user.inAppNotify(users, groupId, from, () => {
          });
          res.status(200).json({
            messageData: result,
            message: 'Message Added.'
          });
        }
      });
    }
  },

  /**
   * signin controls authorization of an existing user
   *
   * @param  {object} req request sent from frontend
   * @param  {object} res response from the server
   *
   * @return {object} []
   */
  signIn: (req, res) => {
    const { username, password } = req.body;
    if (validate.signIn(username, password, res)) {
      user.logIn(username, password, (result) => {
        if (result === 'Failed, Wrong Password' ||
          result === 'Failed, Username not Found') {
          errorResponseHandler(res, 400, result);
        } else {
          res.status(200).json({
            user: result,
            message: 'Sign In Successful'
          });
        }
      });
    }
  },
  /**
   * signup controls registration of a new user
   *
   * @param {object} req request sent from frontend
   * @param {object} res response from the server
   *
   * @return {object} []
   */
  signUp: (req, res) => {
    const { name, username, email, password, phone } = req.body;
    user.signUp(name, username, email, password, phone, (result) => {
      if (typeof result !== 'object') {
        errorResponseHandler(res, 400, result);
      } else {
        res.status(201).json({
          user: result,
          message: 'Registration Successful'
        });
      }
    });
  },

  /**
   * getAllUsers retrieves every user in the App
   *
   * @param  {object} req request sent from frontend
   * @param  {object} res response from the server
   *
   * @return {object} []
   */
  getAllUsers: (req, res) => {
    user.getAllUsers((result) => {
      res.json({
        users: result
      });
    });
  },

  /**
   * messageRead controls the group of messages as seen
   *
   * @param  {object} req request sent from frontend
   * @param  {object} res response from the server
   *
   * @return {object} []
   */
  messageRead: (req, res) => {
    const messageId = req.body.messageId;
    const userId = req.token.data.id;
    if (messageId === '' || messageId === undefined) {
      errorResponseHandler(res, 404, 'No message Specified');
    } else {
      user.seenMessages(messageId, userId, (result) => {
        if (result === 'Read') {
          return res.status(200).json({
            messageRead: result,
            message: 'Message Read'
          });
        } else {
          errorResponseHandler(res, 500, 'Error Reading Message');
        }
      });
    }
  },

  /**
   * searchUser controls searching for user
   *
   * @param  {object} req request sent from frontend
   * @param  {object} res response from the server
   *
   * @return {object} []
   */
  searchUser: (req, res) => {
    const { searchTerm, offset, groupId } = req.body;
    if (validate.search(searchTerm, offset, groupId, res)) {
      user.searchUsers(searchTerm, offset, groupId, (result) => {
        return res.status(200).json({
          message: 'Search Result',
          users: result.rows,
          count: result.count
        });
      });
    }
  },

  /**
   * mymessage controls the retrieval of messages sent by a user
   *
   * @param  {object} req request sent from frontend
   * @param  {object} res response from the server
   *
   * @return {object} []
   */
  mymessage: (req, res) => {
    const userId = req.token.data.id;
    user.myMessages(userId, (result) => {
      return res.status(200).json({
        message: 'You Messages',
        messages: result
      });
    });
  },
  /**
   * archivedMessages controls retrieval of seen messages
   *
   * @param  {object} req request sent from frontend
   * @param  {object} res response from the server
   *
   * @return {object} []
   */
  archivedMessages: (req, res) => {
    const userId = req.token.data.id;
    user.archivedMessages(userId, (result) => {
      return res.status(200).json({
        message: 'Read Messages',
        messages: result
      });
    });
  },

  /**
   * forgetPassword controls the requesting for changing password
   *
   * @param {object} req request sent from frontend
   * @param {object} res response from the server
   *
   * @return {object} []
   */
  forgotPassword: (req, res) => {
    const email = req.body.email;
    if (email !== '' && email !== undefined) {
      user.sendPasswordResetMail(email, (result) => {
        if (result === 'Email Address Not found') {
          errorResponseHandler(res, 404, 'Email Address Not found');
        } else {
          return res.status(200).json({
            message: 'A mail has being sent to you.',
            user: result
          });
        }
      });
    } else {
      errorResponseHandler(res, 400, 'Please Supply your Email');
    }
  },

  /**
   * newPassword controls resetting of password
   *
   * @param  {object} req request sent from frontend
   * @param  {object} res response from the server
   *
   * @return {object} []
   */
  newPassword: (req, res) => {
    const { userKey, newPassword } = req.body;
    if ((newPassword !== '' && newPassword !== undefined) && (userKey !== '' && userKey !== undefined)) {
      user.resetPassword(newPassword, userKey, (result) => {
        if (result === 'Password Updated') {
          return res.status(200).json({
            message: 'Password Updated, please sign In with the new Password',
            user: result
          });
        } else if (result === 'Password Must Contain Alphabets, Numbers, Special Characters and Must be Longer than 8') {
          errorResponseHandler(res, 400, result);
        } else {
          errorResponseHandler(res, 500, 'Internal Server Error');
        }
      });
    } else {
      errorResponseHandler(res, 400, 'Invalid Input Supplied.');
    }
  },

  /**
   * googleAuth controls authorization with google+
   *
   * @param  {object} req request sent from frontend
   * @param  {object} res response from the server
   *
   * @return {object} []
   */
  googleAuth: (req, res) => {
    const { name, email, state } = req.body;
    const username = (email.split('@')[0]).replace(/[^a-zA-Z0-9]/g, '');
    const password = 'social';
    if (validate.googleDetails(name, email, username, res)) {
      if (state === 'Sign Up') {
        user.googleSignUp(name, email, username, state, password, (result) => {
          if (typeof result === 'string') {
            errorResponseHandler(res, 400, result);
          } else {
            return res.status(200).json({
              message: 'Sign Up Successful',
              user: result
            });
          }
        });
      } else {
        user.googleSignIn(name, email, username, state, password, (result) => {
          if (typeof result === 'string') {
            errorResponseHandler(res, 400, result);
          } else {
            return res.status(200).json({
              message: 'Sign Up Successful',
              user: result
            });
          }
        });
      }
    }
  },

};

export default Controller;
