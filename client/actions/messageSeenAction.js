import axios from 'axios';

const messageSeenAction = messages => (dispatch) => {
  axios.post('/api/v1/user/message/read', { messages })
    .then((res) => {
      console.log(messages, '======-========Success=============================');
    }).catch((err) => {
      console.log(messages, '======-=========error============================');
    });
};

export default messageSeenAction;
