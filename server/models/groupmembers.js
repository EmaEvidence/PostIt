import Sequelize from 'sequelize';

const GroupMembersModel = {
  addedBy: { type: Sequelize.INTEGER, allowNull: false }
};

export default GroupMembersModel;
