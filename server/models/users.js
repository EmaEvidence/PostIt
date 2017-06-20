import Sequelize from 'sequelize';

const Users = Sequelize.define('Users', {
  name: { type: Sequelize.STRING, allowNull: false },
  username: { type: Sequelize.STRING, allowNull: false, unique: true },
  email: { type: Sequelize.STRING, allowNull: false, unique: true },
  password: { type: Sequelize.STRING, allowNull: false }
});

export default Users;
