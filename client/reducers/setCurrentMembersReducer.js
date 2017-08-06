export default function reducer(state = {
  current_members: {},
  status: '',
  current_group: ''
}, action) {
  switch (action.type) {
    case 'SET_CURRENT_MEMBERS': {
      return Object.assign({}, state, {
        current_members: action.messages,
        status: action.status,
        current_group: action.groupName
      });
    }
    default:
      return state;
  }
}
