import expect from 'expect';
import addNewMemberReducer from '../../reducers/addNewMemberReducer';
import * as types from '../../actions/types/types';

describe('add new member reducer', () => {
  it('should return the initial state', () => {
    expect(addNewMemberReducer(undefined, {})).toEqual(
      {
        status: ''
      }
    );
  });
  it('should return error', () => {
    expect(addNewMemberReducer({
      status: ''
    }, {
      type: types.ADD_NEW_MEMBER_ERROR,
      status: 'User already a member',
    })).toEqual(
      {
        status: 'User already a member'
      }
    );
  });
});
