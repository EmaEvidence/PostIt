import expect from 'expect';
import validate from '../../services/validate';
import createToken from '../../services/createToken';
import * as flatten from '../../services/flattenArray';
import notifyUsers from '../../services/notifyUsers';


describe('when an Array of JSON object with Ids as keys is supplied', () => {
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
    expect(flatten.userId(UserIdObject)).toEqual(idArray);
  });
  it('should return a Numeric array', () => {
    expect(flatten.groupId(GroupIdObject)).toEqual(idArray);
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
  const token = createToken(result);
  it('should create a json web token', () => {
    expect(typeof token).toEqual('string');
  });
});

describe('when message is sent', () => {
  const noticeCritical = notifyUsers('Critical', [{
    id: 1,
    email: 'emmanuelalabi563@gmail.com',
    phone: '07063747160' }]);
  it('should notify all users in the user object passed', () => {
    expect(noticeCritical).toEqual({ email: 'sent', phone: 'sent' });
  });
  const noticeUrgent = notifyUsers('Urgent', [{
    id: 1,
    email: 'emmanuelalabi563@gmail.com',
    phone: '07063747160' }]);
  it('should notify all users in the user object passed', () => {
    expect(noticeUrgent).toEqual({ email: 'sent' });
  });
});

describe('When a new User supplies a password', () => {
  const password = 'qwerty123@';
  const wrongPassword = '1234567890';
  const validPassword = validate(password, 1);
  const invalidPassword = validate(wrongPassword, 1);
  it('should return Error message if its in a wrong format', () => {
    expect(invalidPassword)
    .toEqual('Password Must Contain Alphabets, Numbers, Special Characters and Must be Longer than 8');
  });
  it('should return valid if its in a right format', () => {
    expect(validPassword).toEqual('valid');
  });
});
