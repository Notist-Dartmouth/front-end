import 'whatwg-fetch';
import * as types from '../constants/ActionTypes';
import config from '../../server/config';

const headers = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
};

function handleSaveGroupSuccess(group) {
  return {
    type: types.RECEIVE_GROUP,
    group,
  };
}

export default function saveGroup(group) {
  return (dispatch, getState) =>
    fetch(`http://${config.apiHost}/api/group`, {
      method: 'POST',
      mode: 'cors',
      credentials: 'include',
      headers,
      body: JSON.stringify(group),
    })
    .then(res => res.json())
    .then((savedGroup) => {
      if (savedGroup.SUCCESS) {
        dispatch(handleSaveGroupSuccess(savedGroup.SUCCESS));
      } // TODO handle error
    });
}
