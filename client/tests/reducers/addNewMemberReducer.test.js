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

  it('should handle ADD_NEW_MEMBER', () => {
    expect(reducer({}, {
      type: types.ADD_NEW_MEMBER,
      status: 'Added'
    })).toEqual(
      {
        status: 'Added'
      }
    );
  });

  it('should handle ADD_NEW_MEMBER', () => {
    expect(reducer({}, {
      type: types.ADD_NEW_MEMBER,
      status: 'User already a member'
    })).toEqual(
      {
        status: 'User already a member'
      }
    );
  });
});
