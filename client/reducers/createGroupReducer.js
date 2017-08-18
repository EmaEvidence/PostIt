export default function reducer(state = {
  status: ''
}, action) {
  switch (action.type) {
    case 'CREATE_GROUP': {
      return Object.assign({}, state, {
        status: action.message
      });
    }
    case 'CREATE_GROUP_ERROR': {
      return Object.assign({}, state, {
        status: action.message
      });
    }
    default:
      return state;
  }
}
