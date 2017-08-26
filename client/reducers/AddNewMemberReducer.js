export default function reducer(state = {
  status: ''
}, action) {
  switch (action.type) {
    case 'ADD_NEW_MEMBER': {
      return Object.assign({}, state, {
        status: action.status
      });
    }
    case 'CLEAR_ADD_NEW_MEMBER_STATUS': {
      return Object.assign({}, state, {
        status: ''
      });
    }
    default:
      return state;
  }
}
