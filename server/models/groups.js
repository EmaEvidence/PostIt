import Sequelize from 'sequelize';

const GroupModel = {
  gp_name: { type: Sequelize.STRING, allowNull: false },
};

export default GroupModel;
