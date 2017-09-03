import axios from 'axios';
import { CLEAR_NOTIFICATION, CLEAR_NOTIFICATION_ERROR } from './types/types';

const clearNotificationAction = () => {
  alert('qwerty');
  return (dispatch) => {
    alert(1322323232332323);
    axios.get('/api/v1/user/notifications')
    .then((res) => {
      dispatch({
        type: CLEAR_NOTIFICATION,
        message: res.data.message
      });
    })
    .catch((err) => {
      dispatch({
        type: CLEAR_NOTIFICATION_ERROR,
        message: err.response.data.message
      });
    });
  };
};

export default clearNotificationAction;
