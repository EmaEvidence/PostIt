import expect from 'expect';
import groupReducer from '../../reducers/groupReducer';
import * as types from '../../actions/types/types';

describe('get user groups reducer', () => {
  it('should return the initial state', () => {
    expect(groupReducer(undefined, {})).toEqual(
      {
        status: '',
        groups: ''
      }
    );
  });

  it('should handle ADD_USER_GROUPS', () => {
    expect(groupReducer({}, {
      type: types.ADD_USER_GROUPS,
      group: [{
        id: 1,
        groupName: 'Andela',
        Users: [
          {
            id: 1,
            username: 'Evidence',
            email: 'ema@gmail.com'
          },
          {
            id: 2,
            username: 'Noor',
            email: 'noor@gmail.com'
          }
        ]
      }]
    })).toEqual(
      {
        status: '',
        groups: [{
          id: 1,
          groupName: 'Andela',
          Users: [
            {
              id: 1,
              username: 'Evidence',
              email: 'ema@gmail.com'
            },
            {
              id: 2,
              username: 'Noor',
              email: 'noor@gmail.com'
            }
          ]
        }]
      }
    );
  });

  it('should handle ADD_USER_GROUPS_ERROR', () => {
    expect(groupReducer({}, {
      type: types.ADD_USER_GROUPS_ERROR,
      group: [{
        id: 1,
        groupName: 'Andela',
        Users: [
          {
            id: 1,
            username: 'Evidence',
            email: 'ema@gmail.com'
          },
          {
            id: 2,
            username: 'Noor',
            email: 'noor@gmail.com'
          }
        ]
      }]
    })).toEqual(
      {
        status: '',
        groups: [{
          id: 1,
          groupName: 'Andela',
          Users: [
            {
              id: 1,
              username: 'Evidence',
              email: 'ema@gmail.com'
            },
            {
              id: 2,
              username: 'Noor',
              email: 'noor@gmail.com'
            }
          ]
        }]
      }
    );
  });

  it('should handle CREATE_GROUP', () => {
    expect(groupReducer({
      status: '',
      groups: [[{
        id: 1,
        groupName: 'Andela',
        Users: [
          {
            id: 1,
            username: 'Evidence',
            email: 'ema@gmail.com'
          },
          {
            id: 2,
            username: 'Noor',
            email: 'noor@gmail.com'
          }
        ]
      }]]
    }, {
      type: types.CREATE_GROUP,
      message: 'Added',
      group: { id: 2,
        groupName: 'Andela1',
        Users: [
          {
            id: 1,
            username: 'Evidence',
            email: 'ema@gmail.com'
          },
          {
            id: 2,
            username: 'Noor',
            email: 'noor@gmail.com'
          }
        ] }
    })).toEqual(
      {
        status: 'Added',
        groups: [[{
          id: 1,
          groupName: 'Andela',
          Users: [
            {
              id: 1,
              username: 'Evidence',
              email: 'ema@gmail.com'
            },
            {
              id: 2,
              username: 'Noor',
              email: 'noor@gmail.com'
            }
          ]
        }, {
          id: 2,
          groupName: 'Andela1',
          Users: [
            {
              id: 1,
              username: 'Evidence',
              email: 'ema@gmail.com'
            },
            {
              id: 2,
              username: 'Noor',
              email: 'noor@gmail.com'
            }
          ] }]]
      }
    );
  });

  it('should handle ADD_NEW_MEMBER', () => {
    expect(groupReducer({
      status: '',
      groups: [[{
        id: 1,
        groupName: 'Andela',
        Users: [
          {
            id: 1,
            username: 'Evidence',
            email: 'ema@gmail.com'
          }
        ]
      }]]
    }, {
      type: types.ADD_NEW_MEMBER,
      message: 'Added Successfully',
      group: { id: 1,
        groupName: 'Andela',
        Users: [
          {
            id: 2,
            username: 'Noor',
            email: 'noor@gmail.com'
          }
        ] }
    })).toEqual(
      {
        status: '',
        groups: [[{
          id: 1,
          groupName: 'Andela',
          Users: [
            {
              id: 1,
              username: 'Evidence',
              email: 'ema@gmail.com'
            },
            {
              id: 2,
              username: 'Noor',
              email: 'noor@gmail.com'
            }
          ]
        }]]
      }
    );
  });
});
