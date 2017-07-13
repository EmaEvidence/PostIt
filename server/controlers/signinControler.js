import User from '../src/user';

const user = new User();
let sess;

const signinControler = (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  if (username === undefined || username === '') {
    res.send(400, 'Username can not be empty');
  } else if (password === undefined || password === '') {
    res.send(400, 'Password can not be empty');
  } else {
    user.logIn(username, password, (result) => {
      if (result === 'Failed, Wrong Password' ||
        result === 'Failed, Username not Found') {
        res.status(404).send(result);
      } else {
        sess = req.session;
        sess.UserId = result[0].id;
        sess.userName = result[0].username;
        res.status(200).send(result);
      }
    });
  }
};

export default signinControler;
