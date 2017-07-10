import Sequelize from 'sequelize';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
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
    const username = process.env.DB_USERNAME;
    const password = process.env.DB_PASSWORD;
    const host = process.env.DB_HOST;
    this.sequelize = new Sequelize(`postgres://${username}:${password}fant.db.${host}/ldgtnhia`);
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
   * @static validateInput - checks the validity of data supplied by the user
   *
   * @param  {STRING} userName    Name of the User
   * @param  {STRING} userUsername userName of the user
   * @param  {STRING} userEmail    Email address of the User
   * @param  {STRING} userPassword password of the user
   * @return {STRING}              validity message
   */
  static validateInput(userName, userUsername, userEmail, userPassword) {
    let result;
    if (userName === '' || userName === undefined) {
      result = 'Name can not be empty';
    } else if (userUsername === '' || userUsername === undefined) {
      result = 'Username can not be empty';
    } else if (userEmail === '' || userEmail === undefined) {
      result = 'Email can not be empty';
    } else if (userPassword === '' || userPassword === undefined) {
      result = 'Password can not be empty';
    } else {
      result = 'valid';
    }
    return result;
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
  signUp(userName, userUsername, userEmail, userPassword, done) {
    const validity = User.validateInput(userName, userUsername, userEmail, userPassword);
    if (validity === 'valid') {
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(userPassword, salt, (err, hash) => {
          this.Users.create({
            name: userName,
            username: userUsername,
            email: userEmail,
            password: hash
          }).then((user) => {
            done(user);
          }).catch((err) => {
            done(err.errors[0].message);
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
              done(user);
            } else {
              done('Failed, Wrong Password');
            }
          });
        }
      });
    }
  }

  /**
   * createGroup - creates a group
   *
   * @param  {STRING} groupName the Name to call the group
   * @param  {INTEGER} creator   the UserId of the group creator
   * @param  {FunctionDeclaration} done         callback function
   * @return {STRING}           result of the group creation attempt.
   */
  createGroup(groupName, creator, done) {
    if (groupName === '' || groupName === undefined) {
      done('Group Name can not be Empty');
    } else if (creator === '' || creator === undefined) {
      done('creator id can not be Empty');
    } else {
      this.Groups.findOrCreate({
        where: {
          gp_name: groupName,
          gpCreatorIdId: creator
        }
      })
      .then((group) => {
        if (group[1] === false) {
          done('Group Exists already');
        } else {
          this.GroupMembers.findOrCreate({
            where: {
              GroupId: group[0].id,
              UserId: creator,
              addedBy: creator
            }
          });
          done(group);
        }
      })
      .catch((err) => {
        done(err.name); // .errors[0].message);
      });
    }
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
        gp_name: group,
        gpCreatorIdId: creator
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
          done(err.errors[0].message);
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
    } else if (text === '' || text === undefined) {
      done('message cannot be null');
    } else {
      this.Messages.create({
        groupIdId: to,
        message: text,
        senderIdId: from,
        priority: priorityLevel
      }).then((message) => {
        done(message);
      }).catch((err) => {
        done(err);
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
}

export default User;
