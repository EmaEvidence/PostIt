import User from '../helpers/User';
import errorResponseHandler from '../helpers/errorResponseHandler';
import * as validate from '../helpers/validate';

const user = new User();

/**
 * deleteUser controls the removal of an existing user
 * @method deleteUser
 *
 * @param {object} req request sent from frontend
 * @param {object} res response from the server
 *
 * @return {object} API response
 */
export const deleteUser = (req, res) => {
  const userId = req.body.user || req.token.data.email;
  user.deleteUsers(userId, (result) => {
    if (result === 1) {
      res.status(200).json({
        message: 'Deleted'
      });
    } else if (result === 0) {
      errorResponseHandler(res, 404, 'User not Found');
    } else if (result === 'Internal Server Error') {
      errorResponseHandler(res, 500, 'Internal Server Error');
    } else {
      errorResponseHandler(res, 400, 'Invalid Data');
    }
  });
};

/**
 * getUserGroups controls retrieval of every group a user belongs to
 * @method getUserGroups
 *
 * @param {object} req request sent from frontend
 * @param {object} res response from the server
 *
 * @return {object} API response
 */
export const getUserGroups = (req, res) => {
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
};

/**
 * signIn controls authorization of an existing user
 * @method signIn
 *
 * @param  {object} req request sent from frontend
 * @param  {object} res response from the server
 *
 * @return {object} API response
 */
export const signIn = (req, res) => {
  const { username, password } = req.body;
  if (validate.signIn(username, password, res)) {
    user.logIn(username, password, (result) => {
      if (result === 'Failed, User not found') {
        errorResponseHandler(res, 404, result);
      } else if (result === 'Internal Error') {
        errorResponseHandler(res, 500, result);
      } else {
        res.status(200).json({
          user: result.user,
          token: result.token,
          message: 'Sign In Successful'
        });
      }
    });
  }
};

/**
 * signup controls registration of a new user
 * @method signUp
 *
 * @param {object} req request sent from frontend
 * @param {object} res response from the server
 *
 * @return {object} API response
 */
export const signUp = (req, res) => {
  const { name, username, email, password, phone } = req.body;
  user.signUp(name, username, email, password, phone, (result) => {
    if (result === 'Internal Server Error') {
      errorResponseHandler(res, 500, result);
    } else if (typeof result !== 'object') {
      if (result === 'username must be unique' ||
          result === 'email must be unique' ||
        result === 'phone must be unique') {
        errorResponseHandler(res, 409, result);
      } else {
        errorResponseHandler(res, 400, result);
      }
    } else {
      res.status(201).json({
        user: result.user,
        token: result.token,
        message: 'Registration Successful'
      });
    }
  });
};

/**
 * getAllUsers retrieves every user in the App
 * @method getAllUsers
 *
 * @param  {object} req request sent from frontend
 * @param  {object} res response from the server
 *
 * @return {object} API response
 */
export const getAllUsers = (req, res) => {
  user.getAllUsers((result) => {
    if (typeof result === 'string') {
      errorResponseHandler(res, 500, 'Error Fetching users');
    } else if (result.length === 0) {
      errorResponseHandler(res, 404, 'No User found');
    } else {
      res.status(200).json({
        users: result
      });
    }
  });
};

/**
 * messageRead controls the group of messages as seen
 * @method messageRead
 *
 * @param  {object} req request sent from frontend
 * @param  {object} res response from the server
 *
 * @return {object} API response
 */
export const messageRead = (req, res) => {
  const messages = req.body.messages;
  const username = req.token.data.username;
  if (messages === '' || messages === undefined) {
    errorResponseHandler(res, 400, 'No message Specified');
  } else {
    user.seenMessages(messages, username, (result) => {
      if (result === 'Message Read') {
        return res.status(200).json({
          messageRead: result,
          message: 'Message Read'
        });
      }
      errorResponseHandler(res, 500, 'Error Reading Message');
    });
  }
};

/**
 * searchUser controls searching for user
 * @method searchUser
 *
 * @param  {object} req request sent from frontend
 * @param  {object} res response from the server
 *
 * @return {object} API response
 */
