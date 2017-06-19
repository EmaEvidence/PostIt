import express from 'express';
import bodyParser from 'body-parser';
import validator from 'express-validator';
import User from './post';


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
    console.log(result);
    if (typeof result !== 'object') {
      res.send(result);
    } else {
      sess = req.session;
      sess.UserId = result.id;
      sess.userName = result.username;
      res.send(result);
    }
  });
});

Router.post('/api/user/signin', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  if (username === undefined || username === '') {
    res.send('Username can not be empty');
  } else if (password === undefined || password === '') {
    res.send('Password can not be empty');
  } else {
    user.logIn(username, password, (result) => {
      sess = req.session;
      sess.UserId = result[0].id;
      sess.userName = result[0].username;
      res.send(result);
    });
  }
});

Router.post('/api/group', (req, res) => {
  sess = req.session;
  const gpName = req.body.gpname;
  const userId = sess.UserId;
  console.log(userId);
  user.createGroup(gpName, userId, (result) => {
    console.log(result);
    res.send(result);
  });
});

Router.post('/api/group/:groupid/user', (req, res) => {
  const groupId = req.params.groupid;
  const userId = req.body.user;
  console.log(userId);
  user.addUsers(groupId, userId, 1, (result) => {
    console.log(result);
    res.send(result);
  });
});

Router.post('/api/group/:groupid/message', (req, res) => {
  sess = req.session;
  const groupId = req.params.groupid;
  const message = req.body.message;
  const priority = req.body.priority;
  const from = (sess.UserId) ? sess.UserId : req.body.from;
  console.log(req.params.groupid);
  user.postMessage(groupId, from, message, priority, (result) => {
    console.log(result);
    res.send(result);
  });
});

Router.get('/api/group/:groupid/messages', (req, res) => {
  const groupId = req.params.groupid;
  console.log(parseInt(groupId, 10));
  user.retrieveMessage(groupId, (result) => {
    console.log(result);
    res.send(result);
  });
});

export default Router;
