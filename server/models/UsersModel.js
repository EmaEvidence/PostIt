import Sequelize from 'sequelize';

const Users = {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        args: true,
        msg: 'Name can not be empty'
      }
    }
  },
  username: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isAlphanumeric: {
        args: true,
        msg: 'Username can not be empty and can only be Alphabets and Numbers'
      }
    }
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: {
        args: true,
        msg: 'Please supply a valid Email'
      }
    }
  },
  password: {
    type: Sequelize.STRING,
    allowNull: true
  },
  phone: {
    type: Sequelize.STRING,
    allowNull: true,
    unique: true,
  },
  authType: {
    type: Sequelize.STRING,
    defaultValue: 'Normal'
  }
};

export default Users;
