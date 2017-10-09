import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

/**
 * createToken generates a json web token
 * @method createToken
 *
 * @param  {object} payload user data
 *
 * @return {string} json web token
 */
const createToken = (payload) => {
  const createdToken = jwt.sign({
    exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24),
    data: payload
  }, process.env.JWT_SECRET);
  return createdToken;
};

export default createToken;
