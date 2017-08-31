import jwt from 'jsonwebtoken';

import errorResponseHandler from '../helpers/errorresponsehandler';
/**
 * ensureToken verifies the validity of json web token
 * @method ensureToken
 *
 * @param  {object} req request sent from frontend
 * @param {object} res response from the server
 * @param {Function} next description
 *
 * @return {object} status response or adds a token to request object
 */
const ensureToken = (req, res, next) => {
  const token = req.body.token || req.params.token || req.headers.authorization;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        errorResponseHandler(res, 401, 'Invalid token.');
      } else {
        req.token = decoded;
        next();
      }
    });
  } else {
    errorResponseHandler(res, 401, 'Access Token Not Provided. Please Sign In');
  }
};

export default ensureToken;
