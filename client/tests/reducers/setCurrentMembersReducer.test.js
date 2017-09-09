import expect from 'expect';
import reducer from '../../reducers/setCurrentMembersReducer';
import * as types from '../../actions/types/types';

describe('setCurrentMembers reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(
      {
        currentMembers: [],
        status: '',
        currentGroup: ''
      }
    );
  });

  it('should handle SET_CURRENT_MEMBERS', () => {
    expect(reducer({}, {
      type: types.SET_CURRENT_MEMBERS,
      members: [{
        id: 1,
        username: 'Evidence',
        email: 'ema@gmail.com'
      }],
      status: 'Retrived',
      groupName: 'CFH'
    })).toEqual(
      {
        currentMembers: [{
          id: 1,
          username: 'Evidence',
          email: 'ema@gmail.com'
        }],
        status: 'Retrived',
        currentGroup: 'CFH'
      }
    );
  });
});
