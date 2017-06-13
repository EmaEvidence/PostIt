import express from 'express';
import Sequelize from 'sequelize';
import Router from './src/app';

const app = express();
app.use('/', Router);

const server = app.listen(process.env.PORT || 3000, () => {
  console.log('We are live');
});

export default server;
