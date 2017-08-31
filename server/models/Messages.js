import Sequelize from 'sequelize';

const MessagesModel = {
  message: { type: Sequelize.TEXT, allowNull: false },
  priority: { type: Sequelize.STRING, allowNull: false },
  views: { type: Sequelize.ARRAY(Sequelize.TEXT) }
};

export default MessagesModel;
