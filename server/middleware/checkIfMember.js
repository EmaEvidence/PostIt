import User from '../helpers/User';
import errorResponseHandler from '../helpers/errorresponsehandler';

const user = new User();

/**
 * checkIfMember checks if a user is amember of a group
 * @method checkIfMember
 *
 * @param  {object} req request sent from frontend
 * @param {object} res response from the server
 * @param {Function} next description
 *
 *  @return {object} status response or adds a token to request object
 */
const checkIfMember = (req, res, next) => {
  const userId = req.token.data.id;
  const groupId = req.params.groupId;
  if ((userId !== null && userId !== undefined) &&
  (groupId !== null && groupId !== undefined)) {
    user.checkIfMember(userId, groupId, (result) => {
      if (result) {
        next();
      } else {
        errorResponseHandler(res, 403, 'You are not a member of this group');
      }
    });
  } else {
    errorResponseHandler(res, 400, 'Invalid Data supplied');
  }
};

export default checkIfMember;
