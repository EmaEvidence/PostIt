import Sequelize from 'sequelize';
import bcrypt from 'bcrypt';
import Promise from 'bluebird';

/**
 * the user class that creates a user l
 */
class User {
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

  signUp(userName, userUsername, userEmail, userPassword, done) {
    const saltRounds = 10;
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
  }

  logIn(userName, password, done) {
    this.Users.findAll({
      where: {
        username: userName
      }
    }).then((user) => {
      if (user.length === 0) {
        done('Failed, Username not Found');
      } else {
        console.log(user[0].password);
        bcrypt.compare(password, user[0].password, (err, res) => {
          if (res) {
            console.log('successfully');
            done(user);
          } else {
            console.log('Wrong password');
            done('Failed, Wrong Password');
          }
        });
      }
    })
  }

  createGroup(groupName, creator, done) {
    if (groupName === '' || groupName === undefined) {
      console.log('Group Name can not be Empty');
      done('Group Name can not be Empty');
    } else if (creator === '' || creator === undefined) {
      console.log('creator id can not be Empty');
      done('creator id can not be Empty');
    } else {
    this.Groups.findOrCreate({
      where: {
        gp_name: groupName,
        gpCreatorIdId: creator
      }
    })
    .then((group) => {
      console.log(group);
      if (group[1] === false) {
        done('Group Exists already');
      } else {
        done(group);
      }
    })
    .catch((err) => {
      console.log(err);
      done(err.message);
    });
    }
  }

  addUsers(group, user, added, done) {
    const groupToInt = parseInt(group, 10);
    console.log(groupToInt / 2);
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
        console.log(result);
        done(result);
      }).catch((err) => {
        console.log(err);
        done(err.message);
      });
    }
  }

  static PostMessage(to, from, text, priorityLevel) {
    this.Groups.create({
      groupId: to,
      userId: from,
      message: text,
      priority: priorityLevel
    }).then((message) => {
      console.log(message);
      return 'Done';
    }).catch((err) => {
      console.log(err);
      return err;
    });
  }

  static RetrieveMessage(group, userId) {

  }
}

export default User;
