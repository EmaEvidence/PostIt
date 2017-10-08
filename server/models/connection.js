import Sequelize from 'sequelize';
import dotenv from 'dotenv';

import UsersModel from './UsersModel';
import GroupsModel from './GroupsModel';
import GroupMembersModel from './GroupMembersModel';
import MessagesModel from './MessagesModel';
import NotificationModel from './NotificationModel';

dotenv.config();

let dataBase, sequelize;
const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;
const host = process.env.DB_HOST;
let sequelizeConfig;
if (process.env.NODE_ENV === 'test') {
  sequelize = new Sequelize('postgres://postgres@localhost/postItTest');
} else if (process.env.NODE_ENV === 'development') {
  dataBase = process.env.DB_DATABASE_LOCAL;
  sequelizeConfig = `postgres://${username}:${password}${host}/${dataBase}`;
  sequelize = new Sequelize(sequelizeConfig);
} else {
  dataBase = process.env.DB_DATABASE;
  sequelizeConfig = `postgres://${username}:${password}${host}/${dataBase}`;
  sequelize = new Sequelize(sequelizeConfig);
}

const database = {};
database.sequelize = sequelize;
database.Sequelize = Sequelize;

const Users = sequelize.define('Users', UsersModel);
database.Users = Users;
const Groups = sequelize.define('Groups', GroupsModel);
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
