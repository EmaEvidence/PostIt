import User from '../src/user';

const user = new User();
let sess;

const getUserGroupsControler = (req, res) => {
  sess = req.session;
  const userId = sess.UserId;
  if (userId) {
    user.getUserGroups(userId, (result) => {
      res.status(200).send(result);
    });
  } else {
    res.status(403).send('You are not allowed Here, Please sign.');
  }
};

export default getUserGroupsControler;
