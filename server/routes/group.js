import express from 'express';
import bodyParser from 'body-parser';
import validator from 'express-validator';

import controller from '../controllers/controller';
import ensureToken from '../middleware/ensuretoken';

const groupRouter = express.Router();
groupRouter.use(bodyParser.json());
groupRouter.use(bodyParser.urlencoded({ extended: true }));
groupRouter.use(validator());

groupRouter.post('/api/v1/group', ensureToken, controller.createGroup);

/**
 * For adding a User to a created group
 */
groupRouter.post('/api/v1/group/:groupId/user', ensureToken, controller.addUser);

/**
 * For getting every member of an existing group
 */
groupRouter.get('/api/v1/group/:groupId/users', ensureToken, controller.getGroupUsers);

/**
 * For Posting messages to a group.
 */
groupRouter.post('/api/v1/group/:groupId/message', ensureToken, controller.postMessage);

/**
 * For getting messages posted to a group
 */
groupRouter.get('/api/v1/group/:groupId/messages', ensureToken, controller.getGroupMessages);

export default groupRouter;
