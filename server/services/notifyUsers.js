import sendText from './sendText';
import sendMail from './sendMail';

/**
 * notifyUser notifies group users of new message via mail or text
 * @method notifyUser
 *
 * @param {string} priority level of message importance
 * @param {array} users group members
 *
 * @return {string} response
 */
const notifyUsers = (priority, users) => {
  const userIds = [];
  const emails = [];
  const phoneNumbers = [];
  users.forEach((user) => {
    userIds.push(user.id);
    emails.push(user.email);
    phoneNumbers.push(user.phone);
  });
  if (priority === 'Critical') {
    const result = {};
    emails.forEach((email) => {
      const mailOptions = {
        from: '"PostIt APP 👻" <emmanuel.alabi@andela.com>',
        to: email,
        subject: 'New Message Notification',
        text: 'Howdy, You have a new message in Post It App.',
        html: `<div style="color: purple;">
                Howdy, You have a new message in Post It App.
                <button style="padding: 5px">
                <a href="https://postaa.herokuapp.com">
                Click Here To Access it 👻</a>
                </button>
              </div>`
      };
      sendMail(mailOptions);
      result.email = 'sent';
    });
    phoneNumbers.forEach((phone) => {
      const payload = {
        to: phone,
        from: 'Post App',
        message: 'Howdy, You have a new Message in Post It App.'
      };
      sendText(payload, () => {
      });
      result.phone = 'sent';
    });
    return result;
  } else {
    const result = {};
    emails.forEach((email) => {
      const mailOptions = {
        from: '"PostIt APP 👻" <emmanuel.alabi@andela.com>',
        to: email,
        subject: 'New Message Notification',
        text: 'Howdy, You have a new message in Post It App.',
        html: `<div style="color: purple;">
                Howdy, You have a new message in Post It App.
                <button style="padding: 5px">
                <a href="https://postaa.herokuapp.com">
                Click Here To Access it 👻</a>
                </button>
              </div>`
      };
      sendMail(mailOptions);
    });
    result.email = 'sent';
    return result;
  }
};

export default notifyUsers;
