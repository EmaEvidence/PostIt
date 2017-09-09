import user from '../helpers/user';
import errorResponseHandler from '../helpers/errorresponsehandler';

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
  const groupId = req.params.group;
  if ((userId !== null && userId !== undefined) &&
  (groupId !== null && groupId !== undefined)) {
    user.checkIfMember(userId, groupId, (result) => {
      if (result) {
        next();
      } else {
        errorResponseHandler(res, 403, 'You are not allowed here');
      }
    });
  } else {
    errorResponseHandler(res, 400, 'Invalid Data supplied');
  }
};

export default checkIfMember;
