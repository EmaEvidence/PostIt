import Sequelize from 'sequelize';

const GroupMembersModel = {
  id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
  addedBy: { type: Sequelize.INTEGER, allowNull: false }
};

export default GroupMembersModel;
