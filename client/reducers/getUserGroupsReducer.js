import { _merge } from 'lodash';

export default function reducer(state = {
  groups: []
}, action) {
  switch (action.type) {
    case 'ADD_USER_GROUPS': {
      return Object.assign({}, state, {
        groups: [...action.group]
      });
    }
    case 'CREATE_GROUPS': {
      return Object.assign({}, state, {
        groups: [...action.group]
      });
    }
    default:
      return state;
  }
}