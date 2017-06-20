import Sequelize from 'sequelize';

const Messages = Sequelize.define('Messages', {
  message: { type: Sequelize.TEXT, allowNull: false },
  priority: { type: Sequelize.STRING, allowNull: false }
});

export default Messages;
