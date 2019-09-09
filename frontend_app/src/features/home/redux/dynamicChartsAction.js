import {
  HOME_DYNAMIC_CHARTS_ACTION_BEGIN,
  HOME_DYNAMIC_CHARTS_ACTION_SUCCESS,
  HOME_DYNAMIC_CHARTS_ACTION_FAILURE,
  HOME_DYNAMIC_CHARTS_ACTION_DISMISS_ERROR,
} from './constants';
import axios from 'axios';
import { HOST, PORT } from '../../../common/env_variables';

export function dynamicChartsAction(dateFrom, dateTo) {
  return (dispatch) => { 
    dispatch({
      type: HOME_DYNAMIC_CHARTS_ACTION_BEGIN,
    });
    const promise = new Promise((resolve, reject) => {
      axios.get(`http://${HOST}:${PORT}/api/filtered_datapoint/?date_from=${dateFrom}&date_to=${dateTo}`).then(
        (res) => {
          dispatch({
            type: HOME_DYNAMIC_CHARTS_ACTION_SUCCESS,
            data: res.data,
          });
          resolve(res);
        },
        (err) => {
          dispatch({
            type: HOME_DYNAMIC_CHARTS_ACTION_FAILURE,
            data: { error: err },
          });
          reject(err);
        },
      );
    });
    return promise;
  };
}


export function dismissDynamicChartsActionError() {
  return {
    type: HOME_DYNAMIC_CHARTS_ACTION_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case HOME_DYNAMIC_CHARTS_ACTION_BEGIN:
      return {
        ...state,
        dynamicChartsActionPending: true,
        dynamicChartsActionError: null,
      };

    case HOME_DYNAMIC_CHARTS_ACTION_SUCCESS:
      return {
        ...state,
        dynamicChartsActionPending: false,
        dynamicChartsActionError: null,
        report_data: action.data,
      };

    case HOME_DYNAMIC_CHARTS_ACTION_FAILURE:
      return {
        ...state,
        dynamicChartsActionPending: false,
        dynamicChartsActionError: action.data.error,
      };

    case HOME_DYNAMIC_CHARTS_ACTION_DISMISS_ERROR:
      return {
        ...state,
        dynamicChartsActionError: null,
      };

    default:
      return state;
  }
}
