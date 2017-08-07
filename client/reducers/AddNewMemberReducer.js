export default function reducer(state = {
  status: ''

}, action) {
  switch (action.type) {
    case 'ADD_NEW_MEMBER': {
      return Object.assign({}, state, {
        status: action.status
      });
    }
    default:
      return state;
  }
}
