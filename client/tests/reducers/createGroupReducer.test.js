import expect from 'expect';
import reducer from '../../reducers/createGroupReducer';
import * as types from '../../actions/types/types';

describe('create group reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(
      {
        status: ''
      }
    );
  });

  it('should handle CREATE_GROUP', () => {
    expect(reducer({}, {
      type: types.CREATE_GROUP,
      message: 'Message Sent'
    })).toEqual(
      {
        status: 'Message Sent'
      }
    );
  });

  it('should handle CREATE_GROUP_ERROR', () => {
    expect(reducer({}, {
      type: types.CREATE_GROUP_ERROR,
      message: 'Message Sent Not Sent'
    })).toEqual(
      {
        status: 'Message Sent Not Sent'
      }
    );
  });
});
