import expect from 'expect';
import reducer from '../../reducers/getUserGroupsReducer';
import * as types from '../../actions/types/types';

describe('get user groups reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(
      {
        groups: []
      }
    );
  });

  it('should handle ADD_USER_GROUPS', () => {
    expect(reducer({}, {
      type: types.ADD_USER_GROUPS,
      group: [{}]
    })).toEqual(
      {
        groups: [{}]
      }
    );
  });
});
