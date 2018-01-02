import expect from 'expect';
import messageReducer from '../../reducers/messageReducer';
import * as types from '../../actions/types/types';

describe('setCurrentMessages reducer', () => {
  it('should return the initial state', () => {
    expect(messageReducer(undefined, {})).toEqual(
      {
        currentMessages: [],
        status: '',
        currentGroup: '',
        archivedMessages: [],
        myMessages: []
      }
    );
  });

  it('should handle SET_CURRENT_MESSAGES', () => {
    expect(messageReducer({}, {
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
  it('it should handle GET_ARCHIVED_MESSAGE', () => {
    expect(messageReducer({
      archivedMessages: [],
      currentGroup: '',
      status: ''
    }, {
      type: types.GET_ARCHIVED_MESSAGE,
      messages: [{ id: 1,
        message: 'Welcome',
        createdAt: '12/1/2017',
        senderUsername: 'Evi'
      }],
      groupName: 'Andela',
      status: 'Message Retrieved'
    }))
    .toEqual({
      archivedMessages: [{ id: 1,
        message: 'Welcome',
        createdAt: '12/1/2017',
        senderUsername: 'Evi'
      }],
      currentGroup: 'Andela',
      status: 'Message Retrieved'
    });
  });
  it('it should handle GET_ARCHIVED_MESSAGE_ERROR', () => {
    expect(messageReducer({
      archivedMessages: [],
      currentGroup: '',
      status: ''
    }, {
      type: types.GET_ARCHIVED_MESSAGE_ERROR,
      messages: [],
      groupName: 'Andela',
      status: 'Message Retrieval Failed'
    }))
    .toEqual({
      archivedMessages: [],
      currentGroup: 'Andela',
      status: 'Message Retrieval Failed'
    });
  });
  it('should handle GET_MY_MESSAGES', () => {
    expect(messageReducer({}, {
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
  it('should handle POST_MESSAGE', () => {
    expect(messageReducer({}, {
      type: types.POST_MESSAGE,
      message: 'Message Sent'
    })).toEqual(
      {
        status: 'Message Sent'
      }
    );
  });

  it('should handle POST_MESSAGE', () => {
    expect(messageReducer({}, {
      type: types.POST_MESSAGE_ERROR,
      message: 'Message Sent Not Sent'
    })).toEqual(
      {
        status: 'Message Sent Not Sent'
      }
    );
  });
});
