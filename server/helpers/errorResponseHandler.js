/**
 * errorResponseHandler generates error response for the endpoint
 * @method errorResponseHandler
 *
 * @param  {object} res response sent back to the user
 * @param  {string} status the HTTP status code
 * @param  {string} message response message
 *
 * @return {object} response object
 */
const errorResponseHandler = (res, status, message) => (
    res.status(status).json({
      message
    })
  );

export default errorResponseHandler;
