import User from '../helpers/User';
import errorResponseHandler from '../helpers/errorResponseHandler';

const user = new User();

/**
 * checkIfGroupCreator checks if a user is amember of a group
 * @method checkIfGroupCreator
 *
 * @param  {object} req request sent from frontend
 * @param {object} res response from the server
 * @param {Function} next description
 *
 * @return {object} status response or adds a token to request object
 */
const checkIfGroupCreator = (req, res, next) => {
  const userId = parseInt(req.token.data.id, 10);
  const groupId = parseInt(req.params.groupId, 10);
  if ((userId !== null && userId !== undefined) &&
  (groupId !== null && groupId !== undefined) &&
  (userId !== '' && groupId !== '')) {
    user.checkIfGroupCreator(userId, groupId, (result) => {
      if (result) {
        next();
      } else {
        errorResponseHandler(res, 403, 'You are not the creator of this group');
      }
    });
  } else {
    errorResponseHandler(res, 400, 'Invalid Data supplied');
  }
};

export default checkIfGroupCreator;
