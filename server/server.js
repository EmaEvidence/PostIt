import express from 'express';
import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import path from 'path';

import webpackConfig from '../webpack.config';
import userRouter from './routes/user';
import groupRouter from './routes/group';

const app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  next();
});

if (process.env.NODE_ENV !== 'test') {
  app.use(webpackMiddleware(webpack(webpackConfig)));
  app.use(webpackHotMiddleware(webpack(webpackConfig)));
}

app.use('/', userRouter);
app.use('/', groupRouter);

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/source/index.html'));
});

let server;
if (process.env.NODE_ENV !== 'test') {
  server = app.listen(process.env.PORT || 3300, () => {
  });
} else {
  server = app.listen(process.env.PORT || 3000, () => {
  });
}


export default server;
