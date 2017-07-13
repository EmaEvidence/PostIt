import User from '../src/user';

const user = new User();
let sess;

const addUserControler = (req, res) => {
  const groupId = req.params.groupid;
  const userId = req.body.user;
  sess = req.session;
  const userAdding = sess.UserId;
  if (sess.UserId) {
    user.addUsers(groupId, userId, userAdding, (result) => {
      if (typeof result === 'string') {
        res.status(400).send(result);
      } else {
        res.status(200).send(result);
      }
    });
  } else {
    res.status(403).send('You are not allowed Here, Please sign.');
  }
};

export default addUserControler;
