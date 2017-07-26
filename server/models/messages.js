import Sequelize from 'sequelize';

const MessagesModel = {
  message: { type: Sequelize.TEXT, allowNull: false },
  priority: { type: Sequelize.STRING, allowNull: false }
};

export default MessagesModel;
