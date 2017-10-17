import expect from 'expect';
import myMessageReducer from '../../reducers/myMessageReducer';
import * as types from '../../actions/types/types';

describe('my message reducer', () => {
  it('it should return inital state', () => {
    expect(myMessageReducer(undefined, {})).toEqual({
      myMessages: []
    });
  });

  it('should handle GET_MY_MESSAGES', () => {
    expect(myMessageReducer({}, {
      type: types.GET_MY_MESSAGES,
      messages: [{ id: 1,
        message: 'Welcome',
        createdAt: '12/1/2017',
        senderUsername: 'Evi'
      }, { id: 2,
        message: 'Welcome everyone',
        createdAt: '12/1/2017',
        senderUsername: 'Evi'
      }]
    })).toEqual({
      myMessages: [{ id: 1,
        message: 'Welcome',
        createdAt: '12/1/2017',
        senderUsername: 'Evi'
      }, { id: 2,
        message: 'Welcome everyone',
        createdAt: '12/1/2017',
        senderUsername: 'Evi'
      }]
    });
  });
});
