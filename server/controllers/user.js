import User from '../helpers/user';
import errorResponseHandler from '../helpers/errorresponsehandler';
import * as validate from '../helpers/validate';

const user = new User();

const UserController = {
  /**
   * deleteUser controls the removal of an existing user
   *
   * @param {object} req request sent from frontend
   * @param {object} res response from the server
   *
   * @return {object} API response
   */
  deleteUser: (req, res) => {
    const userId = req.body.user || req.token.data.email;
    user.deleteUsers(userId, (result) => {
      if (result === 1) {
        res.status(200).json({
          message: 'Deleted'
        });
      } else if (result === 0) {
        errorResponseHandler(res, 404, 'User not Found');
      } else {
        errorResponseHandler(res, 400, 'Invalid Data');
      }
    });
  },

  /**
   * getUserGroups controls retrieval of every group a user belongs to
   *
   * @param {object} req request sent from frontend
   * @param {object} res response from the server
   *
   * @return {object} API response
   */
  getUserGroups: (req, res) => {
    const userId = req.token.data.id;
    user.getUserGroups(userId, (result) => {
      if (result.length === 0) {
        errorResponseHandler(res, 404, 'No Group Yet');
      } else if (typeof result === 'string') {
        errorResponseHandler(res, 500, 'Error Fetching Group');
      } else {
        res.status(200).json({
          groups: result,
          message: 'Group Retrival Successful'
        });
      }
    });
  },

  /**
   * signin controls authorization of an existing user
   *
   * @param  {object} req request sent from frontend
   * @param  {object} res response from the server
   *
   * @return {object} API response
   */
  signIn: (req, res) => {
    const { username, password } = req.body;
    if (validate.signIn(username, password, res)) {
      user.logIn(username, password, (result) => {
        if (result === 'Failed, Wrong Password') {
          errorResponseHandler(res, 400, result);
        } else if (result === 'Failed, Username not Found') {
          errorResponseHandler(res, 404, result);
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
   * @return {object} API response
   */
  signUp: (req, res) => {
    const { name, username, email, password, phone } = req.body;
    user.signUp(name, username, email, password, phone, (result) => {
      if (result === 'Internal Server Error') {
        errorResponseHandler(res, 500, result);
      } else if (typeof result !== 'object') {
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
   * @return {object} API response
   */
  getAllUsers: (req, res) => {
    user.getAllUsers((result) => {
      if (typeof result === 'string') {
        errorResponseHandler(res, 500, 'Error Fetching users');
      } else {
        res.status(200).json({
          users: result
        });
      }
    });
  },

  /**
   * messageRead controls the group of messages as seen
   *
   * @param  {object} req request sent from frontend
   * @param  {object} res response from the server
   *
   * @return {object} API response
   */
  messageRead: (req, res) => {
    const messages = req.body.messages;
    const username = req.token.data.username;
    if (messages === '' || messages === undefined) {
      errorResponseHandler(res, 400, 'No message Specified');
    } else {
      user.seenMessages(messages, username, (result) => {
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
   * @return {object} API response
   */
  searchUser: (req, res) => {
    const { searchTerm, offset, groupId } = req.body;
    if (validate.search(searchTerm, offset, groupId, res)) {
      user.searchUsers(searchTerm, offset, groupId, (result) => {
        if (typeof result === 'string') {
          errorResponseHandler(res, 500, 'Error Searching User');
        } else {
          return res.status(200).json({
            message: 'Search Result',
            users: result.rows,
            count: result.count
          });
        }
      });
    }
  },

  /**
   * mymessage controls the retrieval of messages sent by a user
   *
   * @param  {object} req request sent from frontend
   * @param  {object} res response from the server
   *
   * @return {object} API response
   */
  mymessage: (req, res) => {
    const userId = req.token.data.id;
    user.myMessages(userId, (result) => {
      if (typeof result === 'string') {
        errorResponseHandler(res, 500, 'Error retrieving message');
      } else {
        return res.status(200).json({
          message: 'Your Messages',
          messages: result
        });
      }
    });
  },
  /**
   * archivedMessages controls retrieval of seen messages
   *
   * @param  {object} req request sent from frontend
   * @param  {object} res response from the server
   *
   * @return {object} API response
   */
  archivedMessages: (req, res) => {
    const groupId = req.params.groupId;
    const username = req.token.data.username;
    user.archivedMessages(username, groupId, (result) => {
      if (typeof result === 'string') {
        errorResponseHandler(res, 500, 'Error retrieving message');
      } else {
        return res.status(200).json({
          message: 'Archived Messages',
          messages: result
        });
      }
    });
  },

  /**
   * forgetPassword controls the requesting for changing password
   *
   * @param {object} req request sent from frontend
   * @param {object} res response from the server
   *
   * @return {object} API response
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
   * @return {object} API response
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
   * @return {object} API response
   */
  googleAuth: (req, res) => {
    const { name, email, state } = req.body;
    const username = (email.split('@')[0]).replace(/[^a-zA-Z0-9]/g, '');
    const password = 'null';
    if (validate.googleDetails(name, email, username, res)) {
      if (state === 'Sign Up') {
        user.googleSignUp(name, email, username, state, password, (result) => {
          if (typeof result === 'string') {
            errorResponseHandler(res, 400, result);
          } else {
            return res.status(201).json({
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
              message: 'Sign In Successful',
              user: result
            });
          }
        });
      }
    }
  },
  clearNotifications: (req, res) => {
    user.clearNotifications(req.token.data.id, (result) => {
      if (result === 'Notification Cleared') {
        res.status(200).json({
          message: result
        });
      } else {
        errorResponseHandler(res, 500, 'Internal Error Clearing Notification');
      }
    });
  }

};

export default UserController;
