import Sequelize from 'sequelize';

const GroupsModel = {
  groupName: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: {
      isAlphanumeric: {
        arg: true,
        msg: 'Group name can Only contain Alphabets&Numbers with no empty space'
      }
    }
  },
};

export default GroupsModel;
