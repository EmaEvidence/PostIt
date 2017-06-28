import Sequelize from 'sequelize';

const Groups = Sequelize.define('Groups', {
  gp_name: { type: Sequelize.STRING, allowNull: false },
});

export default Groups;
