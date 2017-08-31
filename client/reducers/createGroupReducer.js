export default function reducer(state = {
  status: '',
}, action) {
  switch (action.type) {
    case 'CREATE_GROUP': {
      return { ...state, status: action.message };
    }
    case 'CREATE_GROUP_ERROR': {
      return { ...state, status: action.message };
    }
    case 'CLEAR_CREATE_GROUP_STATUS': {
      return { ...state, status: '' };
    }
    default:
      return state;
  }
}
