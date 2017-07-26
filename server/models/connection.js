import Sequelize from 'sequelize';
import dotenv from 'dotenv';
import Users from './users';
import Groups from './groups';
import Messages from './messages';
import GroupMembers from './groupmembers';

dotenv.config();

const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;
const host = process.env.DB_HOST;
const sequelize = new Sequelize(`postgres://${username}:${password}fant.db.${host}/ldgtnhia`);

const db = {};
db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.Users = Users(sequelize, Sequelize);
db.Groups = Groups(sequelize, Sequelize);
db.Messages = Messages(sequelize, Sequelize);
db.GroupMembers = GroupMembers(sequelize, Sequelize);

db.Users.belongsToMany(db.Groups, { through: db.GroupMembers });
db.Messages.belongsTo(db.Groups, { as: 'group_Id' });
db.Messages.belongsTo(db.Users, { as: 'sender_Id' });
db.Users.hasOne(db.Groups, { as: 'gp_creatorId' });

export default db;

/* export default (sequelize, DataTypes) => {
  const Users = sequelize.define('users', {
    name: { type: DataTypes.STRING, allowNull: false },
    username: { type: DataTypes.STRING, allowNull: false, unique: true },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false }
  });
  return Users;
};
*/
