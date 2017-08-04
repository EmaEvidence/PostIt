import jwt from 'jsonwebtoken';
import User from '../src/user';

const user = new User();

const controler = {
  addUserControler: (req, res) => {
    const groupId = req.params.groupid;
    const usersToAdd = req.body.user;
    const userAdding = req.token.data.id;
    user.addUsers(groupId, usersToAdd, userAdding, (result) => {
      if (typeof result === 'string') {
        if (result.search('UserId') >= 0) {
          res.status(400).json({
            message: 'User Does not exist'
          });
        } else if (result.search('GroupId') >= 0) {
          res.status(400).json({
            message: 'Group Does not exist'
          });
        }
        res.status(400).json({
          message: result
        });
      } else {
        res.status(200).json({
          data: result,
          message: 'Added Successfully'
        });
      }
    });
  },
  createGroupControler: (req, res) => {
    const gpName = req.body.gpname;
    let users = req.body.users;
    const userId = req.token.data.id;
    if (typeof users === 'string') {
      users = users.replace(/ /g, '');
      users = users.split(',');
    }
    user.createGroup(gpName, userId, users, (result) => {
      if (typeof result === 'string') {
        res.status(400).json({
          message: result
        });
      } else {
        res.status(200).json({
          data: result,
          message: 'Group creation Successful'
        });
      }
    });
  },
  deleteUserControler: (req, res) => {
    const userId = req.body.ema;
    user.deleteUserss(userId, (result) => {
      if (result === 1) {
        res.status(200).json({
          message: 'Deleted'
        });
      }
    });
  },
  getGroupMessagesControler: (req, res) => {
    const groupId = req.params.groupid;
    const userId = req.token.data.id;
    if (isNaN(groupId) || parseInt(groupId, 10) > 10000000000) {
      res.status(400).json({
        message: 'Invalid Group Selected'
      });
    }
    user.retrieveMessage(groupId, (result) => {
      if (result.length === 0) {
        res.status(404).json({
          message: 'No Message For that Group'
        });
      } else {
        res.status(200).json({
          data: result,
          message: 'Message Retrival Successful'
        });
      }
    });
  },
  getGroupUsersControler: (req, res) => {
    const groupId = req.params.groupid;
    if (isNaN(groupId) || parseInt(groupId, 10) > 10000000000) {
      res.status(400).json({
        message: 'Invalid Group Selected'
      });
    }
    user.getGroupMembers(groupId, (result) => {
      if (typeof result === 'string' || result.length === 0) {
        res.status(404).json({
          message: 'No Such Group'
        });
      } else {
        res.status(200).json({
          data: result,
          message: 'Users Retrival Successful'
        });
      }
    });
  },
  getUserGroupsControler: (req, res) => {
    const userId = req.token.data.id;
    user.getUserGroups(userId, (result) => {
      if (result.length === 0) {
        res.status(404).json({
          message: 'No Group Yet'
        });
      }
      res.status(200).json({
        data: result,
        message: 'Group Retrival Successful'
      });
    });
  },
  postMessageControler: (req, res) => {
    const groupId = req.params.groupid;
    const message = req.body.message;
    const priority = (req.body.priority) ? req.body.priority : 'Normal';
    const from = req.token.data.id;
    user.postMessage(groupId, from, message, priority, (result) => {
      if (typeof result === 'string') {
        res.status(400).json({
          message: 'Group does not Exist'
        });
      }
      res.status(200).json({
        data: result,
        message: 'Message Added.'
      });
    });
  },
  signinControler: (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    if (username === undefined || username === '') {
      res.send(400, 'Username can not be empty');
    } else if (password === undefined || password === '') {
      res.send(400, 'Password can not be empty');
    } else {
      user.logIn(username, password, (result) => {
        if (result === 'Failed, Wrong Password' ||
          result === 'Failed, Username not Found') {
          res.status(404).json({
            message: result
          });
        } else {
          res.status(200).json({
            data: result,
            message: 'Sign In Successful'
          });
        }
      });
    }
  },
  signupControler: (req, res) => {
    const name = req.body.name;
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const phone = req.body.phone;
    user.signUp(name, username, email, password, phone, (result) => {
      if (typeof result !== 'object') {
        res.status(400).json({
          message: result
        });
      } else {
        res.status(200).json({
          data: result,
          message: 'Registration Successful'
        });
      }
    });
  },

  getAllUsersControler: (req, res) => {
    user.getAllUsers((result) => {
      res.json({
        data: result
      });
    });
  },

  ensureToken: (req, res, next) => {
    const token = req.body.token || req.params.token || req.headers.authorization;
    if (token) {
      jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
          return res.status(200).json({ message: 'Invalid token.' });
        } else {
          req.token = decoded;
          next();
        }
      });
    } else {
      return res.status(403).json({ message: 'Access Token Not Provided. Please Sign In' });
    }
  }

};

export default controler;
