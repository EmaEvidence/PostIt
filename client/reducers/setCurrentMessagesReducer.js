export default function reducer(state = {
  current_messages: {},
  status: '',
  current_group: ''
}, action) {
  switch (action.type) {
    case 'SET_CURRENT_MESSAGES': {
      return Object.assign({}, state, {
        current_messages: action.messages,
        status: action.status,
        current_group: action.groupName
      });
    }
    default:
      return state;
  }
}
