import expect from 'expect';
import setUsersReducer from '../../reducers/setUsersReducer';
import * as types from '../../actions/types/types';

describe('setUsers reducer', () => {
  it('should return the initial state', () => {
    expect(setUsersReducer(undefined, {})).toEqual(
      {
        currentGroup: '',
        users: {}
      }
    );
  });

  it('should handle SET_USERS', () => {
    expect(setUsersReducer({}, {
      type: types.SET_USERS,
      currentGroup: 1,
      users: [{
        id: 1,
        username: 'Evidence',
      }]
    })).toEqual(
      {
        currentGroup: 1,
        users: [{
          id: 1,
          username: 'Evidence',
        }]
      }
    );
  });
});
