import Sequelize from 'sequelize';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer'
import UserModel from '../models/users';
import GroupModel from '../models/groups';
import GroupMembersModel from '../models/groupmembers';
import MessagesModel from '../models/messages';

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
    let database;
    if (process.env.NODE_ENV === 'test') {
      database = process.env.DB_DATABASE_TEST;
    } else {
      database = process.env.DB_DATABASE;
    }
    const username = process.env.DB_USERNAME;
    const password = process.env.DB_PASSWORD;
    const host = process.env.DB_HOST;
    this.sequelize = new Sequelize(`postgres://${username}:${password}${host}/${database}`);
    this.sequelize.authenticate()
    .then(() => {
      console.log('Connection has been established successfully.');
    })
    .catch((err) => {
      console.log(err);
      console.log('Unable to connect to the database:', err);
    });
    const Users = this.sequelize.define('Users', UserModel);
    this.Users = Users;
    const Groups = this.sequelize.define('Groups', GroupModel);
    this.Groups = Groups;
    const GroupMembers = this.sequelize.define('GroupMembers', GroupMembersModel);
    this.GroupMembers = GroupMembers;
    const Messages = this.sequelize.define('Messages', MessagesModel);
    this.Messages = Messages;
    Users.belongsToMany(Groups, { through: 'GroupMembers' });
    Users.hasOne(Groups, { as: 'gp_creatorId' });
    Messages.belongsTo(Groups, { as: 'group_Id' });
    Messages.belongsTo(Users, { as: 'sender_Id' });
    this.sequelize.sync({});
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

  static flattenUserId(arrayOfIds) {
    const ids = [];
    arrayOfIds.forEach((idObject) => {
      ids.push(idObject.id);
    });
    return ids;
  }

  /**
   * signUp - Creates a user from the data provided by saving it in the user database.
   *
   * @param  {STRING} userName    Name of the User
   * @param  {STRING} userUsername userName of the user
   * @param  {STRING} userEmail    Email address of the User
   * @param  {STRING} userPassword password of the user
   * @param  {FunctionDeclaration} done         callback function
   * @return {STRING}              the result of the registration attempt.
   */
  signUp(userName, userUsername, userEmail, userPassword, userPhone, done) {
    const validity = User.validatePassword(userPassword);
    if (validity === 'valid') {
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(userPassword, salt, (err, hash) => {
          this.Users.create({
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
            const createdToken = jwt.sign({
              exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24),
              data: result
            }, process.env.JWT_SECRET);
            result.token = createdToken;
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
    this.Users.destroy({
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
    if (userName === undefined || userName === '') {
      done('Username can not be empty');
    } else if (password === undefined || password === '') {
      done('Password can not be empty');
    } else {
      this.Users.findAll({
        where: {
          username: userName
        }
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
                email: user[0].email
              };
              const createdToken = jwt.sign({
                exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24),
                data: result
              }, process.env.JWT_SECRET);
              result.token = createdToken;
              done(result);
            } else {
              done('Failed, Wrong Password');
            }
          });
        }
      });
    }
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
    this.Users.findAll({
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
      this.Groups.findOrCreate({
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
            this.GroupMembers.findOrCreate({
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
    this.Groups.destroy({
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
  deleteGroupWithName(group, creator, done) {
    this.Groups.destroy({
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
      this.GroupMembers.findOrCreate({
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
    this.GroupMembers.destroy({
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
      this.Messages.create({
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
        done(result);
      }).catch((err) => {
        done(err.name);
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
    this.Messages.findAll({
      where: {
        groupIdId: group
      }
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
   * [Retrieves the members of a group from the database]
   * @method getGroupMembers
   * @param  {[INTEGER}        group [the Id of the group which user will be returned]
   * @param  {Function}      done  [converts the array of id a JSON object to numeric array]
   * @return {[JSON]}              [A JSON array of the members details]
   */
  getGroupMembers(group, done) {
    this.GroupMembers.findAll({
      where: { GroupId: group },
      attributes: ['UserId']
    }).then((members) => {
      const ids = User.flattenId(members);
      this.Users.findAll({
        attributes: ['id', 'name', 'username', 'phone', 'email'],
        where: { id: ids }
      }).then((groupmember) => {
        done(groupmember);
      }).catch((err) => {
        done(err);
      });
    }).catch((err) => {
      done(err);
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
    this.GroupMembers.findAll({
      where: { UserId: userId },
      attributes: ['GroupId']
    }).then((groups) => {
      const ids = User.flattenGroupId(groups);
      this.Groups.findAll({
        attributes: ['id', 'group_name', 'gpCreatorIdId'],
        where: { id: ids }
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
    this.Users.findAll({
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
    this.Messages.findAll({
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
      this.Messages.update({ views: updateViews },
        { where: {
          id: messageId
        } }
        ).then((res) => {
          done(res);
        }).catch((err) => {
          done(err);
        });
    }).catch((err) => {
      done(err);
    });
  }

  searchUsers(searchTerm, done) {
    const term = searchTerm.toLowerCase();
    this.Users.findAll({
      where: {
        usersname: term
      }
    }).then((result) => {
      done(result);
    }).catch((err) => {
      done(err);
    });
  }

  myMessages(userId, done) {
    this.Messages.findAll({
      where: {
        senderIdId: userId
      }
    }).then((result) => {
      done(result);
    }).catch((err) => {
      done(err);
    });
  }

  archivedMessages(userId, done) {
    this.Messages.findAll({
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
   * [mailer description]
   * @method mailer
   * @param  {[type]} mailOptions [description]
   * @return {[type]}             [description]
   */
  static mailer(mailOptions) {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: 'emmanuelalabi563@gmail.com',
        pass: process.env.EMAIL_PASSWORD
      }
    });
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return (error);
      }
      return 'Message Sent';
    });
  }

  /**
   * [sendPasswordResetMail description]
   * @method sendPasswordResetMail
   * @param  {[type]}              email [description]
   * @param  {Function}            done  [description]
   */
  sendPasswordResetMail(email, done) {
    const mailOptions = {
      from: '"PostIt APP 👻" <emmanuel.alabi@andela.com>',
      to: email,
      subject: 'Password Reset',
      text: 'You have requested for a password reset. Follow the link below to reset your password',
      html: '<a href="">Click Me to Change Password</a>'
    };
    const sendMail = User.mailer(mailOptions);
    done(sendMail);
  }

  resetPassword(password, userEmail, done) {
    const validate = User.validatePassword(password);
    if (validate === 'validate') {
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, (err, hash) => {
          this.Users.update({ password: hash },
            {
              where: { email: userEmail }
            }
          ).then((result) => {
            const mailOptions = {
              from: '"PostIt APP 👻" <emmanuel.alabi@andela.com>',
              to: userEmail,
              subject: 'Password Reset Successful',
              text: 'Your password has being changed. Please Login with your new password',
              html: '<a href="">Click Here to Login</a>'
            };
            User.mailer(mailOptions);
            done(result);
          }).catch((err) => {
            done(err);
          });
        });
      });
    } else {
      done(validate);
    }
  }

}

export default User;