export const searchUser = (req, res) => {
  const { searchTerm, offset, groupId } = req.body;
  if (validate.search(searchTerm, offset, groupId, res)) {
    user.searchUsers(searchTerm, offset, groupId, (result) => {
      if (typeof result === 'string') {
        errorResponseHandler(res, 500, 'Error Searching User');
      } else if (result.length === 0) {
        errorResponseHandler(res, 404, 'No user found');
      } else {
        return res.status(200).json({
          message: 'Search Result',
          users: result.rows,
          count: result.count
        });
      }
    });
  }
};

/**
 * getUserMessages controls the retrieval of messages sent by a user
 * @method getMyMessages
 *
 * @param  {object} req request sent from frontend
 * @param  {object} res response from the server
 *
 * @return {object} API response
 */
export const getUserMessages = (req, res) => {
  const userId = req.token.data.id;
  user.getUserMessages(userId, (result) => {
    if (typeof result === 'string') {
      errorResponseHandler(res, 500, 'Error retrieving message');
    } else if (result.length === 0) {
      errorResponseHandler(res, 404, 'No message found');
    } else {
      return res.status(200).json({
        message: 'Your Messages',
        messages: result
      });
    }
  });
};

/**
 * getArchivedMessages controls retrieval of seen messages
 * @method getArchivedMessages
 *
 * @param  {object} req request sent from frontend
 * @param  {object} res response from the server
 *
 * @return {object} API response
 */
export const getArchivedMessages = (req, res) => {
  const groupId = req.params.groupId;
  const username = req.token.data.username;
  if (isNaN(groupId)) {
    errorResponseHandler(res, 400, 'Invalid Group');
  } else {
    user.archivedMessages(username, groupId, (result) => {
      if (typeof result === 'string') {
        errorResponseHandler(res, 500, 'Error retrieving message');
      } else if (result.length === 0) {
        errorResponseHandler(res, 404, 'No message found');
      } else {
        return res.status(200).json({
          message: 'Archived Messages',
          messages: result
        });
      }
    });
  }
};

/**
 * forgotPassword controls the requesting for changing password
 * @method forgotPassword
 *
 * @param {object} req request sent from frontend
 * @param {object} res response from the server
 *
 * @return {object} API response
 */
export const forgotPassword = (req, res) => {
  const email = req.body.email;
  if (email !== '' && email !== undefined) {
    user.sendPasswordResetMail(email, (result) => {
      if (result === 'Email Address Not found') {
        errorResponseHandler(res, 404, 'Email Address Not found');
      } else if (result === 'Error Sending Mail') {
        errorResponseHandler(res, 500, 'Error Sending Mail');
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
};

/**
 * newPassword controls resetting of password
 * @method newPassword
 *
 * @param  {object} req request sent from frontend
 * @param  {object} res response from the server
 *
 * @return {object} API response
 */
export const resetPassword = (req, res) => {
  const { userKey, newPassword } = req.body;
  if ((newPassword !== '' &&
  newPassword !== undefined) &&
  (userKey !== '' && userKey !== undefined)) {
    user.resetPassword(newPassword, userKey, (result) => {
      if (result === 'Password Updated') {
        res.status(200).json({
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
};

/**
 * googleAuth controls authorization with google+
 * @method googleAuth
 *
 * @param  {object} req request sent from frontend
 * @param  {object} res response from the server
 *
 * @return {object} API response
 */
export const googleAuth = (req, res) => {
  const { name, email, type } = req.body;
  const username = (email.split('@')[0]).replace(/[^a-zA-Z0-9]/g, '');
  if (validate.googleDetails(name, email, username, res)) {
    user.googleSignIn(name, email, username, type, (result) => {
      if (typeof result === 'string') {
        const userError = 'Already a user, Please sign in with your password';
        if (result === 'Please Sign Up First') {
          user.googleSignUp(name, email, username, type, (signUpResult) => {
            if (typeof signUpResult === 'string') {
              errorResponseHandler(res, 500, signUpResult);
            } else {
              return res.status(201).json({
                message: 'Sign Up Successful',
                user: signUpResult.user,
                token: signUpResult.token
              });
            }
          });
        } else if (result === userError) {
          errorResponseHandler(res, 409, result);
        } else {
          errorResponseHandler(res, 500, result);
        }
      } else {
        return res.status(200).json({
          message: 'Sign In Successful',
          user: result.user,
          token: result.token
        });
      }
    });
  }
};
