import express from 'express';
import bodyParser from 'body-parser';
import User from './post';

const user = new User();
const Router = express.Router();
Router.use(bodyParser.json());
Router.use(bodyParser.urlencoded({ extended: true }));


Router.get('/', (req, res) => {
  res.send('Welcome');
});

export default Router;
