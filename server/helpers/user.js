import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import jusibe from 'jusibe';
import db from '../models/connection';

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
    this.db = db;
  }

  /**
   * validateInput checks the validity of the supplied Password
   *
   * @method validateInput
   * @param  {string} userPassword user's Password
   * @return {string} result of validity test
   *
   */
  static validatePassword(userPassword) {
    let validity;
    if (/^(?=.*\d)(?=.*\W)(?=.*[a-zA-Z])(?!.*\s).{8,}$/.test(userPassword)) {
      validity = 'valid';
    } else {
      validity = 'Password Must Contain Alphabets, Numbers, Special Characters and Must be Longer than 8';
    }
    return validity;
  }
  /**
   * flattenUserId removes users from array of json objects to an array ofnumbers
   *
   * @method flattenUserId
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
   *
   * @method sendText
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
   * mailer sends email messages to users
   *
   * @method mailer
   * @param  {object} mailOptions user data and message details
   * @param  {function} done returns the result of the action asynchronously
   *
   * @return {string} success report
   */
  static mailer(mailOptions, done) {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: 'emmanuelalabi563@gmail.com',
        pass: process.env.EMAIL_PASSWORD
      }
    });
    return transporter.sendMail(mailOptions)
      .then(() => done('Mail Sent'))
      .catch(() => done('Mail Not Sent'));
  }

  /**
   * createToken generates a json web token
   *
   * @method createToken
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
   *
   * @method inAppNotify
   * @param  {array} users array of user ids
   * @param  {number} groupId id of the group the message was sent to
   * @param  {number} senderId id of the user sending the message
   * @param  {function} done returns the result of the action asynchronously
   *
   * @return {string} success report
   */
  inAppNotify(users, groupId, senderId, done) {
    users.forEach((user) => {
      const id = user.id;
      if (id !== senderId) {
        this.db.Notifications.create({
          type: 'A New Message',
          groupId,
          name: 'Andela',
          source: senderId,
          UserId: id,
          status: 'Not Seen'
        }).then(() => {
          done(' A notification has being sent to every group Member');
        }).catch(() => {
          done('Error Notifying Group Memberd');
        });
      }
    });
  }

  /**
   * showNotification retrieves notifications for a user
   *
   * @method showNotification
   * @param  {number} userId id of the user
   * @param  {function} done returns the result of the action asynchronously
   *
   * @return {string} success report
   */
  showNotification(userId, done) {
    this.db.Notifications.findAll({
      where: {
        UserId: userId,
        status: 'Not Seen'
      }
    })
    .then((notifications) => {
      done(notifications);
    })
    .catch(() => {
      done('Error Retrieving Notification');
    });
  }

  /**
   * clearInAppNotitice removes notification onces the user sees it
   *
   * @method clearInAppNotitice
   * @param {number} notificationIds [id of the seen notification]
   * @param {function} done returns the result of the action asynchronously
   *
   * @return {string} success report
   */
  clearInAppNotice(notificationIds, done) {
    this.db.notifications.update({ Status: 'Seen' },
      {
        where: {
          id: notificationIds
        }
      })
      .then(() => {
        done('Notification done');
      })
      .catch(() => {
        done('Error Clearing Notifications');
      });
  }
  /**
   * signUp - Creates a user from the data provided by saving it in the user database.
   *
   * @param {string} userName Name of the User
   * @param {string} userUsername userName of the user
   * @param {string} userEmail Email address of the User
   * @param {string} userPassword password of the user
   * @param {string} userPhone phone Number of the user
   * @param {FunctionDeclaration} done callback function
   *
   * @return {string} the result of the registration attempt.
   */
  signUp(userName, userUsername, userEmail, userPassword, userPhone, done) {
    const validity = User.validatePassword(userPassword);
    if (validity === 'valid') {
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(userPassword, salt, (err, hash) => {
          this.db.Users.create({
            name: userName,
            username: userUsername,
            email: userEmail,
            password: hash,
            phone: userPhone
          }).then((user) => {
            const result = {
              id: user.id,
              name: user.name,
              username: user.username,
              phone: user.phone,
              email: user.email
            };
            result.token = User.createToken(result);
            done(result);
          }).catch((err) => {
            if (err.errors === undefined) {
              done(err.message);
            } else {
              if (err.errors && err.errors[0].message === '') {
                done(`${err.errors[0].path} must be defined`);
              }
              done(err.errors[0].message || err.message);
            }
          });
        });
      });
    } else {
      done(validity);
    }
  }


  /**
   * deleteUser - Deletes a registered User from the database
   *
   * @param  {string} userEmail the email of the user to delete
   * @param  {function} done callback function that makes the result availale
   *
   * @return {oject} the result of the deletion
   */
  deleteUserss(userEmail, done) {
    this.db.Users.destroy({
      where: {
        email: userEmail
      }
    }).then((user) => {
      done(user);
    }).catch((err) => {
      done(err);
    });
  }

  /**
   * logIn - checks if the provided User/log In details is availale i the database
   *
   * @param  {string} userName userName of the user
   * @param  {string} password password of the user
   * @param  {FunctionDeclaration} done callback function
   *
   * @return {string} the result of the registration attempt.
   */
  logIn(userName, password, done) {
    this.db.Users.findAll({
      where: {
        username: userName
      },
      include: ['notifications']
    }).then((user) => {
      if (user.length === 0) {
        done('Failed, Username not Found');
      } else {
        bcrypt.compare(password, user[0].password, (err, res) => {
          if (res) {
            const result = {
              id: user[0].id,
              name: user[0].name,
              username: user[0].username,
              phone: user[0].phone,
              email: user[0].email,
              notifications: user[0].notifications
            };
            result.token = User.createToken(result);
            done(result);
          } else {
            done('Failed, Wrong Password');
          }
        });
      }
    });
  }

  /**
   * createGroup description
   *
   * @method createGroup
   * @param  {string} groupName name of the group to be created
   * @param  { } creator id of the user creating it
   * @param  {array} users ids of initial members of the groub
   * @param  {Function} done callback function
   *
   * @return {object} success or failure data
   */
  createGroup(groupName, creator, users, done) {
    console.log(groupName, creator, users, '======-------------========');
    let createdGroup;
    this.db.Users.findAll({
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
      this.db.Groups.findOrCreate({
        where: {
          groupName,
          gpCreatorIdId: creator
        }
      }).then((group) => {
        if (group[1] === false) {
          done('Group Exists already');
        } else {
          createdGroup = group;
          members.forEach((member) => {
            this.db.GroupMembers.findOrCreate({
              where: {
                GroupId: group[0].id,
                UserId: member,
                addedBy: creator
              }
            });
          });
        }
      }).then(() => {
        const result = {
          id: createdGroup[0].id,
          groupname: createdGroup[0].groupNname,
          createdBy: createdGroup[0].gpCreatorIdId
        };
        done(result);
      }).catch((err) => {
        if (err.errors === undefined) {
          done(err);
        } else {
          if (err.errors && err.errors[0].message === '') {
            done(`${err.errors[0].path} can not be Undefined`);
          } else {
            done(err.errors[0].message || err.message);
          }
        }
      });
    })
      .catch((err) => {
        done(err.name);
      });
  }


  /**
   * deleteGroup - removes a created group from the database
   *
   * @param  {number} group id of group to delete
   * @param  {number} creator id of the creator
   * @param  {FunctionDeclaration} done callback function
   *
   * @return {object} success or failure data
   */
  deleteGroup(group, creator, done) {
    this.db.Groups.destroy({
      where: {
        groupName: group,
        gpCreatorIdId: creator
      }
    }).then((result) => {
      done(result);
    }).catch((err) => {
      done(err);
    });
  }
  /**
   * deleteGroupWithName removes a group using the name of the group
   *
   * @method deleteGroupWithName
   * @param {string} groupName name of the group
   * @param {Function} done callback function
   *
   * @return {object} success or failure data
   */
  deleteGroupWithName(groupName, done) {
    this.db.Groups.destroy({
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
   *
   * @param  {number} group id of the group to add users to
   * @param  {INTEGER} user  id of user being added
   * @param  {INTEGER} added id of user adding the new user
   * @param  {FunctionDeclaration} done callback function
   *
   * @return {string} result of the addition attempt.
   */
  addUsers(group, user, added, done) {
    const groupToInt = parseInt(group, 10);
    const userToInt = parseInt(user, 10);
    if (groupToInt === '' || isNaN(groupToInt)) {
      done('Group Id must be stated');
    } else if (userToInt === '' || isNaN(userToInt)) {
      done('User Id must be stated');
    } else {
      this.db.GroupMembers.findOrCreate({
        where: {
          GroupId: group,
          UserId: user,
          addedBy: added
        }
      }).then((result) => {
        if (result[1] === false) {
          done('User is already a member');
        } else {
          done(result);
        }
      }).catch((err) => {
        if (err.error === undefined) {
          done(err);
        } else {
          done(err.errors[0].message || err.message);
        }
      });
    }
  }


  /**
   * deleteUserFromGroup - removes a user from a group
   *
   * @param {number} group id of the group
   * @param {number} user id of the user
   * @param {number} added id of the user who added the user to be deleted
   * @param {FunctionDeclaration} done callback
   *
   * @return {object} result of the removal
   */
  deleteUserFromGroup(group, user, added, done) {
    this.db.GroupMembers.destroy({
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
   *
   * @param  {INTEGER} to id of the group posted to
   * @param  {INTEGER} from id of the user sending it
   * @param  {string} text the message being sent
   * @param  {INTEGER} priorityLevel Level of message priority
   * @param  {FunctionDeclaration} done callback function
   *
   * @return {string} result of the post attempt.
   */
  postMessage(to, from, text, priorityLevel, done) {
    this.db.Messages.create({
      groupIdId: to,
      message: text,
      senderIdId: from,
      priority: priorityLevel
    }).then((message) => {
      const result = {
        id: message.id,
        message: message.message,
        groupIdId: message.groupIdId,
        senderIdId: message.senderIdId,
        priority: message.priority
      };
      this.db.sequelize.query(`SELECT t."id", phone, email FROM "GroupMembers" as a, "Users" as t where "UserId"=t.id and a."GroupId"=${to}`, { type: this.db.sequelize.QueryTypes.SELECT })
        .then((users) => {
          User.notifyUser(priorityLevel, users);
          done(result, users);
        });
    }).catch((err) => {
      done(err.name);
    });
  }
  /**
   * notifyUser description
   *
   * @method notifyUser
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
      emails.forEach((email) => {
        const mailOptions = {
          from: '"PostIt APP 👻" <emmanuel.alabi@andela.com>',
          to: email,
          subject: 'New Message Notification',
          text: 'You have a new message in Post It App.',
          html: '<a href="#">Click Here to Access It</a>'
        };
        User.mailer(mailOptions);
      });
      phones.forEach((phone) => {
        const payload = {
          to: phone,
          from: 'Post App',
          message: 'You have a new Message on Post It App.'
        };
        User.sendText(payload, () => {
        });
      });
    } else {
      emails.forEach((email) => {
        const mailOptions = {
          from: '"PostIt APP 👻" <emmanuel.alabi@andela.com>',
          to: email,
          subject: 'New Message Notification',
          text: 'You have a new message in Post It App.',
          html: '<a href="#">Click Here To Access it</a>'
        };
        User.mailer(mailOptions);
      });
    }
  }

  /**
   * retrieveMessage - gets messages for a group
   *
   * @param  {INTEGER} group the id of the group
   * @param  {FunctionDeclaration} done callback function
   *
   * @return {string} result of the get attempt.
   */
  retrieveMessage(group, done) {
    this.db.Messages.findAll({
      where: {
        groupIdId: group
      },
      order: [['id', 'DESC']]
    }).then((messages) => {
      done(messages);
    }).catch((err) => {
      done(err);
    });
  }
  /**
   * converts an array of id objects to an array of ids
   *
   * @method flattenId
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
   *
   * @method flattenId
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
 *
 * @method getGroupMembers
 * @param  {type} group description
 * @param  {Function} done description
 *
 * @return {type} description
 */
  getGroupMembers(group, done) {
    this.db.sequelize.query(`SELECT t."id", phone, name, username, email FROM "GroupMembers" as a, "Users" as t where "UserId"=t.id and a."GroupId"=${group}`, { type: this.db.sequelize.QueryTypes.SELECT })
    .then((users) => {
      done(users);
    })
    .catch((err) => {
      done(err.name);
    });
  }

  /**
   *
   * @method getUserGroups
   *
   * @param  {number} userId the id of the user whose groups is being querried
   * @param  {Function} done callback function
   *
   * @return {json} json object that can be the groups or the error message
   */
  getUserGroups(userId, done) {
    this.db.GroupMembers.findAll({
      where: { UserId: userId },
      attributes: ['GroupId']
    }).then((groups) => {
      const ids = User.flattenGroupId(groups);
      this.db.Groups.findAll({
        attributes: ['id', 'groupName', 'gpCreatorIdId'],
        where: { id: ids },
        order: [['createdAt', 'DESC']],
        include: ['Users']
      }).then((userGroup) => {
        done(userGroup);
      }).catch((err) => {
        done(err);
      });
    }).catch((err) => {
      done(err);
    });
  }

/**
 * getAllUsers retrieves every user from the database
 *
 * @method getAllUsers
 * @param  {FunctionDeclaration}  done callback
 *
 * @return {object} success or failure data
 */
  getAllUsers(done) {
    this.db.Users.findAll({
      attributes: ['id', 'username']
    }).then((users) => {
      done(users);
    }).catch((err) => {
      done(err);
    });
  }

/**
 * seenMessages groups Messages as seen
 *
 * @method seenMessages
 * @param {number} messageId id of the message
 * @param {number} userId id of user seeing it
 * @param {FunctionDeclaration} done callback
 *
 * @return {object} success or failure data
 */
  seenMessages(messageId, userId, done) {
    this.db.Messages.findAll({
      attributes: ['id', 'views'],
      where: { id: messageId }
    }).then((message) => {
      let updateViews = [];
      if (message[0].views === null) {
        updateViews.push(userId);
      } else if ((message[0].views).indexOf(userId) < 0) {
        updateViews = (message[0].views).push(userId);
      } else {
        updateViews = (message[0].views);
      }
      this.db.Messages.update({ views: updateViews },
        { where: {
          id: messageId
        } }
        ).then(() => {
          done('Read');
        }).catch(() => {
          done('Error Reading Message');
        });
    }).catch(() => {
      done('Error Reading Message');
    });
  }
/**
 * searchUsers searches the database for every occurence of the supplied term
 *
 * @method searchUsers
 * @param  {string} searchTerm term to be looked for
 * @param {number} offset number of record to skip
 * @param {number} groupId id of the group from where the search is made
 * @param {FunctionDeclaration} done callback
 *
 * @return {object} success or failure data
 */
  searchUsers(searchTerm, offset, groupId, done) {
    const processedTerm = `%${searchTerm}%`;
    this.db.Users.findAndCountAll({
      attributes: ['id', 'email', 'username'],
      where: {
        username: {
          like: processedTerm
        }
      },
      offset,
      limit: 5
    })
    .then((result) => {
      done(result);
    }).catch((err) => {
      done(err);
    });
  }
  /**
   * myMessages retrieves messages sent by a user from the database
   *
   * @method myMessages
   * @param {number} userId id of the user
   * @param {FunctionDeclaration} done callback
   *
   * @return {object} success or failure data
   */
  myMessages(userId, done) {
    this.db.Messages.findAll({
      where: {
        senderIdId: userId
      }
    }).then((result) => {
      done(result);
    }).catch((err) => {
      done(err);
    });
  }
  /**
   * archivedMessages retrieves seen messages from the database
   *
   * @method archivedMessages
   * @param {number} userId id of the user seeing it
   * @param {FunctionDeclaration} done callback
   *
   * @return {object} success or failure data
   */
  archivedMessages(userId, done) {
    this.db.Messages.findAll({
      where: {
        views: { contains: [userId] }
      }
    }).then((result) => {
      done(result);
    }).catch((err) => {
      done(err);
    });
  }
  /**
   * sendPasswordResetMail sends a password reset mail
   *
   * @method sendPasswordResetMail
   * @param {string} email email address of the user requesting for a Change of password
   * @param {FunctionDeclaration} done callback
   *
   * @return {objecte} success or failure data
   */
  sendPasswordResetMail(email, done) {
    this.db.Users.findOne({
      where: {
        email
      }
    }).then((result) => {
      if (result === null) {
        done('Email Address Not found');
      } else {
        const link = 'https://postaa.herokuapp.com/newpassword';
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(email, salt, (err, hash) => {
            const sendMail = User.mailer({
              from: '"PostIt APP 👻" <emmanuel.alabi@andela.com>',
              to: email,
              subject: 'Password Reset',
              text: 'You have requested for a password reset. Follow the link below to reset your password',
              html: `<h3>You have requested for a password reset. Follow the link below to reset your password</h3>
                      <a href=${link}/${hash}>Click Me to Change Password</a>`
            });
            done(sendMail);
          });
        });
      }
    }).catch(() => {
      done('Email Address Not found');
    });
  }

  /**
   * resetPassword resets the password of a user
   *
   * @method resetPassword
   * @param {string} password new password from the user
   * @param {string} key the uniquekey generated for the user
   * @param {FunctionDeclaration} done callback
   *
   * @return {object} success or failure data
   */
  resetPassword(password, key, done) {
    const validate = User.validatePassword(password);
    if (validate === 'valid') {
      const userKey = key.split('=')[1];
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(userKey, salt, (err, keyHash) => {
          bcrypt.hash(password, salt, (err, hash) => {
            this.db.Users.update({ password: hash },
              {
                where: { email: keyHash }
              }
            ).then(() => {
              const mailOptions = {
                from: '"PostIt APP 👻" <emmanuel.alabi@andela.com>',
                to: keyHash,
                subject: 'Password Reset Successful',
                text: 'Your password has being changed. Please Login with your new password',
                html: '<a href="">Click Here to Login</a>'
              };
              User.mailer(mailOptions);
              done('Password Updated');
            }).catch(() => {
              done('Error Updating Password');
            });
          });
        });
      });
    } else {
      done(validate);
    }
  }

  /**
   * googleSignUp registers a new user with google+
   *
   * @method googleSignUp
   * @param {string} name name of the user
   * @param {string} email email of the user
   * @param {string} username username of the user
   * @param {string} state status of the the authorization
   * @param {string} password='social' default password
   * @param {Function} done callback
   *
   * @return {objct} success or failure data
   */
  googleSignUp(name, email, username, state, password = 'social', done) {
    this.db.Users.findOrCreate({
      where: {
        name,
        username,
        email,
        password,
        phone: '08000000000',
        authType: 'Google'
      }
    }).then((result) => {
      const user = {
        id: result[0].id,
        name: result[0].name,
        username: result[0].username,
        phone: result[0].phone,
        email: result[0].email
      };
      user.token = User.createToken(user);
      done(user);
    }).catch(() => {
      done('Error Signing Up with Google, Try Again');
    });
  }

  /**
   * googleSignIn registers a new user with google+
   *
   * @method googleSignIn
   * @param {string} name name of the user
   * @param {string} email email of the user
   * @param {string} username username of the user
   * @param {string} state status of the the authorization
   * @param {string} password default password
   * @param {Function} done callback
   *
   * @return {objct} success or failure data
   */
  googleSignIn(name, email, username, state, password = 'social', done) {
    this.db.Users.findAll({
      where: {
        username,
        email,
        password,
        authType: 'Google'
      }
    }).then((result) => {
      if (result.length === 0) {
        done('Please Sign Up First');
      } else {
        const user = {
          id: result[0].id,
          name: result[0].name,
          username: result[0].username,
          phone: result[0].phone,
          email: result[0].email
        };
        user.token = User.createToken(user);
        done(user);
      }
    }).catch(() => {
      done('Error Signing In with Google, Try Again');
    });
  }
  /**
   * clearTables empties every model of data
   *
   * @method clearTables
   * @param {Function} done callback
   *
   * @return {void} []
   */
  clearTables() {
    this.db.Users.destroy({
      where: {
        id: {
          $gte: 0
        }
      }
    });
    this.db.Groups.destroy({
      where: {
        id: {
          $gte: 0
        }
      }
    });
    this.db.GroupMembers.destroy({
      where: {
        id: {
          $gte: 0
        }
      }
    });
    this.db.Messages.destroy({
      where: {
        id: {
          $gte: 0
        }
      }
    });
    this.db.Notifications.destroy({
      where: {
        id: {
          $gte: 0
        }
      }
    });
  }
}

export default User;
