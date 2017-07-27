import express from 'express';
import session from 'express-session';
import Router from './src/route';

const app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});
app.use(session({ secret: 'ssshhhhh' }));
app.use('/', Router);


const server = app.listen(process.env.PORT || 3300, () => {
  console.log('We are live');
});

export default server;
