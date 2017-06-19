import Sequelize from 'sequelize';
import bcrypt from 'bcrypt';

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
    const username = 'ldgtnhia';
    const password = 'eD38PggvdWn9EVRdZi12DuhwrfECTqo8@pelle';
    const host = 'elephantsql.com:5432';
    this.sequelize = new Sequelize(`postgres://${username}:${password}fant.db.${host}/ldgtnhia`);
    this.sequelize.authenticate()
    .then(() => {
      console.log('Connection has been established successfully.');
    })
    .catch((err) => {
      console.log(err);
      console.log('Unable to connect to the database:', err);
    });
    const Users = this.sequelize.define('Users', {
      name: { type: Sequelize.STRING, allowNull: false },
      username: { type: Sequelize.STRING, allowNull: false, unique: true },
      email: { type: Sequelize.STRING, allowNull: false, unique: true },
      password: { type: Sequelize.STRING, allowNull: false }
    });
    this.Users = Users;

    const Groups = this.sequelize.define('Groups', {
      gp_name: { type: Sequelize.STRING, allowNull: false },
    });
    this.Groups = Groups;
    Users.hasOne(Groups, { as: 'gp_creatorId' });
    const GroupMembers = this.sequelize.define('GroupMembers', {
      addedBy: { type: Sequelize.INTEGER, allowNull: false }
    });
    this.GroupMembers = GroupMembers;
    Users.belongsToMany(Groups, { through: 'GroupMembers' });

    const Messages = this.sequelize.define('Messages', {
      message: { type: Sequelize.TEXT, allowNull: false },
      priority: { type: Sequelize.STRING, allowNull: false }
    });
    this.Messages = Messages;
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
    const saltRounds = 10;
    const validity = User.validateInput(userName, userUsername, userEmail, userPassword);
    if (validity === 'valid') {
      bcrypt.hash(userPassword, saltRounds, (err, hash) => {
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
    } else {
      done(validity);
    }
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
          done(group);
        }
      })
      .catch((err) => {
        done(err.name); // .errors[0].message);
      });
    }
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
        done(err.errors[0].message);
      });
    }
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
    } else if (priorityLevel === '' || priorityLevel === undefined) {
      done('priority cannot be null');
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
}

export default User;
