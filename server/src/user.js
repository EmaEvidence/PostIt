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
 * @return {STRING} Connection status message
 */
  constructor() {
    this.db = db;
  }

  /**
   * [validateInput description]
   * @method validateInput
   * @param  {[type]}      userPassword [description]
   * @return {[type]}                   [description]
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
   * [flattenUserId description]
   * @method flattenUserId
   * @param  {[type]}      arrayOfIds [description]
   * @return {[type]}                 [description]
   */
  static flattenUserId(arrayOfIds) {
    const ids = [];
    arrayOfIds.forEach((idObject) => {
      ids.push(idObject.id);
    });
    return ids;
  }

  /**
   * [sendText description]
   * @method sendText
   * @param  {[type]} payload [description]
   * @return {[type]}         [description]
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
   * [mailer description]
   * @method mailer
   * @param  {[type]} mailOptions [description]
   * @param  {[type]} done [description]
   * @return {[type]}             [description]
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
   * [createToken description]
   * @method createToken
   * @param  {[type]}    payload [description]
   * @return {[type]}            [description]
   */
  static createToken(payload) {
    const createdToken = jwt.sign({
      exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24),
      data: payload
    }, process.env.JWT_SECRET);
    return createdToken;
  }
  /**
   * [inAppNotify description]
   * @method inAppNotify
   * @param  {[type]}    users    [description]
   * @param  {[type]}    groupId  [description]
   * @param  {[type]}    senderId [description]
   * @param  {Function}  done     [description]
   * @return {[type]}             [description]
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
   * [showNotification description]
   * @method showNotification
   * @param  {[type]}         userId [description]
   * @param  {Function}       done   [description]
   * @return {[type]}                [description]
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
   * [clearInAppNotitice description]
   * @method clearInAppNotitice
   * @param  {[type]}           notificationIds [description]
   * @param  {Function}         done            [description]
   * @return {[type]}                           [description]
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
   * @param  {STRING} userName    Name of the User
   * @param  {STRING} userUsername userName of the user
   * @param  {STRING} userEmail    Email address of the User
   * @param  {STRING} userPassword password of the user
   * @param  {STRING} userPhone phone Number of the user
   * @param  {FunctionDeclaration} done         callback function
   * @return {STRING}              the result of the registration attempt.
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
            if (err.errors[0] === undefined) {
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
   * @param  {STRING} userEmail    the email of the user to delete
   * @param  {function} done         callback function that makes the result availale
   * @return {oject}              the result of the deletion
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
   * @param  {STRING} userName                  userName of the user
   * @param  {STRING} password                  password of the user
   * @param  {FunctionDeclaration} done         callback function
   * @return {STRING}                           the result of the registration attempt.
   */
  logIn(userName, password, done) {
    this.db.Users.findAll({
      where: {
        username: userName
      },
      include: ['Notifications']
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
              notifications: user[0].Notifications
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
   * [createGroup description]
   * @method createGroup
   * @param  {[type]}    groupName [description]
   * @param  {[type]}    creator   [description]
   * @param  {[type]}    users     [description]
   * @param  {Function}  done      [description]
   * @return {[type]}              [description]
   */
  createGroup(groupName, creator, users, done) {
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
          group_name: groupName,
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
          groupname: createdGroup[0].group_name,
          createdBy: createdGroup[0].gpCreatorIdId
        };
        done(result);
      }).catch((err) => {
        if (err.errors[0] === undefined) {
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
   * deleteGroup - description
   *
   * @param  {type} group   description
   * @param  {type} creator description
   * @param  {type} done    description
   * @return {type}         description
   */
  deleteGroup(group, creator, done) {
    this.db.Groups.destroy({
      where: {
        group_name: group,
        gpCreatorIdId: creator
      }
    }).then((result) => {
      done(result);
    }).catch((err) => {
      done(err);
    });
  }
  /**
   * [deleteGroupWithName description]
   * @method deleteGroupWithName
   * @param  {[type]}            group   [description]
   * @param  {[type]}            creator [description]
   * @param  {Function}          done    [description]
   * @return {[type]}                    [description]
   */
  deleteGroupWithName(group, done) {
    this.db.Groups.destroy({
      where: {
        group_name: group
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
   * @param  {INTEGER} group id of the group to add users to
   * @param  {INTEGER} user  id of user being added
   * @param  {INTEGER} added id of user adding the new user
   * @param  {FunctionDeclaration} done         callback function
   * @return {STRING}       result of the addition attempt.
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
          done(err.parent.detail);
        } else {
          done(err.errors[0].message || err.message);
        }
      });
    }
  }


  /**
   * deleteUserFromGroup - description
   *
   * @param  {type} group description
   * @param  {type} user  description
   * @param  {type} added description
   * @param  {type} done  description
   * @return {type}       description
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
   * @param  {INTEGER} to            id of the group posted to
   * @param  {INTEGER} from          id of the user sending it
   * @param  {STRING} text          the message being sent
   * @param  {INTEGER} priorityLevel Level of message priority
   * @param  {FunctionDeclaration} done         callback function
   * @return {STRING}       result of the post attempt.
   */
  postMessage(to, from, text, priorityLevel, done) {
    if (to === '' || to === undefined) {
      done('Group must be specified');
    } else if (from === '' || from === undefined) {
      done('Sender must be specified');
    } else if (text === '' || text === undefined || (text.trim()).length === 0) {
      done('message cannot be null');
    } else if (priorityLevel !== 'Normal' && priorityLevel !== 'Critical' && priorityLevel !== 'Urgent') {
      done('Wrong Priority level');
    } else {
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
  }
  /**
   * [notifyUser description]
   * @method notifyUser
   * @param  {[type]}   priority [description]
   * @param  {[type]}   users    [description]
   * @return {[type]}            [description]
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
   * @param  {FunctionDeclaration} done         callback function
   * @return {STRING}       result of the get attempt.
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
   * [converts an array of id objects to an array of ids]
   * @method flattenId
   * @param  {[array]}  arrayOfIds [Array of JSON objects]
   * @return {[array]}             [Numeric array]
   */
  static flattenId(arrayOfIds) {
    const ids = [];
    arrayOfIds.forEach((idObject) => {
      ids.push(idObject.UserId);
    });
    return ids;
  }

  /**
   * [converts an array of id objects to an array of ids]
   * @method flattenId
   * @param  {[array]}  arrayOfIds [Array of JSON objects]
   * @return {[array]}             [Numeric array]
   */
  static flattenGroupId(arrayOfIds) {
    const ids = [];
    arrayOfIds.forEach((idObject) => {
      ids.push(idObject.GroupId);
    });
    return ids;
  }

/**
 * [getGroupMembers description]
 * @method getGroupMembers
 * @param  {[type]}        group [description]
 * @param  {Function}      done  [description]
 * @return {[type]}              [description]
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
   * @param  {[integer]}      userId [the id of the user whose groups is being querried]
   * @param  {Function}    done   [callback function]
   * @return {[json]}             [json object that can be the groups or the error message]
   */
  getUserGroups(userId, done) {
    this.db.GroupMembers.findAll({
      where: { UserId: userId },
      attributes: ['GroupId']
    }).then((groups) => {
      const ids = User.flattenGroupId(groups);
      this.db.Groups.findAll({
        attributes: ['id', 'group_name', 'gpCreatorIdId'],
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
 * [getAllUsers description]
 * @method getAllUsers
 * @param  {Function}  done [description]
 * @return {[type]}         [description]
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
 * [seenMessages description]
 * @method seenMessages
 * @param  {[type]}     messageId [description]
 * @param  {[type]}     userId    [description]
 * @param  {Function}   done      [description]
 * @return {[type]}               [description]
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
 * [searchUsers description]
 * @method searchUsers
 * @param  {[type]}    searchTerm [description]
 * @param  {Function}  offset     [description]
 * @param  {[type]}    groupId [description]
 * @param  {Function}  done       [description]
 * @return {[type]}               [description]
 */
  searchUsers(searchTerm, offset, groupId, done) {
  //  const term = searchTerm.toLowerCase();
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
   * [myMessages description]
   * @method myMessages
   * @param  {[type]}   userId [description]
   * @param  {Function} done   [description]
   * @return {[type]}          [description]
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
   * [archivedMessages description]
   * @method archivedMessages
   * @param  {[type]}         userId [description]
   * @param  {Function}       done   [description]
   * @return {[type]}                [description]
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
   * [sendPasswordResetMail description]
   * @method sendPasswordResetMail
   * @param  {[type]}              email [description]
   * @param  {Function}            done  [description]
   * @return {[type]}                [description]
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
        const link = 'http://www.facebook.com';
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(email, salt, (err, hash) => {
            console.log(hash);
            const sendMail = User.mailer({
              from: '"PostIt APP 👻" <emmanuel.alabi@andela.com>',
              to: email,
              subject: 'Password Resett',
              text: 'You have requested for a password reset. Follow the link below to reset your password',
              html: `<h3>You have requested for a password reset. Follow the link below to reset your password</h3>
                      <a href=${link}>Click Me to Change Password</a>`
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
   * [resetPassword description]
   * @method resetPassword
   * @param  {[type]}      password  [description]
   * @param  {[type]}      userEmail [description]
   * @param  {Function}    done      [description]
   * @return {[type]}                [description]
   */
  resetPassword(password, userEmail, done) {
    const validate = User.validatePassword(password);
    if (validate === 'valid') {
      const email = userEmail.split('=')[1];
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(email, salt, (err, emailHash) => {
          bcrypt.hash(password, salt, (err, hash) => {
            this.db.Users.update({ password: hash },
              {
                where: { email: emailHash }
              }
            ).then(() => {
              const mailOptions = {
                from: '"PostIt APP 👻" <emmanuel.alabi@andela.com>',
                to: emailHash,
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
   * [clearTables description]
   * @method clearTables
   * @param  {Function}  done [description]
   * @return {[type]}         [description]
   */
  clearTables(done) {
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
