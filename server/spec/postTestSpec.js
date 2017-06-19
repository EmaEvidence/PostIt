import expect from 'expect';
import User from '../src/post';

const user = new User();

describe('When a new User signs up', () => {
  let result;
  const name = '';
  const username = '';
  const email = '';
  const password = '';
  beforeEach((done) => {
    user.signUp(name, username, email, password, (response) => {
      result = response;
      done();
    }, 10000);
  }, 10000);
  it('should return Error message if Name is not specified ', (done) => {
    expect(result).toEqual('Name can not be empty');
    done();
  }, 10000);
});

describe('When a new User signs up', () => {
  let result;
  const name = 'Ema Ala';
  const username = '';
  const email = '';
  const password = '';
  beforeEach((done) => {
    user.signUp(name, username, email, password, (response) => {
      result = response;
      done();
    }, 10000);
  }, 10000);
  it('should return Error message if Username is not specified ', (done) => {
    expect(result).toEqual('Username can not be empty');
    done();
  }, 10000);
});

describe('When a new User signs up', () => {
  let result;
  const name = 'Ema Ala';
  const username = 'Evidence';
  const email = '';
  const password = '';
  beforeEach((done) => {
    user.signUp(name, username, email, password, (response) => {
      result = response;
      done();
    }, 10000);
  }, 10000);
  it('should return Error message if Email is not specified ', (done) => {
    expect(result).toEqual('Email can not be empty');
    done();
  }, 10000);
});

describe('When a new User signs up', () => {
  let result;
  const name = 'Ema Ala';
  const username = 'Evidence';
  const email = 'ema@gmail.com';
  const password = '';
  beforeEach((done) => {
    user.signUp(name, username, email, password, (response) => {
      result = response;
      done();
    }, 10000);
  }, 10000);
  it('should return Error message if Password is not specified ', (done) => {
    expect(result).toEqual('Password can not be empty');
    done();
  }, 10000);
});

describe('When a new User signs up', () => {
  let result;
  const name = 'Ema Ala';
  const username = 'Evidence';
  const email = 'ema@gmail.com';
  const password = '123456789';
  beforeEach((done) => {
    user.signUp(name, username, email, password, (response) => {
      result = response;
      done();
    }, 10000);
  }, 10000);
  it('should return Error message if Username is already used', (done) => {
    expect(result).toEqual('username must be unique');
    done();
  }, 10000);
});

describe('When a new User signs up', () => {
  let result;
  const name = 'Ema Ala';
  const username = 'Oliver';
  const email = 'ema@gmail.com';
  const password = '123456789';
  beforeEach((done) => {
    user.signUp(name, username, email, password, (response) => {
      result = response;
      done();
    }, 10000);
  }, 10000);
  it('should return Error message if Email is already used', (done) => {
    expect(result).toEqual('email must be unique');
    done();
  }, 10000);
});

xdescribe('When a new User signs up', () => {
  let result;
  const name = 'Ema Ala';
  const username = 'Bilasi';
  const email = 'bilasi@gmail.com';
  const password = '123456789';
  beforeEach((done) => {
    user.signUp(name, username, email, password, (response) => {
      result = response;
      done();
    }, 10000);
  }, 10000);
  it('should return a JSON object of the User if the details are correct', (done) => {
    expect(typeof result.dataValues).toEqual('object');
    done();
  }, 10000);
});

describe('When a register User signs in', () => {
  let result;
  const username = '';
  const password = '123456789';
  beforeEach((done) => {
    user.logIn(username, password, (response) => {
      result = response;
      done();
    }, 10000);
  }, 10000);
  it('should return Error message if username is not stated', (done) => {
    expect(result).toEqual('Username can not be empty');
    done();
  }, 10000);
});

describe('When a register User signs in', () => {
  let result;
  const username = 'Evidence';
  const password = '';
  beforeEach((done) => {
    user.logIn(username, password, (response) => {
      result = response;
      done();
    }, 10000);
  }, 10000);
  it('should return Error message if password is not stated', (done) => {
    expect(result).toEqual('Password can not be empty');
    done();
  }, 10000);
});

describe('When an unregister User signs in', () => {
  let result;
  const username = 'Ibukun';
  const password = '123456789';
  beforeEach((done) => {
    user.logIn(username, password, (response) => {
      result = response;
      done();
    }, 10000);
  }, 10000);
  it('should return Error message if username is not registered', (done) => {
    expect(result).toEqual('Failed, Username not Found');
    done();
  }, 10000);
});

