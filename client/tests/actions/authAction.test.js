import expect from 'expect';

import * as types from '../../actions/types/types';
import authAction from '../../actions/authAction';

describe('authAction', () => {
  it('should create authAction', () => {
    const data = { id: 1, username: 'Evidence', email: 'ema@gmail.com' };
    const expected = {
      type: types.ADD_USER_DETAILS,
      data
    };
    const action = authAction(data);
    expect(action).toEqual(expected);
  });
});
