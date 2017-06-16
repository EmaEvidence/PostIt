import express from 'express';
import bodyParser from 'body-parser';
import validator from 'express-validator';
import User from './post';


const user = new User();
const Router = express.Router();
Router.use(bodyParser.json());
Router.use(bodyParser.urlencoded({ extended: true }));
Router.use(validator());


Router.post('/api/user/signup', (req, res) => {
  const name = req.body.name;
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  user.signUp(name, username, email, password, (result) => {
    console.log(result);
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
      res.send(result);
    });
  }
});

Router.post('/api/group', (req, res) => {
  const me = user.createGroup();
  res.send(me);
});

Router.post('/api/group/group id/user', (req, res) => {
  const me = user.createGroup();
  res.send(me);
});

export default Router;
