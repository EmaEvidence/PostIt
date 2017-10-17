import expect from 'expect';
import resetPasswordReducer from '../../reducers/resetPasswordReducer';
import * as types from '../../actions/types/types';

describe('resetPassword reducer', () => {
  it('should return the initial state', () => {
    expect(resetPasswordReducer(undefined, {})).toEqual(
      {
        status: ''
      }
    );
  });

  it('should handle RESET_MAIL_SUCCESS', () => {
    expect(resetPasswordReducer({}, {
      type: types.RESET_MAIL_SUCCESS,
      status: 'Mail Sent'
    })).toEqual(
      {
        status: 'Mail Sent',
      }
    );
  });

  it('should handle RESET_PASSWORD_ERROR', () => {
    expect(resetPasswordReducer({}, {
      type: types.RESET_PASSWORD_ERROR,
      status: 'Error sending Mail'
    })).toEqual(
      {
        status: 'Error sending Mail',
      }
    );
  });
});
