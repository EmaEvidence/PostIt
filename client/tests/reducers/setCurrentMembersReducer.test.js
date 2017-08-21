import expect from 'expect';
import reducer from '../../reducers/setCurrentMembersReducer';
import * as types from '../../actions/types/types';

describe('setCurrentMembers reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(
      {
        current_members: [],
        status: '',
        current_group: ''
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
        current_members: [{
          id: 1,
          username: 'Evidence',
          email: 'ema@gmail.com'
        }],
        status: 'Retrived',
        current_group: 'CFH'
      }
    );
  });
});
