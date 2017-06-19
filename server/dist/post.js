'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _sequelize = require('sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * the user class that creates a user
 */
var User = function () {
  /**
   * constructor - creates models for the class and initiates Connection to the
   * database whenever the class is called.
   *
   * @return {STRING} Connection status message
   */
  function User() {
    _classCallCheck(this, User);

    var username = 'ldgtnhia';
    var password = 'eD38PggvdWn9EVRdZi12DuhwrfECTqo8@pelle';
    var host = 'elephantsql.com:5432';
    this.sequelize = new _sequelize2.default('postgres://' + username + ':' + password + 'fant.db.' + host + '/ldgtnhia');
    this.sequelize.authenticate().then(function () {
      console.log('Connection has been established successfully.');
    }).catch(function (err) {
      console.log(err);
      console.log('Unable to connect to the database:', err);
    });
    var Users = this.sequelize.define('Users', {
      name: { type: _sequelize2.default.STRING, allowNull: false },
      username: { type: _sequelize2.default.STRING, allowNull: false, unique: true },
      email: { type: _sequelize2.default.STRING, allowNull: false, unique: true },
      password: { type: _sequelize2.default.STRING, allowNull: false }
    });
    this.Users = Users;

    var Groups = this.sequelize.define('Groups', {
      gp_name: { type: _sequelize2.default.STRING, allowNull: false }
    });
    this.Groups = Groups;
    Users.hasOne(Groups, { as: 'gp_creatorId' });
    var GroupMembers = this.sequelize.define('GroupMembers', {
      addedBy: { type: _sequelize2.default.INTEGER, allowNull: false }
    });
    this.GroupMembers = GroupMembers;
    Users.belongsToMany(Groups, { through: 'GroupMembers' });

    var Messages = this.sequelize.define('Messages', {
      message: { type: _sequelize2.default.TEXT, allowNull: false },
      priority: { type: _sequelize2.default.STRING, allowNull: false }
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


  _createClass(User, [{
    key: 'signUp',


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
    value: function signUp(userName, userUsername, userEmail, userPassword, done) {
      var _this = this;

      var saltRounds = 10;
      var validity = User.validateInput(userName, userUsername, userEmail, userPassword);
      if (validity === 'valid') {
        _bcrypt2.default.hash(userPassword, saltRounds, function (err, hash) {
          _this.Users.create({
            name: userName,
            username: userUsername,
            email: userEmail,
            password: hash
          }).then(function (user) {
            done(user);
          }).catch(function (err) {
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

  }, {
    key: 'logIn',
    value: function logIn(userName, password, done) {
      if (userName === undefined || userName === '') {
        done('Username can not be empty');
      } else if (password === undefined || password === '') {
        done('Password can not be empty');
      } else {
        this.Users.findAll({
          where: {
            username: userName
          }
        }).then(function (user) {
          if (user.length === 0) {
            done('Failed, Username not Found');
          } else {
            _bcrypt2.default.compare(password, user[0].password, function (err, res) {
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

  }, {
    key: 'createGroup',
    value: function createGroup(groupName, creator, done) {
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
        }).then(function (group) {
          if (group[1] === false) {
            done('Group Exists already');
          } else {
            done(group);
          }
        }).catch(function (err) {
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

  }, {
    key: 'addUsers',
    value: function addUsers(group, user, added, done) {
      var groupToInt = parseInt(group, 10);
      var userToInt = parseInt(user, 10);
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
        }).then(function (result) {
          if (result[1] === false) {
            done('User is already a member');
          } else {
            done(result);
          }
        }).catch(function (err) {
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

  }, {
    key: 'postMessage',
    value: function postMessage(to, from, text, priorityLevel, done) {
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
        }).then(function (message) {
          done(message);
        }).catch(function (err) {
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

  }, {
    key: 'retrieveMessage',
    value: function retrieveMessage(group, done) {
      this.Messages.findAll({
        where: {
          groupIdId: group
        }
      }).then(function (messages) {
        done(messages);
      }).catch(function (err) {
        done(err);
      });
    }
  }], [{
    key: 'validateInput',
    value: function validateInput(userName, userUsername, userEmail, userPassword) {
      var result = void 0;
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
  }]);

  return User;
}();

exports.default = User;