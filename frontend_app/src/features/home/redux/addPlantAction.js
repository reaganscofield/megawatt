import {
  HOME_ADD_PLANT_ACTION_BEGIN,
  HOME_ADD_PLANT_ACTION_SUCCESS,
  HOME_ADD_PLANT_ACTION_FAILURE,
  HOME_ADD_PLANT_ACTION_DISMISS_ERROR,
} from './constants';
import axios from 'axios';
import { HOST, PORT } from '../../../common/env_variables';

export function addPlantAction(args) {
  return (dispatch) => {
    dispatch({
      type: HOME_ADD_PLANT_ACTION_BEGIN,
    });


    const promise = new Promise((resolve, reject) => {

   
      axios.post(`http://${HOST}:${PORT}/api/plant/`, args).then(
        (res) => {
          dispatch({
            type: HOME_ADD_PLANT_ACTION_SUCCESS,
            data: res.data,
          });
          resolve(res);
        },
  
        (err) => {
          dispatch({
            type: HOME_ADD_PLANT_ACTION_FAILURE,
            data: { error: err },
          });
          reject(err);
        },
      );
    });

    return promise;
  };
}


export function dismissAddPlantActionError() {
  return {
    type: HOME_ADD_PLANT_ACTION_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case HOME_ADD_PLANT_ACTION_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        addPlantActionPending: true,
        addPlantActionError: null,
      };

    case HOME_ADD_PLANT_ACTION_SUCCESS:
      // The request is success
      return {
        ...state,
        addPlantActionPending: false,
        addPlantActionError: null,
      };

    case HOME_ADD_PLANT_ACTION_FAILURE:
      // The request is failed
      return {
        ...state,
        addPlantActionPending: false,
        addPlantActionError: action.data.error,
      };

    case HOME_ADD_PLANT_ACTION_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        addPlantActionError: null,
      };

    default:
      return state;
  }
}
