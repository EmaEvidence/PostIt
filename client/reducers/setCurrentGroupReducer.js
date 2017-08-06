export default function reducer(state = {
  current_group: ''
}, action) {
  switch (action.type) {
    case 'SET_CURRENT_GROUP_ID': {
      return Object.assign({}, state, {
        current_group: action.current_group
      });
    }
    default:
      return state;
  }
}
