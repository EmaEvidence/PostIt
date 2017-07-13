import User from '../src/user';

const user = new User();

const deleteUserControler = (req, res) => {
  const userId = req.body.ema;
  user.deleteUserss(userId, (result) => {
    if (result === 1) {
      res.status(200).send('Deleted');
    }
  });
};

export default deleteUserControler;
