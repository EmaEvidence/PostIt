import expect from 'expect';
import reducer from '../../reducers/setCurrentMessagesReducer';
import * as types from '../../actions/types/types';

describe('setCurrentMessages reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(
      {
        currentMessages: [],
        status: '',
        currentGroup: ''
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
        currentMessages: [{}],
        status: 'No Message for this group',
        currentGroup: 'CFH'
      }
    );
  });
});
