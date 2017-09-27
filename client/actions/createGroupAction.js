import axios from 'axios';
import { CREATE_GROUP, CREATE_GROUP_ERROR } from './types/types';

const createGroupAction = groupData => dispatch => axios.post('/api/v1/group', groupData)
    .then((res) => {
      $('.modal').modal('close');
      Materialize.toast(res.data.message, 2500, 'green white-text rounded');
      dispatch({
        message: res.data.message,
        type: CREATE_GROUP,
        group: res.data.group
      });
    })
    .catch((error) => {
      Materialize.toast(error.response.data.message, 2500, 'red white-text rounded');
      dispatch({
        message: error.response.data.message,
        type: CREATE_GROUP_ERROR
      });
    });

export default createGroupAction;
