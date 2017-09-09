import expect from 'expect';
import User from '../../helpers/user';

const user = new User();
let newUserId;

describe('When a new User supplies a password', () => {
  const password = 'qwerty123@';
  const wrongPassword = '1234567890';
  const validPassword = User.validate(password, 1);
  const invalidPassword = User.validate(wrongPassword, 1);
  it('should return Error message if its in a right format', () => {
    expect(validPassword).toEqual('valid');
  });
  it('should return valid if its in a right format', () => {
    expect(invalidPassword).toEqual('Password Must Contain Alphabets, Numbers, Special Characters and Must be Longer than 8');
  });
});

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
  it('should return Error message if password is not specified ', (done) => {
    expect(result).toEqual('Password Must Contain Alphabets, Numbers, Special Characters and Must be Longer than 8');
    done();
  }, 10000);
});

describe('When a new User signs up', () => {
  let result;
  const name = 'Ema Ala';
  const username = 'Evidence';
  const email = 'emmanuelalabi563@gmail.com';
  const password = 'qwerty123@';
  const phone = '07063747160';
  let userId;

  beforeEach((done) => {
    user.signUp(name, username, email, password, phone, (response) => {
      result = response;
      done();
    }, 10000);
  }, 10000);

  it('should return a JSON object of the User if the details are correct', (done) => {
    expect(typeof result).toEqual('object');
    expect(result.username).toEqual('Evidence');
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

  it('should return Error if the user signs in with wrong details after signing up', (done) => {
    expect(signInResult).toEqual('Failed, Username not Found');
    done();
  }, 3000);

  let signInResult2;
  beforeEach((done) => {
    user.logIn('Evidence', 'qwerty123', (response) => {
      signInResult2 = response;
      done();
    }, 10000);
  }, 10000);

  it('should return Error if the user signs in with wrong details after signing up', (done) => {
    expect(signInResult2).toEqual('Failed, Wrong Password');
    done();
  }, 3000);

  let signedIn;
  beforeEach((done) => {
    user.logIn('Evidence', 'qwerty123@', (response) => {
      signedIn = response;
      userId = signedIn.id;
      done();
    }, 10000);
  }, 10000);

  it('should return user object when he signs in with correct details after signing up', (done) => {
    expect(typeof signedIn).toEqual('object');
    expect(signedIn.username).toEqual('Evidence');
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
  it('should return "Andela" as the group name when the user creates a group with correct details', (done) => {
    expect(group.groupName).toEqual('Andela');
    done();
  }, 3000);

  let groupError;
  beforeEach((done) => {
    user.createGroup('Andela', userId, 'Evidence', (response) => {
      groupError = response;
      done();
    }, 10000);
  }, 10000);
  xit('should return Error message if the  group the signed user creates exists', (done) => {
    expect(groupError).toEqual('Group Exists already');
    done();
  }, 10000);

  let addedUser;
  beforeEach((done) => {
    user.signUp('Nuru Ibra', 'Trialname', 'trial@gmail.com', 'qwerty123@', '08020304050', (response) => {
      newUserId = response.id;
      user.addUsers(groupId, newUserId, userId, (added) => {
        addedUser = added;
      });
      done();
    }, 3000);
  }, 3000);
  xit('should return true when a signed user adds another user to a group', (done) => {
    expect(addedUser).toEqual(true);
    done();
  }, 3000);

  let postResult;
  beforeEach((done) => {
    user.postMessage(groupId, 'Evidence', userId, 'Hello Everyone', 'Normal', (response) => {
      postResult = response;
    }, 3000);
    done();
  });
  xit('should return "Hello Everyone" when a signed user posts message to a group', (done) => {
    expect((postResult).message).toEqual('Hello Everyone');
    expect((postResult).priority).toEqual('Normal');
    expect((postResult).senderUsername).toEqual('Evidence');
    done();
  }, 3000);

  let retrivalResult;
  beforeEach((done) => {
    user.retrieveMessage(groupId, 'Evidence', (response) => {
      retrivalResult = response;
    }, 3000);
    done();
  });
  it('should return messages when the user requests for messages of a group', (done) => {
    expect(typeof retrivalResult).toEqual('object');
    done();
  }, 3000);

  let userGroups;
  beforeEach((done) => {
    user.getUserGroups(userId, (response) => {
      userGroups = response;
    }, 3000);
    done();
  });
  it('should return array of groups when the user requests for groups he belongs to', (done) => {
    expect(typeof userGroups).toEqual('object');
    done();
  }, 3000);
  let clearNotice;
  beforeEach((done) => {
    user.clearNotifications(1, (response) => {
      clearNotice = response;
    }, 3000);
    done();
  });
  it('should clear notifications when clearNotifications is called', (done) => {
    expect(clearNotice).toEqual('Notification Cleared');
    done();
  }, 3000);

  let searchResult;
  beforeEach((done) => {
    user.searchUsers('Evi', 0, 1, (response) => {
      searchResult = response;
    }, 3000);
    done();
  });
  it('should clear notifications when clearNotifications is called', (done) => {
    expect(searchResult.count).toBeGreaterThan(0);
    done();
  }, 3000);

  afterEach((done) => {
    user.deleteUsers(email, () => {
      user.deleteGroupWithName('Andela', () => {
        user.deleteUserFromGroup(groupId, newUserId, userId, () => {
        });
      });
    });
    done();
  }, 1000);

  afterEach((done) => {
    user.deleteUsers(email, () => {
      user.deleteGroupWithName('Andela', () => {
        user.deleteUserFromGroup(groupId, newUserId, userId, () => {
        });
      });
    });
    done();
  }, 1000);
});

xdescribe('when a message is sent to a group, its users', () => {
  let inAppNoticeError;
  let inAppNotice;
  let clearNotice;
  let showNotice;
  beforeEach((done) => {
    user.inAppNotify(1, 1, 1, (response) => {
      inAppNoticeError = response;
    });
    done();
  });
  it('should return error if no user is supplied in App Notifications', () => {
    expect(inAppNoticeError).toEqual(1);
  });
  beforeEach((done) => {
    user.inAppNotify([1, 2], 1, 1, (response) => {
      inAppNotice = response;
    });
    done();
  });
  it('should be recieve inApp Notifications', () => {
    expect(inAppNotice).toEqual(1);
  });
  beforeEach((done) => {
    user.showNotification(1, (response) => {
      showNotice = response;
    });
    done();
  });
  it('should be able to see it', () => {
    expect(showNotice).toEqual(1);
  });
  beforeEach((done) => {
    user.clearInAppNotice(1, (response) => {
      clearNotice = response;
    });
    done();
  });
  xit('should be able to see it', () => {
    expect(clearNotice).toEqual(1);
  });
  it('should be able to clear it', () => {

  });
});
afterAll((done) => {
  user.clearTables(() => {
  });
  done();
}, 1000);
