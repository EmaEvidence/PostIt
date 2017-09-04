import Sequelize from 'sequelize';
import dotenv from 'dotenv';
import UserModel from './Users';
import GroupModel from './Groups';
import GroupMembersModel from './GroupMembers';
import MessagesModel from './Messages';
import NotificationModel from './Notification';

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
let sequelize;
if (process.env.NODE_ENV === 'test') {
  sequelize = new Sequelize('postgres://ldgtnhia:eD38PggvdWn9EVRdZi12DuhwrfECTqo8@pellefant.db.elephantsql.com:5432/ldgtnhia');
} else {
  sequelize = new Sequelize(`postgres://${username}:${password}${host}/${database}`);
}
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
Groups.belongsToMany(Users, { through: 'GroupMembers' });
Users.hasOne(Groups, {
  foreignKey: 'gpCreatorIdId',
  as: 'users'
});
Messages.belongsTo(Groups, {
  foreignKey: 'groupIdId',
  as: 'group'
});
Messages.belongsTo(Users, {
  foreignKey: 'senderIdId',
  as: 'sender'
});
Users.hasMany(Notifications, {
  foreignKey: 'UserId',
  as: 'notifications'
});
sequelize.sync({});
// sequelize.sync({ alter: true });
// sequelize.sync({ force: true });

export default db;
