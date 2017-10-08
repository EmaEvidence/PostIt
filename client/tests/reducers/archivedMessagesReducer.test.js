import expect from 'expect';
import archivedMessageReducer from '../../reducers/archivedMessageReducer';
import * as types from '../../actions/types/types';

describe('archived messages reducer', () => {
  it('should return initial state', () => {
    expect(archivedMessageReducer(undefined, {})).toEqual({
      archivedMessages: [],
      currentGroup: '',
      status: ''
    });
  });
  it('it should handle GET_ARCHIVED_MESSAGE', () => {
    expect(archivedMessageReducer({
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
    expect(archivedMessageReducer({
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
});
