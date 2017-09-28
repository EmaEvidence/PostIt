import expect from 'expect';
import reducer from '../../reducers/addNewMemberReducer';
import * as types from '../../actions/types/types';

describe('add new member reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(
      {
        status: ''
      }
    );
  });
  it('should return error', () => {
    expect(reducer({
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
