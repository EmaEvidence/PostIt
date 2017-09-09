import expect from 'expect';
import reducer from '../../reducers/resetPasswordReducer';
import * as types from '../../actions/types/types';

describe('resetPassword reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(
      {
        status: ''
      }
    );
  });

  it('should handle RESET_MAIL_SUCCESS', () => {
    expect(reducer({}, {
      type: types.RESET_MAIL_SUCCESS,
      status: 'Mail Sent'
    })).toEqual(
      {
        status: 'Mail Sent',
      }
    );
  });

  it('should handle RESET_PASSWORD_ERROR', () => {
    expect(reducer({}, {
      type: types.RESET_PASSWORD_ERROR,
      status: 'Error sending Mail'
    })).toEqual(
      {
        status: 'Error sending Mail',
      }
    );
  });
});
