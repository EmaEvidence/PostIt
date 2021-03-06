import express from 'express';
import bodyParser from 'body-parser';

import ensureToken from '../middleware/ensureToken';
import * as userController from '../controllers/userController';

const userRouter = express.Router();
userRouter.use(bodyParser.json());
userRouter.use(bodyParser.urlencoded({ extended: true }));

/**
 * for getting every registered user
 */
userRouter.get('/api/v1/user/all', userController.getAllUsers);

/**
 * for signing up a new user
 */
userRouter.post('/api/v1/user/signup', userController.signUp);

/**
 * [Sign in router for authenticating a user]
 */
userRouter.post('/api/v1/user/signin', userController.signIn);

/**
 * [For deleting Users]
 */
userRouter.post('/api/v1/users/delete', ensureToken,
userController.deleteUser);

/**
 * for marking messages as seen
 */
userRouter.post('/api/v1/user/message/read', ensureToken,
userController.messageRead);

/**
 * for verifying json web token
 */
userRouter.post('/api/v1/user/verify', ensureToken);

/**
 * for search for users
 */
userRouter.post('/api/v1/users/search', ensureToken,
userController.searchUser);

/**
 * for google+ signup
 */
userRouter.post('/api/v1/user/google', userController.googleAuth);

/**
 * for requesting for a new password
 */
userRouter.post('/api/v1/user/forgotpassword', userController.forgotPassword);

/**
 * for setting a new password
 */
userRouter.post('/api/v1/user/newpassword', userController.resetPassword);

/**
 * for getting all messages a user posted
 */
userRouter.get('/api/v1/user/messages', ensureToken,
userController.getUserMessages);

/**
 * for retrieving archived messages
 */
userRouter.get('/api/v1/user/:groupId/messages/archived',
ensureToken, userController.getArchivedMessages);

/**
 * For Groups a Users belongs to
 */
userRouter.get('/api/v1/user/groups', ensureToken,
userController.getUserGroups);


export default userRouter;
