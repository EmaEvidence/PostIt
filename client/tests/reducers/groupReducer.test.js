import expect from 'expect';
import reducer from '../../reducers/groupReducer';
import * as types from '../../actions/types/types';

describe('get user groups reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(
      {
        status: '',
        groups: ''
      }
    );
  });

  it('should handle ADD_USER_GROUPS', () => {
    expect(reducer({}, {
      type: types.ADD_USER_GROUPS,
      group: [{}]
    })).toEqual(
      {
        status: '',
        groups: [{}]
      }
    );
  });

  it('should handle CREATE_GROUP', () => {
    expect(reducer({
      status: '',
      groups: [[{}]]
    }, {
      type: types.CREATE_GROUP,
      message: 'Added',
      group: {}
    })).toEqual(
      {
        status: 'Added',
        groups: [[{}, {}]]
      }
    );
  });
});
