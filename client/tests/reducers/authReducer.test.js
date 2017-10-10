import expect from 'expect';
import authReducers from '../../reducers/authReducers';
import * as types from '../../actions/types/types';

describe('auth user reducer', () => {
  it('should return the initial state', () => {
    expect(authReducers(undefined, {})).toEqual(
      {
        loggedIn: false,
        userDetails: {},
        authMessage: ''
      }
    );
  });

  it('should handle CREATE_GROUP', () => {
    expect(authReducers({}, {
      type: types.ADD_USER_DETAILS,
      data: {
        id: 1,
        username: 'Evidence',
        email: 'ema@gmail.com'
      }
    })).toEqual(
      {
        authMessage: 'Successful',
        loggedIn: true,
        userDetails: {
          id: 1,
          username: 'Evidence',
          email: 'ema@gmail.com'
        }
      }
    );
  });
  it('should handle CLEAR_NOTIFICATION', () => {
    expect(authReducers({
      loggedIn: true,
      userDetails: {
        notifications: [{ id: 1, message: 'New message' }]
      },
      authMessage: ''
    }, {
      type: types.CLEAR_NOTIFICATION,
    })).toEqual(
      {
        authMessage: '',
        loggedIn: true,
        userDetails: {
          notifications: []
        }
      }
    );
  });
});
