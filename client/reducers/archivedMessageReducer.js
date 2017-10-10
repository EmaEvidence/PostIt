/**
 * archivedMessageReducer
 * @method reducer
 *
 * @param  {Object} state initial state
 * @param  {object} action
 *
 * @return {object} state new state
 */
 const archivedMessageReducer = (state = {
   archivedMessages: [],
   status: '',
   currentGroup: ''
 }, action) => {
   switch (action.type) {
     case 'GET_ARCHIVED_MESSAGE': {
       return { ...state,
         archivedMessages: action.messages,
         status: action.status,
         currentGroup: action.groupName };
     }
     case 'GET_ARCHIVED_MESSAGE_ERROR': {
       return { ...state,
         archivedMessages: [],
         status: action.status,
         currentGroup: action.groupName };
     }
     default:
       return state;
   }
 };

 export default archivedMessageReducer;
