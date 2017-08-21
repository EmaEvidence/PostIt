import expect from 'expect';
import reducer from '../../reducers/setCurrentMessagesReducer';
import * as types from '../../actions/types/types';

describe('setCurrentMessages reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(
      {
        current_messages: [],
        status: '',
        current_group: ''
      }
    );
  });

  it('should handle SET_CURRENT_MESSAGES', () => {
    expect(reducer({}, {
      type: types.SET_CURRENT_MESSAGES,
      messages: [{}],
      status: 'No Message for this group',
      groupName: 'CFH'
    })).toEqual(
      {
        current_messages: [{}],
        status: 'No Message for this group',
        current_group: 'CFH'
      }
    );
  });
});
