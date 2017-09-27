import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import jusibe from 'jusibe';
import database from '../models/connection';

dotenv.config();
/**
 * the user class that creates a user
 */
class User {
/**
 * constructor - creates models for the class and initiates Connection to the
 * database whenever the class is called.
 *
 * @return {string} Connection status message
 */
  constructor() {
    this.database = database;
  }

  /**
   * validate checks the validity of the supplied Password and phone Number
   * @method validate
   *
   * @param  {string} userPassword user's Password
   * @param  {string} phone user's Password
   *
   * @return {string} result of validity test
   *
   */
  static validate(userPassword, phone) {
    let validity;
    if (/^(?=.*\d)(?=.*\W)(?=.*[a-zA-Z])(?!.*\s).{8,}$/.test(userPassword) && !isNaN(phone)) {
      validity = 'valid';
    } else {
      validity = 'Password Must Contain Alphabets, Numbers, Special Characters and Must be Longer than 8';
    }
    return validity;
  }
  /**
   * flattenUserId removes users from array of json objects to an array ofnumbers
   * @method flattenUserId
   *
   * @param  {array} arrayOfIds array of json user objects
   *
   * @return {array} array of user ids
   */
  static flattenUserId(arrayOfIds) {
    const ids = [];
    arrayOfIds.forEach((idObject) => {
      ids.push(idObject.id);
    });
    return ids;
  }

  /**
   * sendText sends text messages to users
   * @method sendText
   *
   * @param  {object} payload the user date and message body
   * @param  {function} done returns the result of the action asynchronously
   *
   * @return {string} success report
   */
  static sendText(payload, done) {
    const Jusibe = new jusibe(process.env.PUBLIC_KEY, process.env.ACCESS_TOKEN);
    Jusibe.sendSMS(payload)
    .then(() => {
      done('Message Notification Sent');
    })
    .catch(() => {
      done('Error Sending Message Notification');
    });
  }
  /**
   * sendMailer sends email messages to user
   * @method sendMailer
   *
   * @param  {object} mailOptions user data and message details
   * @param  {function} done returns the result of the action asynchronously
   *
   * @return {string} success report
   */
  static sendMail(mailOptions, done) {
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
  }

