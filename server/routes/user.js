import express from 'express';
import bodyParser from 'body-parser';

import ensureToken from '../middleware/ensuretoken';
import * as user from '../controllers/user';
import checkIfMember from '../middleware/checkIfMember';

const userRouter = express.Router();
userRouter.use(bodyParser.json());
userRouter.use(bodyParser.urlencoded({ extended: true }));

/**
 * for getting every registered user
 */
userRouter.get('/api/v1/user/all', user.getAllUsers);

/**
 * for signing up a new user
 */
userRouter.post('/api/v1/user/signup', user.signUp);

/**
 * [Sign in router for authenticating a user]
 */
userRouter.post('/api/v1/user/signin', user.signIn);

/**
 * [For deleting Users]
 */
userRouter.post('/api/v1/users/delete', ensureToken, user.deleteUser);

/**
 * for marking messages as seen
 */
userRouter.post('/api/v1/user/message/read', ensureToken, user.messageRead);

/**
 * for search for users
 */
userRouter.post('/api/v1/users/search', ensureToken, user.searchUser);

/**
 * for google+ signup
 */
userRouter.post('/api/v1/user/google', user.googleAuth);

/**
 * for requesting for a new password
 */
userRouter.post('/api/v1/user/forgotpassword', user.forgotPassword);

/**
 * for setting a new password
 */
userRouter.post('/api/v1/user/newpassword', user.resetPassword);

/**
 * for getting all messages a user posted
 */
userRouter.get('/api/v1/user/messages', ensureToken, user.mymessage);

/**
 * for retrieving archived messages
 */
userRouter.get('/api/v1/user/:groupId/messages/archived', ensureToken, user.archivedMessages);

/**
 * For Groups a Users belongs to
 */
userRouter.get('/api/v1/user/groups', ensureToken, user.getUserGroups);

/**
 * For Groups a Users belongs to
 */
userRouter.get('/api/v1/user/notifications', ensureToken, checkIfMember, user.clearNotifications);


export default userRouter;
