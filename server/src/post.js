import Sequelize from 'sequelize';
import bcrypt from 'bcrypt';
import Promise from 'bluebird';

/**
 * the user class that creates a user l
 */
class User {
  constructor() {
    this.Loginres = '';
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
      name: { type: Sequelize.STRING, allowNull: false, unique: true },
      userId: { type: Sequelize.INTEGER, allowNull: false }
    });
    this.Groups = Groups;

    const GroupMembers = this.sequelize.define('GroupMembers', {
      groupId: { type: Sequelize.INTEGER, allowNull: false },
      userId: { type: Sequelize.INTEGER, allowNull: false }
    });
    this.GroupMembers = GroupMembers;

    const Messages = this.sequelize.define('Messages', {
      groupId: { type: Sequelize.INTEGER, allowNull: false },
      userId: { type: Sequelize.INTEGER, allowNull: false },
      message: { type: Sequelize.TEXT, allowNull: false },
      priority: { type: Sequelize.STRING, allowNull: false }
    });
    this.Messages = Messages;
  }
  static respond(data){
    console.log('12345');
    return data;
  }
  signUp(userName, userUsername, userEmail, userPassword) {
    const saltRounds = 10;
    bcrypt.hash(userPassword, saltRounds, (err, hash) => {
      this.sequelize.sync({}).then(() => {
        this.Users.create({
          name: userName,
          username: userUsername,
          email: userEmail,
          password: hash
        }).then(user => {
          //console.log('Done');
          this.Loginres = user;
          User.respond(user);
          return 'Done';
        }).catch((err) => {
        //console.log(err);
          return err;
        });
        return 'We are good';
      });
    });
    return this.Loginres;
  }

  LogIn(userName, password) {
    this.sequelize.sync({}).then(() => {
      this.Users.findAll({
        where: {
          username: userName
        }
      }).then((user) => {
        if (user.length === 0) {
          console.log('Failed');
          return 'Failed, Username not Found';
        } else {
          console.log(user[0].password);
          bcrypt.compare(password, user[0].password, (err, res) => {
            if (res) {
              console.log('successfully');
              return user;
            } else {
              console.log('Wrong password');
              return 'Failed, Wrong Password';
            }
          });
        }
      }).catch((err) => {
        console.log(err);
      });
    });
  }

  createGroup(groupName, creator) {
    this.sequelize.sync({}).then(() => {
      this.Groups.create({
        name: groupName,
        userId: creator
      }).then(group => {
        console.log(group);
        return 'Done';
      }).catch((err) => {
      //console.log(err);
        return err;
      });
    });
  }

  static addUsers() {
    /* when the add button is clicked the id of the user will b
     * e saved into an array clicking done will then loop through it and
    //save it into the db.
     if created the ouser */
  }

  static PostMessage() {
  }

  static RetrieveMessage() {

  }
}

export default User;
