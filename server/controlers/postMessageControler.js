import User from '../src/user';

const user = new User();
let sess;

const postMessageControler = (req, res) => {
  sess = req.session;
  const groupId = req.params.groupid;
  const message = req.body.message;
  const priority = (req.body.priority) ? req.body.priority : 'Normal';
  const from = (sess.UserId) ? sess.UserId : req.body.from;
  if (sess.UserId) {
    user.postMessage(groupId, from, message, priority, (result) => {
      res.status(200).send(result);
    });
  } else {
    res.status(403).send('You are not allowed Here, Please sign.');
  }
};

export default postMessageControler;
