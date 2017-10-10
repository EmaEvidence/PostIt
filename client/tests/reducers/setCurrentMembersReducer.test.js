import expect from 'expect';
import setCurrentMembersReducer from '../../reducers/setCurrentMembersReducer';
import * as types from '../../actions/types/types';

describe('setCurrentMembers reducer', () => {
  it('should return the initial state', () => {
    expect(setCurrentMembersReducer(undefined, {})).toEqual(
      {
        currentMembers: [],
        status: '',
        currentGroup: ''
      }
    );
  });

  it('should handle SET_CURRENT_MEMBERS', () => {
    expect(setCurrentMembersReducer({}, {
      type: types.SET_CURRENT_MEMBERS,
      members: [{
        id: 1,
        username: 'Evidence',
        email: 'ema@gmail.com'
      }, {
        id: 1,
        username: 'Noordean',
        email: 'noor@gmail.com'
      }],
      status: 'Retrived',
      groupName: 'CFH'
    })).toEqual(
      {
        currentMembers: [{
          id: 1,
          username: 'Evidence',
          email: 'ema@gmail.com'
        }, {
          id: 1,
          username: 'Noordean',
          email: 'noor@gmail.com'
        }],
        status: 'Retrived',
        currentGroup: 'CFH'
      }
    );
  });
});
