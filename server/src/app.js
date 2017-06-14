import express from 'express';
import bodyParser from 'body-parser';
import User from './post';

const user = new User();
const Router = express.Router();
Router.use(bodyParser.json());
Router.use(bodyParser.urlencoded({ extended: true }));


Router.post('/api/user/signup', (req, res) => {
  const name = req.body.name;
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  //console.log(name);
  const me = user.signUp(name, username, email, password);
  console.log(me);
  res.send(me);
});

Router.post('/api/user/signin', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const me = user.LogIn(username, password);
  res.send(me);
});

export default Router;
