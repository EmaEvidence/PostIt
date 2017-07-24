import Sequelize from 'sequelize';

const GroupModel = {
  group_name: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: {
      isAlphanumeric: {
        arg: true,
        msg: 'Group name can Only contain Alphabets, Numbers and can not be Empty.'
      }
    }
  },
};

export default GroupModel;
