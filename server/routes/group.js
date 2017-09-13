import express from 'express';
import bodyParser from 'body-parser';
import validator from 'express-validator';

import * as group from '../controllers/group';
import ensureToken from '../middleware/ensuretoken';
import checkIfMember from '../middleware/checkIfMember';

const groupRouter = express.Router();
groupRouter.use(bodyParser.json());
groupRouter.use(bodyParser.urlencoded({ extended: true }));
groupRouter.use(validator());

groupRouter.post('/api/v1/group', ensureToken, group.createGroup);

/**
 * For adding a User to a created group
 */
groupRouter.post('/api/v1/group/:groupId/user', ensureToken, checkIfMember, group.addUser);

/**
 * For getting every member of an existing group
 */
groupRouter.get('/api/v1/group/:groupId/users', ensureToken, checkIfMember, group.getGroupUsers);

/**
 * For Posting messages to a group.
 */
groupRouter.post('/api/v1/group/:groupId/message', ensureToken, checkIfMember, group.postMessage);

/**
 * For getting messages posted to a group
 */
groupRouter.get('/api/v1/group/:groupId/messages', ensureToken, checkIfMember, group.getGroupMessages);

export default groupRouter;
