import {
  HOME_UPDATE_DATA_POINT_ACTION_BEGIN,
  HOME_UPDATE_DATA_POINT_ACTION_SUCCESS,
  HOME_UPDATE_DATA_POINT_ACTION_FAILURE,
  HOME_UPDATE_DATA_POINT_ACTION_DISMISS_ERROR,
} from './constants';
import axios from 'axios'
import { HOST, PORT } from '../../../common/env_variables';

export function updateDataPointAction(id, args) {
  return (dispatch) => { 
    dispatch({
      type: HOME_UPDATE_DATA_POINT_ACTION_BEGIN,
    });

    const promise = new Promise((resolve, reject) => {
      axios.put(`http://${HOST}:${PORT}/api/data_point/${id}/`, args).then(
        (res) => {
          dispatch({
            type: HOME_UPDATE_DATA_POINT_ACTION_SUCCESS,
            data: res.data,
          });
          resolve(res);
        },
        (err) => {
          dispatch({
            type: HOME_UPDATE_DATA_POINT_ACTION_FAILURE,
            data: { error: err },
          });
          reject(err);
        },
      );
    });

    return promise;
  };
}

export function dismissUpdateDataPointActionError() {
  return {
    type: HOME_UPDATE_DATA_POINT_ACTION_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case HOME_UPDATE_DATA_POINT_ACTION_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        updateDataPointActionPending: true,
        updateDataPointActionError: null,
      };

    case HOME_UPDATE_DATA_POINT_ACTION_SUCCESS:
      // The request is success
      return {
        ...state,
        updateDataPointActionPending: false,
        updateDataPointActionError: null,
      };

    case HOME_UPDATE_DATA_POINT_ACTION_FAILURE:
      // The request is failed
      return {
        ...state,
        updateDataPointActionPending: false,
        updateDataPointActionError: action.data.error,
      };

    case HOME_UPDATE_DATA_POINT_ACTION_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        updateDataPointActionError: null,
      };

    default:
      return state;
  }
}
