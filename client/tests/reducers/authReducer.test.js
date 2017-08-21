import expect from 'expect';
import reducer from '../../reducers/authReducers';
import * as types from '../../actions/types/types';

describe('auth user reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(
      {
        logged_in: false,
        user_details: {}
      }
    );
  });

  it('should handle CREATE_GROUP', () => {
    expect(reducer({}, {
      type: types.ADD_USER_DETAILS,
      data: {
        id: 1,
        username: 'Evidence',
        email: 'ema@gmail.com'
      }
    })).toEqual(
      {
        logged_in: true,
        user_details: {
          id: 1,
          username: 'Evidence',
          email: 'ema@gmail.com'
        }
      }
    );
  });
});