describe('When a register User signs in', () => {
  let result;
  const username = 'Evidence';
  const password = '12345678900';
  beforeEach((done) => {
    user.logIn(username, password, (response) => {
      result = response;
      done();
    }, 10000);
  }, 10000);
  it('should return Error message if username is stated but password is not correct', (done) => {
    expect(result).toEqual('Failed, Wrong Password');
    done();
  }, 10000);
});

describe('When a register User signs in', () => {
  let result;
  const username = 'Evidence';
  const password = '1234567890';
  beforeEach((done) => {
    user.logIn(username, password, (response) => {
      result = response[0];
      done();
    }, 10000);
  }, 10000);
  it('should return a JSON object if username and password are correct', (done) => {
    expect(typeof result.dataValues).toEqual('object');
    done();
  }, 10000);
});

describe('When a User creates a group', () => {
  let result;
  const groupName = '';
  const creator = '1234567890';
  beforeEach((done) => {
    user.createGroup(groupName, creator, (response) => {
      result = response;
      done();
    }, 10000);
  }, 10000);
  it('should return a Error Message if Group name is not defined', (done) => {
    expect(result).toEqual('Group Name can not be Empty');
    done();
  }, 10000);
});

describe('When a User creates a group', () => {
  let result;
  const groupName = 'Evidence';
  const creator = '';
  beforeEach((done) => {
    user.createGroup(groupName, creator, (response) => {
      result = response;
      done();
    }, 10000);
  }, 10000);
  it('should return a Error Message if creator id is not defined', (done) => {
    expect(result).toEqual('creator id can not be Empty');
    done();
  }, 10000);
});

describe('When a User creates a group', () => {
  let result;
  const groupName = 'Friend';
  const creator = '1';
  beforeEach((done) => {
    user.createGroup(groupName, creator, (response) => {
      result = response;
      done();
    }, 10000);
  }, 10000);
  it('should return a Error Message if the User has created a group with same name', (done) => {
    expect(result).toEqual('Group Exists already');
    done();
  }, 10000);
});

xdescribe('When a User creates a group', () => {
  let result;
  const groupName = 'Cohort1';
  const creator = '1';
  beforeEach((done) => {
    user.createGroup(groupName, creator, (response) => {
      result = response[0].dataValues;
      done();
    }, 10000);
  }, 10000);
  it('should create group if it does not exist', (done) => {
    expect(typeof result).toEqual('object');
    done();
  }, 10000);
});

describe('When a User creates a group', () => {
  let result;
  const groupName = 'Evidence';
  const creator = '123';
  beforeEach((done) => {
    user.createGroup(groupName, creator, (response) => {
      result = response;
      done();
    }, 10000);
  }, 10000);
  it('should return an Error Message if an unregistered User tries to create a group', (done) => {
    expect(result).toEqual('SequelizeForeignKeyConstraintError');
    done();
  }, 10000);
});

describe('When a User adds another user to a group', () => {
  let result;
  const group = '';
  const userId = '123';
  const adding = 1;
  beforeEach((done) => {
    user.addUsers(group, userId, adding, (response) => {
      result = response;
      done();
    }, 10000);
  }, 10000);
  it('should return an Error Message if group Id is not stated', (done) => {
    expect(result).toEqual('Group Id must be stated');
    done();
  }, 10000);
});

describe('When a User adds another user to a group', () => {
  let result;
  const group = '1';
  const userId = '';
  const adding = 1;
  beforeEach((done) => {
    user.addUsers(group, userId, adding, (response) => {
      result = response;
      done();
    }, 10000);
  }, 10000);
  it('should return an Error Message if User Id is not stated', (done) => {
    expect(result).toEqual('User Id must be stated');
    done();
  }, 10000);
});

describe('When a User adds another user to a group', () => {
  let result;
  const group = '1';
  const userId = '2';
  const adding = 1;
  beforeEach((done) => {
    user.addUsers(group, userId, adding, (response) => {
      result = response;
      done();
    }, 10000);
  }, 10000);
  it('should return an Error Message if User is already a member of the group', (done) => {
    expect(result).toEqual('User is already a member');
    done();
  }, 10000);
});

describe('When a User adds another user to a group', () => {
  let result;
  const group = '12';
  const userId = '2';
  const adding = 1;
  beforeEach((done) => {
    user.addUsers(group, userId, adding, (response) => {
      result = response[0].dataValues;
      done();
    }, 10000);
  }, 10000);
  it('should return an Error Message if User is not a member yet', (done) => {
    expect(typeof result).toEqual('object');
    done();
  }, 10000);
});
