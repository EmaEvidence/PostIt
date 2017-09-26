import Sequelize from 'sequelize';
import dotenv from 'dotenv';

import UserModel from './Users';
import GroupModel from './Groups';
import GroupMembersModel from './GroupMembers';
import MessagesModel from './Messages';
import NotificationModel from './Notification';

dotenv.config();

let dataBase, sequelize;
const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;
const host = process.env.DB_HOST;
if (process.env.NODE_ENV === 'test') {
  sequelize = new Sequelize(process.env.TRAVIS_TEST);
} else if (process.env.NODE_ENV === 'development') {
  dataBase = process.env.DB_DATABASE_LOCAL;
  sequelize = new Sequelize(`postgres://${username}:${password}${host}/${dataBase}`);
} else {
  dataBase = process.env.DB_DATABASE;
  sequelize = new Sequelize(`postgres://${username}:${password}${host}/${dataBase}`);
}
const database = {};
database.sequelize = sequelize;
database.Sequelize = Sequelize;

const Users = sequelize.define('Users', UserModel);
database.Users = Users;
const Groups = sequelize.define('Groups', GroupModel);
database.Groups = Groups;
const GroupMembers = sequelize.define('GroupMembers', GroupMembersModel);
database.GroupMembers = GroupMembers;
const Messages = sequelize.define('Messages', MessagesModel);
database.Messages = Messages;
const Notifications = sequelize.define('Notifications', NotificationModel);
database.Notifications = Notifications;
Users.belongsToMany(Groups, { through: 'GroupMembers' });
Groups.belongsToMany(Users, { through: 'GroupMembers' });
Users.hasOne(Groups, {
  foreignKey: 'groupCreatorId',
  as: 'users'
});
Messages.belongsTo(Groups, {
  foreignKey: 'groupId',
  as: 'group'
});
Messages.belongsTo(Users, {
  foreignKey: 'senderId',
  as: 'sender'
});
Users.hasMany(Notifications, {
  foreignKey: 'UserId',
  as: 'notifications'
});
sequelize.sync({});

export default database;
