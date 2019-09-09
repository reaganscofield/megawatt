import {
  HOME_PULL_PLANT_ACTION_BEGIN,
  HOME_PULL_PLANT_ACTION_SUCCESS,
  HOME_PULL_PLANT_ACTION_FAILURE,
  HOME_PULL_PLANT_ACTION_DISMISS_ERROR,
} from './constants';
import axios from 'axios';
import { HOST, PORT } from '../../../common/env_variables';

export function pullPlantAction() {
  return (dispatch) => { 
    dispatch({
      type: HOME_PULL_PLANT_ACTION_BEGIN,
    });
    const promise = new Promise((resolve, reject) => {
      axios.get(`http://${HOST}:${PORT}/api/plant/`).then(
        (res) => {
          dispatch({
            type: HOME_PULL_PLANT_ACTION_SUCCESS,
            data: res.data,
          });
          resolve(res);
        },

        (err) => {
          dispatch({
            type: HOME_PULL_PLANT_ACTION_FAILURE,
            data: { error: err },
          });
          reject(err);
        },
      );
    });

    return promise;
  };
}

export function dismissPullPlantActionError() {
  return {
    type: HOME_PULL_PLANT_ACTION_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case HOME_PULL_PLANT_ACTION_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        pullPlantActionPending: true,
        pullPlantActionError: null,
      };

    case HOME_PULL_PLANT_ACTION_SUCCESS:
      // The request is success
      return {
        ...state,
        pullPlantActionPending: false,
        pullPlantActionError: null,
        plant_data_response: action.data,
      };

    case HOME_PULL_PLANT_ACTION_FAILURE:
      // The request is failed
      return {
        ...state,
        pullPlantActionPending: false,
        pullPlantActionError: action.data.error,
      };

    case HOME_PULL_PLANT_ACTION_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        pullPlantActionError: null,
      };

    default:
      return state;
  }
}
