import express from 'express';
import bodyParser from 'body-parser';

import ensureToken from '../middleware/ensuretoken';
import controller from '../controllers/controller';

const userRouter = express.Router();
userRouter.use(bodyParser.json());
userRouter.use(bodyParser.urlencoded({ extended: true }));

/**
 * for getting every registered user
 */
userRouter.get('/api/v1/user/all', controller.getAllUsers);

/**
 * for signing up a new user
 */
userRouter.post('/api/v1/user/signup', controller.signUp);

/**
 * [Sign in router for authenticating a user]
 */
userRouter.post('/api/v1/user/signin', controller.signIn);

/**
 * [For deleting Users]
 */
userRouter.post('/api/v1/users/delete', ensureToken, controller.deleteUser);

/**
 * for marking messages as seen
 */
userRouter.post('/api/v1/user/message/read', ensureToken, controller.messageRead);

/**
 * for search for users
 */
userRouter.post('/api/v1/users/search', ensureToken, controller.searchUser);

/**
 * for google+ signup
 */
userRouter.post('/api/v1/user/google', controller.googleAuth);

/**
 * for requesting for a new password
 */
userRouter.post('/api/v1/user/forgetpassword', controller.forgotPassword);

/**
 * for setting a new password
 */
userRouter.post('/api/v1/user/newpassword', controller.newPassword);

/**
 * for getting all messages a user posted
 */
userRouter.get('/api/v1/user/messages', ensureToken, controller.mymessage);

/**
 * for retrieving archived messages
 */
userRouter.get('/api/v1/user/messages/archived', ensureToken, controller.archivedMessages);

/**
 * For Groups a Users belongs to
 */
userRouter.get('/api/v1/user/groups', ensureToken, controller.getUserGroups);


export default userRouter;
