import expect from 'expect';
import User from '../../helpers/User';

const user = new User();
let newUserId;

describe('When a new User signs up', () => {
  let result;
  const name = '';
  const username = '';
  const email = '';
  const password = '';
  const phone = '';
  beforeEach((done) => {
    user.signUp(name, username, email, password, phone, (response) => {
      result = response;
      done();
    }, 10000);
  }, 10000);
  it('should return error message if phone number is not specified ',
  (done) => {
    expect(result)
    .toEqual('Invalid Phone Number');
    done();
  }, 10000);
});

describe('When a new User signs up', () => {
  let result;
  const name = 'Ema Ala';
  const username = 'Evidence';
  const email = 'emmanuelalabi563@gmail.com';
  const password = 'qwerty123@';
  const phone = '07063707060';

  let userId;

  beforeEach((done) => {
    user.signUp(name, username, email, password, phone, (response) => {
      result = response;
      done();
    }, 10000);
  }, 10000);

  it('should return a JSON object of the User if the details are correct',
  (done) => {
    expect(typeof result).toEqual('object');
    expect(result.user.username).toEqual('Evidence');
    expect(result.user.name).toEqual('Ema Ala');
    expect(result.user.phone).toEqual('07063707060');
    done();
  }, 3000);

  let error;
  beforeEach((done) => {
    user.signUp(name, username, email, password, phone, (response) => {
      error = response;
      done();
    }, 10000);
  }, 10000);

  it('should return Error if the username exist', (done) => {
    expect(error).toEqual('username must be unique');
    done();
  }, 3000);

  let emailError;
  beforeEach((done) => {
    user.signUp(name, 'Evi', email, password, phone, (response) => {
      emailError = response;
      done();
    }, 10000);
  }, 10000);

  it('should return Error if the email exist', (done) => {
    expect(emailError).toEqual('email must be unique');
    done();
  }, 3000);

  let signInResult;
  beforeEach((done) => {
    user.logIn('Evidenc', 'qwerty123@', (response) => {
      signInResult = response;
      done();
    }, 10000);
  }, 10000);

  it('should return Error if the user signs in with wrong details after signing up',
  (done) => {
    expect(signInResult).toEqual('Failed, User not found');
    done();
  }, 3000);

  let signInResult2;
  beforeEach((done) => {
    user.logIn('Evidence', 'qwerty123', (response) => {
      signInResult2 = response;
      done();
    }, 10000);
  }, 10000);

  it('should return Error if the user signs in with wrong details after signing up',
  (done) => {
    expect(signInResult2).toEqual('Failed, User not found');
    done();
  }, 3000);

  let signedIn;
  beforeEach((done) => {
    user.logIn('Evidence', 'qwerty123@', (response) => {
      signedIn = response;
      userId = signedIn.user.id;
      done();
    }, 10000);
  }, 10000);

  it('should return user object when he signs in with correct details after signing up',
  (done) => {
    expect(typeof signedIn).toEqual('object');
    expect(signedIn.user.username).toEqual('Evidence');
    expect(signedIn.user.name).toEqual('Ema Ala');
    expect(signedIn.user.phone).toEqual('07063707060');
    done();
  }, 3000);


  let group;
  let groupId;
  beforeEach((done) => {
    user.createGroup('Andela', userId, 'Evidence', (response) => {
      group = response;
      groupId = response.id;
      done();
    }, 3000);
  }, 3000);
  it('should return "Andela" as the group name when the user creates a group with correct details',
  (done) => {
    expect(group.groupName).toEqual('Andela');
    done();
  }, 3000);

  let postResult;
  beforeEach((done) => {
    user.postMessage(groupId, 'Evidence', userId, 'Hello Everyone', 'Normal',
    (response) => {
      postResult = response;
    }, 3000);
    done();
  });
  it('should return message object when a signed user posts message to a group',
   (done) => {
     expect((postResult).message).toEqual('Hello Everyone');
     expect((postResult).priority).toEqual('Normal');
     expect((postResult).senderUsername).toEqual('Evidence');
     done();
   }, 3000);

  afterEach((done) => {
    user.deleteUsers(email, () => {
      user.deleteGroupByName('Andela', () => {
        user.deleteUserFromGroup(groupId, newUserId, userId, () => {
        });
      });
    });
    done();
  }, 1000);
});
