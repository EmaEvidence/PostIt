import Sequelize from 'sequelize';

const GroupMembers = Sequelize.define('GroupMembers', {
  addedBy: { type: Sequelize.INTEGER, allowNull: false }
});

export default GroupMembers;
