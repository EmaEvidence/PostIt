import express from 'express';
import bodyParser from 'body-parser';
import validator from 'express-validator';
import User from './user';


const user = new User();
const Router = express.Router();
Router.use(bodyParser.json());
Router.use(bodyParser.urlencoded({ extended: true }));
Router.use(validator());
let sess;


/**
 * result - description
 *
 * @param  {type} typeof result !== 'object' description
 * @return {type}                            description
 */
Router.post('/api/user/signup', (req, res) => {
  const name = req.body.name;
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  user.signUp(name, username, email, password, (result) => {
    if (typeof result !== 'object') {
      res.status(400).send(result);
    } else {
      sess = req.session;
      sess.UserId = result.id;
      sess.userName = result.username;
      res.status(200).send(result);
    }
  });
});

Router.post('/api/user/signin', (req, res) => {
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
        res.status(404).send(result);
      } else {
        sess = req.session;
        sess.UserId = result[0].id;
        sess.userName = result[0].username;
        res.status(200).send(result);
      }
    });
  }
});

Router.post('/api/group', (req, res) => {
  sess = req.session;
  const gpName = req.body.gpname;
  const userId = sess.UserId;
  console.log(userId);
  if (userId) {
    user.createGroup(gpName, userId, (result) => {
      console.log(result);
      res.status(200).send(result);
    });
  } else {
    res.status(403).send('You are not allowed Here, Please sign.');
  }
});

Router.post('/api/group/:groupid/user', (req, res) => {
  const groupId = req.params.groupid;
  const userId = req.body.user;
  sess = req.session;
  const userAdding = sess.UserId;
  if (sess.UserId) {
    user.addUsers(groupId, userId, userAdding, (result) => {
      if (typeof result === 'string') {
        res.status(400).send(result);
      } else {
        res.status(200).send(result);
      }
    });
  } else {
    res.status(403).send('You are not allowed Here, Please sign.');
  }
});

Router.post('/api/group/:groupid/message', (req, res) => {
  sess = req.session;
  const groupId = req.params.groupid;
  const message = req.body.message;
  const priority = req.body.priority;
  const from = (sess.UserId) ? sess.UserId : req.body.from;
  if (sess.UserId) {
    user.postMessage(groupId, from, message, priority, (result) => {
      res.send(result);
      res.status(200).send(result);
    });
  } else {
    res.status(403).send('You are not allowed Here, Please sign.');
  }
});

Router.get('/api/group/:groupid/messages', (req, res) => {
  sess = req.session;
  const groupId = req.params.groupid;
  const userId = sess.UserId;
  if (userId) {
    console.log(parseInt(groupId, 10));
    user.retrieveMessage(groupId, (result) => {
      console.log(result);
      res.send(result);
      res.status(200).send(result);
    });
  } else {
    res.status(403).send('You are not allowed Here, Please sign.');
  }
});

Router.post('/api/delete', (req, res) => {
  const ema = req.body.ema;
  console.log(ema);
  console.log(12345);
  user.deleteUserss(ema, (result) => {
    console.log(result);
    if (result === 1) {
      res.status(200).send('Deleted');
    }
  });
});

export default Router;
