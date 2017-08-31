/**
 * [reducer adds addMember action result to the store]
 * @method reducer
 * @param  {Object} [state={               status: ''}] [Progress message of the action]
 * @param  {[string]} action   [ the name of the action carried out]
 * @return {[object]}          [the changed store]
 */
export default function reducer(state = {
  status: ''
}, action) {
  switch (action.type) {
    case 'ADD_NEW_MEMBER': {
      return { ...state, status: action.status };
    }
    case 'CLEAR_ADD_NEW_MEMBER_STATUS': {
      return { ...state, status: '' };
    }
    default:
      return state;
  }
}
