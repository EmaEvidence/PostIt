import expect from 'expect';
import User from '../../helpers/user';


describe('when an Array of JSON object with Ids as keys is supplied', () => {
  const idObject = [
    { UserId: 1 },
    { UserId: 2 },
    { UserId: 3 }
  ];
  const UserIdObject = [
    { id: 1 },
    { id: 2 },
    { id: 3 }
  ];
  const GroupIdObject = [
    { GroupId: 1 },
    { GroupId: 2 },
    { GroupId: 3 }
  ];
  const idArray = [1, 2, 3];
  it('should return a Numeric array', () => {
    expect(User.flattenId(idObject)).toEqual(idArray);
  });
  it('should return a Numeric array', () => {
    expect(User.flattenUserId(UserIdObject)).toEqual(idArray);
  });
  it('should return a Numeric array', () => {
    expect(User.flattenGroupId(GroupIdObject)).toEqual(idArray);
  });
});

describe('when a payload is supplied to generate json web token', () => {
  const result = {
    id: 1,
    name: 'Evidence',
    username: 'Evidence',
    phone: '07030092113',
    email: 'ema@gmail.com'
  };
  const token = User.createToken(result);
  it('should create a json web token', () => {
    expect(typeof token).toEqual('string');
  });
});

describe('when message is sent', () => {
  const noticeCritical = User.notifyUser('Critical', [{
    id: 1,
    email: 'emmanuelalabi563@gmail.com',
    phone: '07063747160' }]);
  it('should notify all users in the user object passed', () => {
    expect(noticeCritical).toEqual({ email: 'sent', phone: 'sent' });
  });
  const noticeUrgent = User.notifyUser('Urgent', [{
    id: 1,
    email: 'emmanuelalabi563@gmail.com',
    phone: '07063747160' }]);
  it('should notify all users in the user object passed', () => {
    expect(noticeUrgent).toEqual({ email: 'sent' });
  });
});
