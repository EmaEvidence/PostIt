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
    expect(reducer({}, {
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
    expect(reducer({
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
      group: { id: 1,
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
          id: 1,
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
});
