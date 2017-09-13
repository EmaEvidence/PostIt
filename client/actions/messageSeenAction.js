import axios from 'axios';

import { MARK_MESSAGE_AS_SEEN, MARK_MESSAGE_AS_SEEN_ERROR } from './types/types';

const messageSeenAction = messages => (dispatch) => {
  return axios.post('/api/v1/user/message/read', { messages })
    .then(res => dispatch({
      type: MARK_MESSAGE_AS_SEEN,
      status: res.data.message,
      message: res.data.messages
    })).catch(err => dispatch({
      status: err.response.data.message,
      type: MARK_MESSAGE_AS_SEEN_ERROR,
    }));
};

export default messageSeenAction;
