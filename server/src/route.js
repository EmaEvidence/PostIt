import express from 'express';
import bodyParser from 'body-parser';
import validator from 'express-validator';
import controler from '../controlers/controler';

const Router = express.Router();
Router.use(bodyParser.json());
Router.use(bodyParser.urlencoded({ extended: true }));
Router.use(validator());


Router.get('/', (req, res) => {
  res.status(200).send('Post It API running');
});

Router.get('/api/user/all', controler.getAllUsersControler);
/**
 * signup router for registring new user
 *
 * @param  {form data} typeof result !== 'object' User data
 * @return {JSON}                            User object
 */
Router.post('/api/user/signup', controler.signupControler);

/**
 * [Sign in router for authenticating a user]
 * @type {[type]}
 */
Router.post('/api/user/signin', controler.signinControler);

/**
 * Group router for creating a new group
 * @type {[JSON]}
 */
Router.post('/api/group', controler.ensureToken, controler.createGroupControler);

/**
 * For adding a User to a created group
 * @type {[JSON]}
 */
Router.post('/api/group/:groupid/user', controler.ensureToken, controler.addUserControler);

/**
 * For getting every member of an existing group
 * @type {[JSON]}
 */
Router.get('/api/group/:groupid/users', controler.ensureToken, controler.getGroupUsersControler);

/**
 * For Posting messages to a group.
 * @type {[JSON]}
 */
Router.post('/api/group/:groupid/message', controler.ensureToken, controler.postMessageControler);

/**
 * For getting messages posted to a group
 * @type {[type]}
 */
Router.get('/api/group/:groupid/messages', controler.ensureToken, controler.getGroupMessagesControler);

/**
 * [For deleting Users]
 * @type {[JSON]}
 */
Router.post('/api/delete', controler.ensureToken, controler.deleteUserControler);

/**
 * [For deleting Users]
 * @type {[JSON]}
 */
Router.get('/api/user/groups', controler.ensureToken, controler.getUserGroupsControler);

Router.get('*', (req, res) => {
  res.status(404).send('Page Not Found');
});

Router.post('*', (req, res) => {
  res.status(404).send('Page Not Found');
});

export default Router;
