import Sequelize from 'sequelize';

class User {
  constructor() {
    const username = 'ldgtnhia';
    const password = 'eD38PggvdWn9EVRdZi12DuhwrfECTqo8@pelle';
    const host = 'elephantsql.com:5432';
    const sequelize = new Sequelize(`postgres://${username}:${password}fant.db.${host}/ldgtnhia`);
    sequelize.authenticate()
    .then(() => {
      console.log('Connection has been established successfully.');
    })
    .catch((err) => {
      console.log('Unable to connect to the database:', err);
    });
    const User = sequelize.define('User', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        unique: true,
        defaultValue: 1,
        primaryKey: true
      },
      name: { type: Sequelize.STRING, allowNull: false },
      username: { type: Sequelize.STRING, allowNull: false, unique: true },
      email: { type: Sequelize.STRING, allowNull: false, unique: true },
      password: { type: Sequelize.STRING, allowNull: false }
    });
  }
  static encryptPassword(data) {
    return data;
  }
  static signUp(userName, userUsername, userEmail, password) {
    const encryptedPassword = User.eencryptPassword(password);
    this.sequelize.sync().then(() => {
      User.create({
        name: userName,
        username: userUsername,
        email: userEmail,
        password: encryptedPassword
      }).then((user) => {
        console.log(user);
      });
    }).catch((err) => {
      console.log(err);
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
