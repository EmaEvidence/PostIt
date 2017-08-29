import express from 'express';
import bodyParser from 'body-parser';
import validator from 'express-validator';
import controler from '../controlers/controler';

const Router = express.Router();
Router.use(bodyParser.json());
Router.use(bodyParser.urlencoded({ extended: true }));
Router.use(validator());

/**
 * for getting every registered user
 */
Router.get('/api/v1/user/all', controler.getAllUsersControler);
/**
 * signup router for registring new user
 *
 * @param  {form data} typeof result !== 'object' User data
 * @return {JSON}                            User object
 */
Router.post('/api/v1/user/signup', controler.signupControler);

/**
 * [Sign in router for authenticating a user]
 * @type {[void]}
 */
Router.post('/api/v1/user/signin', controler.signinControler);

/**
 * Group router for creating a new group
 * @type {[void]}
 */
Router.post('/api/v1/group', controler.ensureToken, controler.createGroupControler);

/**
 * For adding a User to a created group
 * @type {[void]}
 */
Router.post('/api/v1/group/:groupid/user', controler.ensureToken, controler.addUserControler);

/**
 * For getting every member of an existing group
 * @type {[void]}
 */
Router.get('/api/v1/group/:groupid/users', controler.ensureToken, controler.getGroupUsersControler);

/**
 * For Posting messages to a group.
 * @type {[void]}
 */
Router.post('/api/v1/group/:groupid/message', controler.ensureToken, controler.postMessageControler);

/**
 * For getting messages posted to a group
 * @type {[void]}
 */
Router.get('/api/v1/group/:groupid/messages', controler.ensureToken, controler.getGroupMessagesControler);

/**
 * [For deleting Users]
 * @type {[void]}
 */
// reewrite this api like api/user/delete
Router.post('/api/v1/users/delete', controler.ensureToken, controler.deleteUserControler);

/**
 * [For Groups a Users belongs to]
 * @type {[void]}
 */
Router.get('/api/v1/user/groups', controler.ensureToken, controler.getUserGroupsControler);

/**
 * for marking messages as seen
 */
Router.post('/api/v1/user/message/read', controler.ensureToken, controler.messageReadControler);

/**
 * for search for users
 */
Router.post('/api/v1/users/search', controler.ensureToken, controler.searchUserControler);

/**
 * for google+ signup
 */
Router.post('/api/v1/user/google', controler.googleAuthControler);

/**
 * for requesting for a new password
 */
Router.post('/api/v1/user/forgetpassword', controler.forgetPasswordControler);

/**
 * for setting a new password
 */
Router.post('/api/v1/user/newpassword', controler.newPasswordControler);

/**
 * for getting all messages a user posted
 */
Router.get('/api/v1/user/messages', controler.ensureToken, controler.mymessageControler);

/**
 * for retrieving archived messages
 */
Router.get('/api/v1/user/messages/archived', controler.ensureToken, controler.archivedMessagesControler);


export default Router;
