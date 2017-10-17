import axios from 'axios';
import { CREATE_GROUP, CREATE_GROUP_ERROR } from './types/types';

const url = '/api/v1/group';

/**
 * createGroupAction create redux action
 * @method createGroupAction
 *
 * @param {object} groupData group details
 *
 * @return {function} redux action
 */
const createGroupAction = groupData => dispatch => axios.post(url, groupData)
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
      const message = error.response.data.message;
      Materialize.toast(message, 2500, 'red white-text rounded');
      dispatch({
        message,
        type: CREATE_GROUP_ERROR
      });
    });

export default createGroupAction;
