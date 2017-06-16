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
      gp_name: { type: Sequelize.STRING, allowNull: false, unique: true },
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
    this.sequelize.sync({ force: true });
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

  createGroup(groupName, creator) {
    this.Groups.create({
      gp_name: groupName,
      gp_creatorId: creator
    }).then((group) => {
      console.log(group);
      return 'Done';
    }).catch((err) => {
      console.log(err);
      return err;
    });
  }

  addUsers(group, idOfUserAdding, idOfUserToAdd) {
// will create a oject mapped with memberId the value will be either successfully or Failed
// this will e the returned value
    this.Groups.create({
      groupId: group,
      memberId: idOfUserToAdd,
      addedBy: idOfUserAdding
    }).then(member => {
      console.log(member);
      return 'Done';
    }).catch((err) => {
      console.log(err);
      return err;
    });
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
