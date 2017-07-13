import User from '../src/user';

const user = new User();
let sess;

const getGroupMessagesControler = (req, res) => {
  sess = req.session;
  const groupId = req.params.groupid;
  const userId = sess.UserId;
  if (userId) {
    user.retrieveMessage(groupId, (result) => {
      res.status(200).send(result);
    });
  } else {
    res.status(403).send('You are not allowed Here, Please sign.');
  }
};

export default getGroupMessagesControler;
