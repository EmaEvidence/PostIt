import User from '../src/user';

const user = new User();
let sess;

const getGroupUsersControler = (req, res) => {
  const groupId = req.params.groupid;
  sess = req.session;
  const userAdding = sess.UserId;
  if (sess.UserId) {
    user.getGroupMembers(groupId, (result) => {
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

export default getGroupUsersControler;
