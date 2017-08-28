import express from 'express';
import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import path from 'path';

import webpackConfig from '../webpack.config';
import Router from './src/route';

const app = express();

app.use((req, res, next) => {
  // res.header('Access-Control-Allow-Origin', '*');
  // res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  // next();
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  next();
});

if (process.env.NODE_ENV !== 'test') {
  app.use(webpackMiddleware(webpack(webpackConfig)));
  app.use(webpackHotMiddleware(webpack(webpackConfig)));
}

app.use('/', Router);

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/src/index.html'));
});


const server = app.listen(process.env.PORT || 3300, () => {
  console.log('We are live');
});

export default server;
