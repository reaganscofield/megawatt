import initialState from './initialState';
import { reducer as dynamicChartsActionReducer } from './dynamicChartsAction';
import { reducer as addPlantActionReducer } from './addPlantAction';
import { reducer as pullDataActionReducer } from './pullDataAction';
import { reducer as deletePlantActionReducer } from './deletePlantAction';
import { reducer as updateDataPointActionReducer } from './updateDataPointAction';
import { reducer as pullPlantActionReducer } from './pullPlantAction';

const reducers = [
  dynamicChartsActionReducer,
  addPlantActionReducer,
  pullDataActionReducer,
  deletePlantActionReducer,
  updateDataPointActionReducer,
  pullPlantActionReducer,
];

export default function reducer(state = initialState, action) {
  let newState;
  switch (action.type) {
    // Handle cross-topic actions here
    default:
      newState = state;
      break;
  }
  /* istanbul ignore next */
  return reducers.reduce((s, r) => r(s, action), newState);
}
