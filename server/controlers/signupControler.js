import User from '../src/user';

const user = new User();
let sess;

const signupControler = (req, res) => {
  const name = req.body.name;
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  user.signUp(name, username, email, password, (result) => {
    if (typeof result !== 'object') {
      res.status(400).send(result);
    } else {
      sess = req.session;
      sess.UserId = result.id;
      sess.userName = result.username;
      res.status(200).send(result);
    }
  });
};

export default signupControler;
