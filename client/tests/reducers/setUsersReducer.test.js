import expect from 'expect';
import reducer from '../../reducers/setUsersReducer';
import * as types from '../../actions/types/types';

describe('setUsers reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(
      {
        current_group: '',
        users: {}
      }
    );
  });

  it('should handle SET_USERS', () => {
    expect(reducer({}, {
      type: types.SET_USERS,
      current_group: 1,
      users: [{
        id: 1,
        username: 'Evidence',
      }]
    })).toEqual(
      {
        current_group: 1,
        users: [{
          id: 1,
          username: 'Evidence',
        }]
      }
    );
  });
});
