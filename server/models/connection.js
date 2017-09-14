import Sequelize from 'sequelize';
import dotenv from 'dotenv';
import UserModel from './Users';
import GroupModel from './Groups';
import GroupMembersModel from './GroupMembers';
import MessagesModel from './Messages';
import NotificationModel from './Notification';

dotenv.config();

let dataBase, username, password, host, sequelize;
if (process.env.NODE_ENV === 'test') {
  sequelize = new Sequelize('postgres://postgres@localhost/postit_test');
} else {
  dataBase = process.env.DB_DATABASE;
  username = process.env.DB_USERNAME;
  password = process.env.DB_PASSWORD;
  host = process.env.DB_HOST;
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

export default database;
