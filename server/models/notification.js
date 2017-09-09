import Sequelize from 'sequelize';

const NotificationModel = {
  id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
  type: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  groupId: {
    type: Sequelize.STRING,
    allowNull: true
  },
  groupName: {
    type: Sequelize.STRING,
    allowNull: true
  },
  source: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  status: {
    type: Sequelize.STRING,
    allowNull: true,
  }
};

export default NotificationModel;
