import expect from 'expect';
import setCurrentMessagesReducer from '../../reducers/setCurrentMessagesReducer';
import * as types from '../../actions/types/types';

describe('setCurrentMessages reducer', () => {
  it('should return the initial state', () => {
    expect(setCurrentMessagesReducer(undefined, {})).toEqual(
      {
        currentMessages: [],
        status: '',
        currentGroup: ''
      }
    );
  });

  it('should handle SET_CURRENT_MESSAGES', () => {
    expect(setCurrentMessagesReducer({}, {
      type: types.SET_CURRENT_MESSAGES,
      messages: [{ id: 1,
        message: 'Welcome',
        createdAt: '12/1/2017',
        senderUsername: 'Evi'
      }, { id: 2,
        message: 'Welcome everyone',
        createdAt: '12/1/2017',
        senderUsername: 'Evi'
      }],
      status: 'Message Retrieved',
      groupName: 'CFH'
    })).toEqual(
      {
        currentMessages: [{ id: 1,
          message: 'Welcome',
          createdAt: '12/1/2017',
          senderUsername: 'Evi'
        }, { id: 2,
          message: 'Welcome everyone',
          createdAt: '12/1/2017',
          senderUsername: 'Evi'
        }],
        status: 'Message Retrieved',
        currentGroup: 'CFH'
      }
    );
  });
});
