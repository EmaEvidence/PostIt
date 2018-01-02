import express from 'express';
import bodyParser from 'body-parser';
import validator from 'express-validator';

import * as groupController from '../controllers/groupController';
import ensureToken from '../middleware/ensureToken';
import checkIfMember from '../middleware/checkIfMember';
import checkIfGroupCreator from '../middleware/checkIfGroupCreator';

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

/**
 * For editting group name
 */
groupRouter.put('/api/v1/group/edit/:groupId', ensureToken,
checkIfGroupCreator, groupController.editGroupName);

/**
 * For deleting a group
 */
groupRouter.delete('/api/v1/group/:groupId', ensureToken,
checkIfGroupCreator, groupController.deleteGroup);

export default groupRouter;
