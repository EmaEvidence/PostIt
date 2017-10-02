import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

dotenv.config();

/**
 * sendMailer sends email messages to user
 * @method sendMailer
 *
 * @param  {object} mailOptions user data and message details
 * @param  {function} done returns the result of the action asynchronously
 *
 * @return {string} success report
 */
const sendMail = (mailOptions, done) => {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_HOST_PORT,
    secure: true,
    auth: {
      user: process.env.EMAIL_HOST_USER,
      pass: process.env.EMAIL_PASSWORD
    }
  });
  return transporter.sendMail(mailOptions)
    .then(() => done('Mail Sent'))
    .catch(() => done('Mail Not Sent'));
};

export default sendMail;
