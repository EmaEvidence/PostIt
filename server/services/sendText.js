import dotenv from 'dotenv';
import jusibe from 'jusibe';

dotenv.config();
/**
 * sendText sends text messages to users
 * @method sendText
 *
 * @param  {object} payload the user date and message body
 * @param  {function} done returns the result of the action asynchronously
 *
 * @return {string} success report
 */
const sendText = (payload, done) => {
  const Jusibe = new jusibe(process.env.PUBLIC_KEY, process.env.ACCESS_TOKEN);
  Jusibe.sendSMS(payload)
  .then(() => {
    done('Message Notification Sent');
  })
  .catch(() => {
    done('Error Sending Message Notification');
  });
};

export default sendText;
