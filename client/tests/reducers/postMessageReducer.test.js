import expect from 'expect';
import reducer from '../../reducers/postMessageReducer';
import * as types from '../../actions/types/types';

describe('postMessage reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(
      {
        status: ''
      }
    );
  });

  it('should handle POST_MESSAGE', () => {
    expect(reducer({}, {
      type: types.POST_MESSAGE,
      message: 'Message Sent'
    })).toEqual(
      {
        status: 'Message Sent'
      }
    );
  });

  it('should handle POST_MESSAGE', () => {
    expect(reducer({}, {
      type: types.POST_MESSAGE_ERROR,
      message: 'Message Sent Not Sent'
    })).toEqual(
      {
        status: 'Message Sent Not Sent'
      }
    );
  });
});
