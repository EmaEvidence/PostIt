import Sequelize from 'sequelize';
import bcrypt from 'bcrypt';

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
  }
  static encryptPassword(data) {
    let encryptedPassword = '';
    const saltRounds = 10;
    bcrypt.genSalt(saltRounds, (err, salt) => {
      bcrypt.hash(data, salt, (err, hash) => {
        encryptedPassword = hash;
        console.log(encryptedPassword);
        return encryptedPassword;
      });
    });
  }
  signUp(userName, userUsername, userEmail, userPassword) {
    this.sequelize.sync({}).then((err) => {
    // insert new user
    this.Users.create({
      name: userName,
      username: userUsername,
      email: userEmail,
      password: userPassword
    }).then((user) => {
      console.log('Done');
    }).catch((err) =>{
      console.log('err');
    });
});
  }

  static LogIn(){
  }

  static createGroup(){
  }

  static addUsers(){
    /* when the add button is clicked the id of the user will b
     * e saved into an array clicking done will then loop through it and
    //save it into the db.
     if created the ouser */
  }

  static PostMessage(){
  }

  static RetrieveMessage(){

  }
}

export default User;
