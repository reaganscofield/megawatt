import {
  HOME_DELETE_PLANT_ACTION_BEGIN,
  HOME_DELETE_PLANT_ACTION_SUCCESS,
  HOME_DELETE_PLANT_ACTION_FAILURE,
  HOME_DELETE_PLANT_ACTION_DISMISS_ERROR,
} from './constants';
import axios from 'axios';
import { HOST, PORT } from '../../../common/env_variables';


export function deletePlantAction(id) {
  return (dispatch) => { 
    dispatch({
      type: HOME_DELETE_PLANT_ACTION_BEGIN,
    });

    const promise = new Promise((resolve, reject) => {
   
      axios.delete(`http://${HOST}:${PORT}/api/plant/${id}`).then(
        (res) => {
          dispatch({
            type: HOME_DELETE_PLANT_ACTION_SUCCESS,
            data: res.data,
          });
          resolve(res);
        },
        (err) => {
          dispatch({
            type: HOME_DELETE_PLANT_ACTION_FAILURE,
            data: { error: err },
          });
          reject(err);
        },
      );
    });

    return promise;
  };
}

export function dismissDeletePlantActionError() {
  return {
    type: HOME_DELETE_PLANT_ACTION_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case HOME_DELETE_PLANT_ACTION_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        deletePlantActionPending: true,
        deletePlantActionError: null,
      };

    case HOME_DELETE_PLANT_ACTION_SUCCESS:
      // The request is success
      return {
        ...state,
        deletePlantActionPending: false,
        deletePlantActionError: null,
      };

    case HOME_DELETE_PLANT_ACTION_FAILURE:
      // The request is failed
      return {
        ...state,
        deletePlantActionPending: false,
        deletePlantActionError: action.data.error,
      };

    case HOME_DELETE_PLANT_ACTION_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        deletePlantActionError: null,
      };

    default:
      return state;
  }
}
