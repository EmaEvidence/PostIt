import express from 'express';
import bodyParser from 'body-parser';
import validator from 'express-validator';

import * as groupController from '../controllers/groupController';
import ensureToken from '../middleware/ensureToken';
import checkIfMember from '../middleware/checkIfMember';

const groupRouter = express.Router();
groupRouter.use(bodyParser.json());
groupRouter.use(bodyParser.urlencoded({ extended: true }));
groupRouter.use(validator());

groupRouter.post('/api/v1/group', ensureToken, groupController.createGroup);

/**
 * For adding a User to a created group
 */
groupRouter.post('/api/v1/group/:groupId/user', ensureToken,
checkIfMember, groupController.addUser);

/**
 * For getting every member of an existing group
 */
groupRouter.get('/api/v1/group/:groupId/users', ensureToken,
checkIfMember, groupController.getGroupUsers);

/**
 * For Posting messages to a group.
 */
groupRouter.post('/api/v1/group/:groupId/message', ensureToken,
checkIfMember, groupController.postMessage);

/**
 * For getting messages posted to a group
 */
groupRouter.get('/api/v1/group/:groupId/messages', ensureToken,
checkIfMember, groupController.getGroupMessages);

export default groupRouter;
