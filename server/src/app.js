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


Router.post('/api/user/signup', (req, res) => {
  const name = req.body.name;
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  user.signUp(name, username, email, password, (result) => {
    console.log(result);
    sess = req.session;
    sess.UserId = result.id;
    sess.userName = result.username;
    res.send(result);
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
  user.createGroup(gpName, 1, (result) => {
    console.log(result[1]);
    if (result[1] === false) {
      res.send('Group Exists already');
    } else {
      res.send(result);
    }
  });
});

Router.post('/api/group/group id/user', (req, res) => {
  const me = user.createGroup();
  res.send(me);
});

export default Router;
