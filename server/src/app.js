import express from 'express';
import User from './post';

const user = new User();
const Router = express.Router();

Router.get('/', (req, res) => {
  res.send('Welcome');
});

export default Router;
