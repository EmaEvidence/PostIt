import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

import database from '../models/database';
import validate from '../services/validate';
import createToken from '../services/createToken';
import * as flatten from '../services/flattenArray';
import sendMail from '../services/sendMail';
import notifyUsers from '../services/notifyUsers';

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
   * inAppNotify sends an in app notification to members of a group
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
   * signUp Creates a new user
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
    const validity = validate(password, phone);
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
            const token = createToken({ id, name, username, phone, email });
            done({ user: { id, name, username, phone, email }, token });
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
      if (phone.length !== 11 || isNaN(phone)) {
        done('Invalid Phone Number');
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
   * logIn checks if the provided User/log-In details
   * is availale in the database
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
            const token = createToken({ id,
              name,
              username,
              email,
              phone });
            done({
              user: {
                id,
                name,
                username,
                email,
                notification,
                phone
              },
              token });
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
    const newUsers = [];
    this.database.Users.findAll({
      attributes: ['id'],
      where: {
        username: users
      }
    }).then((user) => {
      const members = flatten.userId(user);
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
            newUsers.push({ id: member });
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
        const { id, createdAt } = createdGroup[0];
        done({
          id,
          groupName,
          groupCreatorId: creator,
          createdAt,
          Users: newUsers
        });
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
   * @param {number} addedBy id of the user who added the user to be deleted
   * @param {FunctionDeclaration} done callback
   *
   * @return {object} result of the removal
   */
  deleteUserFromGroup(group, user, addedBy, done) {
    this.database.GroupMembers.destroy({
      where: {
        GroupId: group,
        UserId: user,
        addedBy
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
   * @param  {number} groupId id of the group posted to
   * @param  {string} senderUsername the message being sent
   * @param  {number} senderId id of the user sending it
   * @param  {string} text the message being sent
   * @param  {number} priorityLevel Level of message priority
   * @param  {FunctionDeclaration} done callback function
   *
   * @return {string} result of the post attempt.
   */
  postMessage(groupId, senderUsername, senderId, text, priorityLevel, done) {
    this.database.Messages.create({
      groupId,
      message: text,
      senderId,
      senderUsername,
      priority: priorityLevel
    }).then((messageData) => {
      const { id, message, priority, createdAt } = messageData;
      this.database.Groups.findOne({
        attributes: ['id'],
        where: { id: groupId },
        include: ['Users']
      }).then((group) => {
        notifyUsers(priorityLevel, group.Users);
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
 * getGroupMembers gets the members of a group
 * @method getGroupMembers
 *
 * @param  {number} group unique Identity of the group
 * @param  {Function} done callback
 *
 * @return {object} users
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
      const ids = flatten.groupId(groups);
      this.database.Groups.findAll({
        attributes: ['id', 'groupName', 'groupCreatorId', 'createdAt'],
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
   * @param {string} email users email address
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
        const userKey = createToken({ email });
        const sendMailResult = sendMail({
          from: '"PostIt APP 👻" <emmanuel.alabi@andela.com>',
          to: email,
          subject: 'Password Reset',
          text: `You have requested for a password reset.
                  Follow the link below to reset your password`,
          html: `<h3>
                  You have requested for a password reset.
                  Follow the link below to reset your password
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
    if (/^(?=.*\d)(?=.*\W)(?=.*[a-zA-Z])(?!.*\s).{8,}$/.test(password)) {
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
                  text: `Your password has being changed.
                          Please Login with your new password`,
                  html: '<a href="">Click Here to Login</a>'
                };
                sendMail(mailOptions);
                done('Password Updated');
              }
            }).catch(() => {
              done('Error Updating Password');
            });
        });
      });
    } else {
      done('Password Must Contain Alphabets, Numbers, Special Characters and Must be Longer than 8');
    }
  }

  /**
   * googleSignUp registers a new user with google+
   * @method googleSignUp
   *
   * @param {string} name name of the user
   * @param {string} email email of the user
   * @param {string} username username of the user
   * @param {string} type status of the the authorization
   * @param {Function} done callback
   *
   * @return {objct} success or failure data
   */
  googleSignUp(name, email, username, type, done) {
    this.database.Users.findOrCreate({
      where: {
        name,
        username,
        email,
        authType: 'Google'
      }
    }).then((result) => {
      const id = result[0].id;
      const token = createToken({ id, name, username, email });
      done({ user: { id, name, username, email }, token });
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
   * @param {string} type status of the the authorization
   * @param {Function} done callback
   *
   * @return {objct} success or failure data
   */
  googleSignIn(name, email, username, type, done) {
    this.database.Users.findOne({
      where: {
        email,
        authType: 'Normal'
      }
    })
    .then((response) => {
      if (response === null || response.length === 0) {
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
            const { id, phone, notification } = result[0];
            const token = createToken({ id, name, username, phone, email });
            done({
              user: { id, name, username, phone, email, notification },
              token });
          }
        });
      } else {
        done('Already a user, Please sign in with your password');
      }
    })
    .catch(() => {
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
}

export default User;
