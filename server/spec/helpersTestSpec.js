import expect from 'expect';
import User from '../src/user';


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

describe('when a text notification is sent', () => {
  const payload = {
    to: '07063747160',
    from: 'Post App',
    message: 'You have a new Message on Post It App. Testing'
  };
  const wrongPayload = {
    to: '',
    from: 'Post App',
    body: 'You have a new Message on Post It App. Testing'
  };
  let rightResult;
  beforeEach((done) => {
    User.sendText(payload, (result) => {
      rightResult = result;
      done();
    }, 3000);
  }, 10000);

  it('should "Message Notification Sent" if sent', () => {
    expect(rightResult).toEqual('Message Notification Sent');
  });
  let wrongResult;
  beforeEach((done) => {
    User.sendText(wrongPayload, (result) => {
      wrongResult = result;
      done();
    }, 3000);
  }, 10000);
  it('should return "Error Sending Message Notification" if not sent', () => {
    expect(wrongResult).toEqual('Error Sending Message Notification');
  });
});

xdescribe('when a mail notification is sent', () => {
  const mailOptions = {
    from: '"PostIt APP 👻" <emmanuel.alabi@andela.com>',
    to: 'emmanuelalabi563@gmail.com',
    subject: 'New Message Notification',
    text: 'You have a new message in Post It App.',
    html: '<a href="#">Click Here To Access it</a>'
  };
  const wrongMailOptions = {
    fro: '"PostIt APP 👻" <emmanuel.alabi@andela.com>',
    t: 'emm@gmail.com',
    subject: 'New Message Notification',
    body: 'You have a new message in Post It App.',
    html: '<a href="#">Click Here To Access it</a>'
  };
  let result;
  let wrongResult;
  beforeEach((done) => {
    User.mailer(mailOptions, (msg) => {
      result = msg;
      done();
    }, 3000);
  }, 3000);
  it('should return "Mail Sent" if sent', (done) => {
    expect(result).toEqual('Mail Sent');
    done();
  }, 10000);
  beforeEach((done) => {
    User.mailer(wrongMailOptions, (msg) => {
      wrongResult = msg;
      done();
    }, 3000);
  }, 3000);
  it('should return "Mail Not Sent" if not sent', (done) => {
    expect(wrongResult).toEqual('Mail Not Sent');
    done();
  }, 10000);
});
