import express from 'express';
import bodyParser from 'body-parser';
import validator from 'express-validator';
import signupControler from '../controlers/signupControler';
import signinControler from '../controlers/signinControler';
import createGroupControler from '../controlers/createGroupControler';
import addUserControler from '../controlers/addUserControler';
import getGroupUsersControler from '../controlers/getGroupUsersControler';
import postMessageControler from '../controlers/postMessageControler';
import getGroupMessagesControler from '../controlers/getGroupMessagesControler';
import deleteUserControler from '../controlers/deleteUserControler';

const Router = express.Router();
Router.use(bodyParser.json());
Router.use(bodyParser.urlencoded({ extended: true }));
Router.use(validator());


/**
 * signup router for registring new user
 *
 * @param  {form data} typeof result !== 'object' User data
 * @return {JSON}                            User object
 */
Router.post('/api/user/signup', signupControler);

/**
 * [Sign in router for authenticating a user]
 * @type {[type]}
 */
Router.post('/api/user/signin', signinControler);

/**
 * Group router for creating a new group
 * @type {[JSON]}
 */
Router.post('/api/group', createGroupControler);

/**
 * For adding a User to a created group
 * @type {[JSON]}
 */
Router.post('/api/group/:groupid/user', addUserControler);

/**
 * For getting every member of an existing group
 * @type {[JSON]}
 */
Router.get('/api/group/:groupid/user', getGroupUsersControler);

/**
 * For Posting messages to a group.
 * @type {[JSON]}
 */
Router.post('/api/group/:groupid/message', postMessageControler);

/**
 * For getting messages posted to a group
 * @type {[type]}
 */
Router.get('/api/group/:groupid/messages', getGroupMessagesControler);

/**
 * [For deleting Users]
 * @type {[JSON]}
 */
Router.post('/api/delete', deleteUserControler);

export default Router;
