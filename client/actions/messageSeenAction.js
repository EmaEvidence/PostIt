import axios from 'axios';

import { MARK_MESSAGE_AS_SEEN, MARK_MESSAGE_AS_SEEN_ERROR } from './types/types';

const messageSeenAction = messages => (dispatch) => {
  axios.post('/api/v1/user/message/read', { messages })
    .then((res) => {
      return dispatch({
        // type: MARK_MESSAGE_AS_SEEN,
        // status: res.data.message,
        // message: res.data.messages
      });
    }).catch((err) => {
      const status = err.response.data.message;
      return dispatch({
        // type: MARK_MESSAGE_AS_SEEN_ERROR,
        // status,
      });
    });
};

export default messageSeenAction;
