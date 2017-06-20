import express from 'express';
import session from 'express-session';
import Router from './src/route';

const app = express();
app.use(session({ secret: 'ssshhhhh' }));
app.use('/', Router);

const server = app.listen(process.env.PORT || 3000, () => {
  console.log('We are live');
});

export default server;
