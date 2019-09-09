import {
  HOME_PULL_DATA_ACTION_BEGIN,
  HOME_PULL_DATA_ACTION_SUCCESS,
  HOME_PULL_DATA_ACTION_FAILURE,
  HOME_PULL_DATA_ACTION_DISMISS_ERROR,
} from './constants';
import axios from 'axios';
import { HOST, PORT } from '../../../common/env_variables';

export function pullDataAction() {
  return (dispatch) => { 
    dispatch({
      type: HOME_PULL_DATA_ACTION_BEGIN,
    });
 
    const promise = new Promise((resolve, reject) => {
      axios.get(`http://${HOST}:${PORT}/api/data_point/`).then(
        (res) => {
          dispatch({
            type: HOME_PULL_DATA_ACTION_SUCCESS,
            data: res.data,
          });
          resolve(res);
        },
        (err) => {
          dispatch({
            type: HOME_PULL_DATA_ACTION_FAILURE,
            data: { error: err },
          });
          reject(err);
        },
      );
    });

    return promise;
  };
}

export function dismissPullDataActionError() {
  return {
    type: HOME_PULL_DATA_ACTION_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case HOME_PULL_DATA_ACTION_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        pullDataActionPending: true,
        pullDataActionError: null,
      };

    case HOME_PULL_DATA_ACTION_SUCCESS:
      // The request is success
      return {
        ...state,
        pullDataActionPending: false,
        pullDataActionError: null,
        pull_data_response: action.data,
      };

    case HOME_PULL_DATA_ACTION_FAILURE:
      // The request is failed
      return {
        ...state,
        pullDataActionPending: false,
        pullDataActionError: action.data.error,
      };

    case HOME_PULL_DATA_ACTION_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        pullDataActionError: null,
      };

    default:
      return state;
  }
}
