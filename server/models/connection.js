import Sequelize from 'sequelize';
import dotenv from 'dotenv';
import UserModel from './users';
import GroupModel from './groups';
import GroupMembersModel from './groupmembers';
import MessagesModel from './messages';
import NotificationModel from './notification';

dotenv.config();

let database;
if (process.env.NODE_ENV === 'test') {
  database = process.env.DB_DATABASE_TEST;
} else {
  database = process.env.DB_DATABASE;
}
const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;
const host = process.env.DB_HOST;
const sequelize = new Sequelize(`postgres://${username}:${password}${host}/${database}`);

const db = {};
db.sequelize = sequelize;
db.Sequelize = Sequelize;

const Users = sequelize.define('Users', UserModel);
db.Users = Users;
const Groups = sequelize.define('Groups', GroupModel);
db.Groups = Groups;
const GroupMembers = sequelize.define('GroupMembers', GroupMembersModel);
db.GroupMembers = GroupMembers;
const Messages = sequelize.define('Messages', MessagesModel);
db.Messages = Messages;
const Notifications = sequelize.define('Notifications', NotificationModel);
db.Notifications = Notifications;
Users.belongsToMany(Groups, { through: 'GroupMembers' });
Users.hasOne(Groups, { as: 'gp_creatorId' });
Messages.belongsTo(Groups, { as: 'group_Id' });
Messages.belongsTo(Users, { as: 'sender_Id' });
Users.hasMany(Notifications, { as: 'UserId' });
sequelize.sync({});
// sequelize.sync({ alter: true });
// sequelize.sync({ force: true });

export default db;