  /**
   * createToken generates a json web token
   * @method createToken
   *
   * @param  {object} payload user data
   *
   * @return {string} json web token
   */
  static createToken(payload) {
    const createdToken = jwt.sign({
      exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24),
      data: payload
    }, process.env.JWT_SECRET);
    return createdToken;
  }
  /**
   * inAppNotify sends an in app notification to members of a group when a new message is sent
   * @method inAppNotify
   *
   * @param  {array} users array of user ids
   * @param  {number} groupId id of the group the message was sent to
   * @param  {number} senderUsername id of the user sending the message
   * @param  {groupName} groupName name of the group
   * @param  {number} senderId id of the user sending the message
   * @param  {function} done returns the result of the action asynchronously
   *
   * @return {string} success report
   */
  inAppNotify(users, groupId, senderUsername, groupName, senderId, done) {
    if (typeof users !== 'object' && users.length <= 0) {
      done('No User to Notify');
    } else {
      users.forEach((user) => {
        const id = user.id;
        if (id !== senderId) {
          this.database.Notifications.create({
            groupId,
            groupName,
            type: 'A New Message',
            source: senderUsername,
            UserId: id,
            status: 'Not Seen'
          });
        }
      });
    }
  }

  /**
   * clearInAppNotitice removes notification onces the user sees it
   * @method clearInAppNotitice
   *
   * @param {number} userId id of the seen notification
   * @param {function} done returns the result of the action asynchronously
   *
   * @return {string} success report
   */
  clearNotifications(userId, done) {
    this.database.Notifications.destroy({
      where: {
        UserId: userId
      }
    })
    .then(() => {
      done('Notification Cleared');
    })
    .catch(() => {
      done('Error Clearing Notifications');
    });
  }
  /**
   * signUp - Creates a user from the data provided by saving it in the user database.
   * @method signUp
   *
   * @param {string} name Name of the User
   * @param {string} username userName of the user
   * @param {string} email Email address of the User
   * @param {string} password password of the user
   * @param {string} phone phone Number of the user
   * @param {FunctionDeclaration} done callback function
   *
   * @return {string} the result of the registration attempt.
   */
  signUp(name, username, email, password, phone, done) {
    const validity = User.validate(password, phone);
    if (validity === 'valid') {
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, (err, hash) => {
          this.database.Users.create({
            name,
            username,
            email,
            password: hash,
            phone
          }).then((user) => {
            const id = user.id;
            const token = User.createToken({ id, name, username, phone, email });
            done({ id, name, username, phone, email, token });
          }).catch((err) => {
            if (err.errors === undefined) {
              done(err.message);
            } else {
              if (err.errors && err.errors[0].message === '') {
                done(`${err.errors[0].path} must be defined`);
              } else {
                done(err.errors[0].message || 'Internal Sever Error');
              }
            }
          });
        });
      });
    } else {
      if (isNaN(phone)) {
        done('Wrong Phone Number');
      } else {
        done(validity);
      }
    }
  }


  /**
   * deleteUser - Deletes a registered User from the database
   * @method deleteUser
   *
   * @param  {string} email the email of the user to delete
   * @param  {function} done callback function that makes the result availale
   *
   * @return {oject} the result of the deletion
   */
  deleteUsers(email, done) {
    this.database.Users.destroy({
      where: {
        email
      }
    }).then((user) => {
      done(user);
    }).catch((err) => {
      done(err);
    });
  }

  /**
   * logIn - checks if the provided User/log In details is availale in the database
   * @method logIn
   *
   * @param  {string} username userName of the user
   * @param  {string} password password of the user
   * @param  {FunctionDeclaration} done callback function
   *
   * @return {string} the result of the registration attempt.
   */
  logIn(username, password, done) {
    this.database.Users.findAll({
      where: {
        username: {
          $iLike: `${username}`
        }
      },
      include: ['notifications']
    }).then((user) => {
      if (user.length === 0) {
        done('Failed, User not found');
      } else {
        const { id, name, email, notification, phone } = user[0];
        bcrypt.compare(password, user[0].password, (err, res) => {
          if (res) {
            const token = User.createToken({ id,
              name,
              username,
              email,
              phone });
            done({ id, name, username, email, notification, phone, token });
          } else {
            done('Failed, User not found');
          }
        });
      }
    }).catch(() => {
      done('Internal Error');
    });
  }

  /**
   * createGroup description
   * @method createGroup
   *
   * @param  {string} groupName name of the group to be created
   * @param  {number} creator id of the user creating it
   * @param  {array} users names of initial members of the groub
   * @param  {Function} done callback function
   *
   * @return {object} success or failure data
   */
  createGroup(groupName, creator, users, done) {
    let createdGroup;
    this.database.Users.findAll({
      attributes: ['id'],
      where: {
        username: users
      }
    }).then((user) => {
      const members = User.flattenUserId(user);
      if (members.length === 0 || members[0] === '') {
        members[0] = creator;
      } else {
        members.push(creator);
      }
      this.database.Groups.findOrCreate({
        where: {
          groupName,
          groupCreatorId: creator
        }
      }).then((group) => {
        if (group[1] === false) {
          done('Group Exists already');
        } else {
          createdGroup = group;
          members.forEach((member) => {
            this.database.GroupMembers.findOrCreate({
              where: {
                GroupId: group[0].id,
                UserId: member,
                addedBy: creator
              }
            });
          });
        }
      }).then(() => {
        const { id, createdBy, createdAt } = createdGroup[0];
        done({ id, groupName, createdBy, createdAt });
      }).catch((err) => {
        if (err.errors === undefined) {
          done(err.message);
        } else {
          if (err.errors && err.errors[0].message === '') {
            done(`${err.errors[0].path} can not be empty`);
          } else {
            done(err.errors[0].message || err.message);
          }
        }
      });
    })
      .catch(() => {
        done('Internal Server Error');
      });
  }


  /**
   * deleteGroup - removes a created group from the database
   * @method deleteGroup
   *
   * @param  {number} group id of group to delete
   * @param  {number} creator id of the creator
   * @param  {FunctionDeclaration} done callback function
   *
   * @return {object} success or failure data
   */
  deleteGroup(group, creator, done) {
    this.database.Groups.destroy({
      where: {
        groupName: group,
        groupCreatorId: creator
      }
    }).then((result) => {
      done(result);
    }).catch((err) => {
      done(err);
    });
  }
  /**
   * deleteGroupWithName removes a group using the name of the group
   * @method deleteGroupWithName
   *
   * @param {string} groupName name of the group
   * @param {Function} done callback function
   *
   * @return {object} success or failure data
   */
  deleteGroupWithName(groupName, done) {
    this.database.Groups.destroy({
      where: {
        groupName
      }
    }).then((result) => {
      done(result);
    }).catch((err) => {
      done(err);
    });
  }

  /**
   * addUsers - adds new user to a created group
   * @method addUsers
   *
   * @param  {number} group id of the group to add users to
   * @param  {number} userToAdd  id of user being added
   * @param  {number} userAdding id of user adding the new user
   * @param  {FunctionDeclaration} done callback function
   *
   * @return {string} result of the addition attempt.
   */
  addUsers(group, userToAdd, userAdding, done) {
    const groupToInt = parseInt(group, 10);
    const userToInt = parseInt(userToAdd, 10);
    if (groupToInt === '' || isNaN(groupToInt)) {
      done('Group Id must be stated');
    } else if (userToInt === '' || isNaN(userToInt)) {
      done('User Id must be stated');
    } else {
      this.database.GroupMembers.findOrCreate({
        where: {
          GroupId: group,
          UserId: userToAdd,
          addedBy: userAdding
        }
      }).then((result) => {
        if (result[1] === false) {
          done('User is already a member');
        } else {
          done(result);
        }
      }).catch((err) => {
        if (err.error === undefined) {
          done(err.message);
        } else {
          done(err.errors[0].message || err.message);
        }
      });
    }
  }


  /**
   * deleteUserFromGroup - removes a user from a group
   * @method deleteUsersFromGroup
   *
   * @param {number} group id of the group
   * @param {number} user id of the user
   * @param {number} added id of the user who added the user to be deleted
   * @param {FunctionDeclaration} done callback
   *
   * @return {object} result of the removal
   */
  deleteUserFromGroup(group, user, added, done) {
    this.database.GroupMembers.destroy({
      where: {
        GroupId: group,
        UserId: user,
        addedBy: added
      }
    }).then((result) => {
      done(result);
    }).catch((err) => {
      done(err);
    });
  }

  /**
   * postMessage - for posting messages to a group
   * @method postMessage
   *
   * @param  {number} to id of the group posted to
   * @param  {string} senderUsername the message being sent
   * @param  {number} senderId id of the user sending it
   * @param  {string} text the message being sent
   * @param  {number} priorityLevel Level of message priority
   * @param  {FunctionDeclaration} done callback function
   *
   * @return {string} result of the post attempt.
   */
  postMessage(to, senderUsername, senderId, text, priorityLevel, done) {
    this.database.Messages.create({
      groupId: to,
      message: text,
      senderId,
      senderUsername,
      priority: priorityLevel
    }).then((messageData) => {
      const { id, message, groupId, priority, createdAt } = messageData;
      this.database.Groups.findOne({
        attributes: ['id'],
        where: { id: to },
        include: ['Users']
      }).then((group) => {
        User.notifyUser(priorityLevel, group.Users);
        done({ id,
          message,
          groupId,
          priority,
          createdAt,
          senderId,
          senderUsername }, group.Users);
      }).catch(() => {
        done('Internal Error');
      });
    }).catch((err) => {
      done(err.name);
    });
  }
  /**
   * notifyUser description
   * @method notifyUser
   *
   * @param {type} priority description
   * @param {type} users description
   *
   * @return {type} description
   */
  static notifyUser(priority, users) {
    const ids = [];
    const emails = [];
    const phones = [];
    users.forEach((user) => {
      ids.push(user.id);
      emails.push(user.email);
      phones.push(user.phone);
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
        User.sendMail(mailOptions);
        result.email = 'sent';
      });
      phones.forEach((phone) => {
        const payload = {
          to: phone,
          from: 'Post App',
          message: 'Howdy, You have a new Message in Post It App.'
        };
        User.sendText(payload, () => {
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
        User.sendMail(mailOptions);
      });
      result.email = 'sent';
      return result;
    }
  }

  /**
   * retrieveMessage - gets messages for a group
   * @method retrieveMessage
   *
   * @param  {number} group the id of the group
   * @param  {number} username the id of the group
   * @param  {FunctionDeclaration} done callback function
   *
   * @return {string} result of the get attempt.
   */
  retrieveMessage(group, username, done) {
    this.database.Messages.findAll({
      where: {
        groupId: group,
      },
      order: [['id', 'DESC']]
    }).then((messages) => {
      done(messages);
    }).catch((err) => {
      done(err.name);
    });
  }
  /**
   * converts an array of id objects to an array of ids
   * @method flattenId
   *
   * @param  {array} arrayOfIds Array of JSON objects
   *
   * @return {array} Numeric array
   */
  static flattenId(arrayOfIds) {
    const ids = [];
    arrayOfIds.forEach((idObject) => {
      ids.push(idObject.UserId);
    });
    return ids;
  }

  /**
   * converts an array of id objects to an array of ids
   * @method flattenId
   *
   * @param {array} arrayOfIds Array of JSON objects
   *
   * @return {array} Numeric array
   */
  static flattenGroupId(arrayOfIds) {
    const ids = [];
    arrayOfIds.forEach((idObject) => {
      ids.push(idObject.GroupId);
    });
    return ids;
  }

/**
 * getGroupMembers description
 * @method getGroupMembers
 *
 * @param  {type} group description
 * @param  {Function} done description
 *
 * @return {type} description
 */
  getGroupMembers(group, done) {
    this.database.Groups.findOne({
      attributes: ['id'],
      where: { id: group },
      include: ['Users']
    }).then((users) => {
      done(users.Users);
    }).catch(() => {
      done('Internal Error');
    });
  }

  /**
   * getUserGroups retrieves users for a group
   * @method getUserGroups
   *
   * @param  {number} userId the id of the user whose groups is being querried
   * @param  {Function} done callback function
   *
   * @return {json} json object that can be the groups or the error message
   */
  getUserGroups(userId, done) {
    this.database.GroupMembers.findAll({
      where: { UserId: userId },
      attributes: ['GroupId']
    }).then((groups) => {
      const ids = User.flattenGroupId(groups);
      this.database.Groups.findAll({
        attributes: ['id', 'groupName', 'groupCreatorId'],
        where: { id: ids },
        order: [['createdAt', 'DESC']],
        include: ['Users']
      }).then((userGroup) => {
        done(userGroup);
      }).catch((err) => {
        done(err.name);
      });
    }).catch((err) => {
      done(err.name);
    });
  }

/**
 * getAllUsers retrieves every user from the database
 * @method getAllUsers
 *
 * @param  {FunctionDeclaration}  done callback
 *
 * @return {object} success or failure data
 */
  getAllUsers(done) {
    this.database.Users.findAll({
      attributes: ['id', 'username']
    }).then((users) => {
      done(users);
    }).catch((err) => {
      done(err.name || 'Internal Server Error');
    });
  }

/**
 * seenMessages marks Messages as seen
 * @method seenMessages
 *
 * @param {number} messages id of the message
 * @param {number} username unique name of the user seeing it
 * @param {FunctionDeclaration} done callback
 *
 * @return {object} success or failure data
 */
  seenMessages(messages, username, done) {
    const idOfMessages = [];
    messages.forEach((message) => {
      idOfMessages.push(message.id);
    });
    this.database.Messages.findAll({
      attributes: ['id', 'views'],
      where: { id: idOfMessages }
    }).then((messageViews) => {
      messageViews.forEach((messageView) => {
        const updatedViews = [];
        if (messageView.views === null || messageView.views === '') {
          updatedViews.push(username);
          this.database.Messages.update({ views: updatedViews },
            {
              where: {
                id: messageView.id
              }
            });
        } else if ((messageView.views).indexOf(username) < 0) {
          messageView.views.push(username);
          this.database.Messages.update({ views: messageView.views },
            {
              where: {
                id: messageView.id
              }
            });
        }
      });
      done('Message Read');
    }).catch(() => {
      done('Error Reading Message');
    });
  }
/**
 * searchUsers searches the database for every occurence of the supplied term
 * @method searchUsers
 *
 * @param  {string} searchTerm term to be looked for
 * @param {number} offset number of record to skip
 * @param {number} groupId id of the group from where the search is made
 * @param {FunctionDeclaration} done callback
 *
 * @return {object} success or failure data
 */
  searchUsers(searchTerm, offset, groupId, done) {
    const processedTerm = `%${searchTerm}%`;
    this.database.Users.findAndCountAll({
      attributes: ['id', 'email', 'username'],
      where: {
        username: {
          $iLike: `${processedTerm}`
        }
      },
      offset,
      limit: 5
    })
    .then((result) => {
      done(result);
    }).catch((err) => {
      done(err.name || 'Internal Server Error');
    });
  }
  /**
   * myMessages retrieves messages sent by a user from the database
   * @method myMessages
   *
   * @param {number} userId id of the user
   * @param {FunctionDeclaration} done callback
   *
   * @return {object} success or failure data
   */
  myMessages(userId, done) {
    this.database.Messages.findAll({
      where: {
        senderId: userId
      }
    }).then((result) => {
      done(result);
    }).catch((err) => {
      done(err.name || 'Internal Server Error');
    });
  }
  /**
   * archivedMessages retrieves seen messages from the database
   * @method archivedMessages
   *
   * @param {string} username unique name of the user seeing it
   * @param {number} groupId id of the group seeing it
   * @param {FunctionDeclaration} done callback
   *
   * @return {object} success or failure data
   */
  archivedMessages(username, groupId, done) {
    this.database.Messages.findAll({
      where: {
        groupId,
        views: { $contains: [username] }
      }
    }).then((messages) => {
      done(messages);
    }).catch((err) => {
      done(err.name || 'Internal Server Error');
    });
  }
  /**
   * sendPasswordResetMail sends a password reset mail
   * @method sendPasswordResetMail
   *
   * @param {string} email email address of the user requesting for a Change of password
   * @param {FunctionDeclaration} done callback
   *
   * @return {objecte} success or failure data
   */
  sendPasswordResetMail(email, done) {
    this.database.Users.findOne({
      where: {
        email
      }
    }).then((result) => {
      if (result === null) {
        done('Email Address Not found');
      } else {
        const link = 'https://postaa.herokuapp.com/newpassword';
        const userKey = User.createToken({ email });
        const sendMailResult = User.sendMail({
          from: '"PostIt APP 👻" <emmanuel.alabi@andela.com>',
          to: email,
          subject: 'Password Reset',
          text: 'You have requested for a password reset. Follow the link below to reset your password',
          html: `<h3>
                  You have requested for a password reset. Follow the link below to reset your password
                </h3>
                <a href=${link}?tok=${userKey}>Click Me to Change Password</a>`
        });
        done(sendMailResult);
      }
    }).catch(() => {
      done('Error Sending Mail');
    });
  }

  /**
   * resetPassword resets the password of a user
   * @method resetPassword
   *
   * @param {string} password new password from the user
   * @param {string} key the uniquekey generated for the user
   * @param {FunctionDeclaration} done callback
   *
   * @return {object} success or failure data
   */
  resetPassword(password, key, done) {
    const validate = User.validate(password, 1);
    if (validate === 'valid') {
      const { email } = (jwt.decode(key)).data;
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, (err, hash) => {
          this.database.Users.update({ password: hash },
            {
              where: { email }
            }
            ).then((result) => {
              if (result[0] === 0) {
                done('Error Updating Password');
              } else {
                const mailOptions = {
                  from: '"PostIt APP 👻" <emmanuel.alabi@andela.com>',
                  to: email,
                  subject: 'Password Reset Successful',
                  text: 'Your password has being changed. Please Login with your new password',
                  html: '<a href="">Click Here to Login</a>'
                };
                User.sendMail(mailOptions);
                done('Password Updated');
              }
            }).catch(() => {
              done('Error Updating Password');
            });
        });
      });
    } else {
      done(validate);
    }
  }

  /**
   * googleSignUp registers a new user with google+
   * @method googleSignUp
   *
   * @param {string} name name of the user
   * @param {string} email email of the user
   * @param {string} username username of the user
   * @param {string} state status of the the authorization
   * @param {string} password='social' default password
   * @param {Function} done callback
   *
   * @return {objct} success or failure data
   */
  googleSignUp(name, email, username, state, password = null, done) {
    this.database.Users.findOrCreate({
      where: {
        name,
        username,
        email,
        password,
        phone: null,
        authType: 'Google'
      }
    }).then((result) => {
      const id = result[0].id;
      const token = User.createToken({ id, name, username, email });
      done({ id, name, username, email, token });
    }).catch(() => {
      done('Error Signing Up with Google, Try Again');
    });
  }

  /**
   * googleSignIn registers a new user with google+
   * @method googleSignIn
   *
   * @param {string} name name of the user
   * @param {string} email email of the user
   * @param {string} username username of the user
   * @param {string} state status of the the authorization
   * @param {Function} done callback
   *
   * @return {objct} success or failure data
   */
  googleSignIn(name, email, username, state, done) {
    this.database.Users.findAll({
      where: {
        username,
        email,
        authType: 'Google'
      },
      include: ['notifications']
    }).then((result) => {
      if (result.length === 0) {
        done('Please Sign Up First');
      } else {
        const { id, phone } = result[0];
        const token = User.createToken({ id, name, username, phone, email });
        done({ id, name, username, phone, email, token });
      }
    }).catch(() => {
      done('Error Signing In with Google, Try Again');
    });
  }
  /**
   * checkIfMember checks if user is a member of a group
   * @method checkIfMember
   *
   * @param {number} userId unique Identity of the user
   * @param {number} groupId unique Identity of the group
   * @param {Function} done callback function
   *
   * @return {boolean} result of the check
   */
  checkIfMember(userId, groupId, done) {
    this.database.GroupMembers.findOne({
      where: {
        UserId: userId,
        GroupId: groupId
      }
    }).then((response) => {
      if (response !== null) {
        done(true);
      } else {
        done(false);
      }
    })
    .catch(() => {
      done(false);
    });
  }
  /**
   * clearTables empties every model of data
   * @method clearTables
   *
   * @param {Function} done callback
   *
   * @return {void}
   */
  clearTables() {
    this.database.Users.destroy({
      where: {
        id: {
          $gte: 0
        }
      }
    });
    this.database.Groups.destroy({
      where: {
        id: {
          $gte: 0
        }
      }
    });
    this.database.GroupMembers.destroy({
      where: {
        id: {
          $gte: 0
        }
      }
    });
    this.database.Messages.destroy({
      where: {
        id: {
          $gte: 0
        }
      }
    });
    this.database.Notifications.destroy({
      where: {
        id: {
          $gte: 0
        }
      }
    });
  }
}

export default User;
