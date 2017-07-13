import User from '../src/user';

const user = new User();
let sess;

const createGroupControler = (req, res) => {
  sess = req.session;
  const gpName = req.body.gpname;
  const userId = sess.UserId;
  if (userId) {
    user.createGroup(gpName, userId, (result) => {
      res.status(200).send(result);
    });
  } else {
    res.status(403).send('You are not allowed Here, Please sign.');
  }
};

export default createGroupControler;
