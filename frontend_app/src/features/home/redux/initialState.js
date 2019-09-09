const initialState = {
  dynamicChartsActionPending: false,
  dynamicChartsActionError: null,
  report_data: [],
  
  addPlantActionPending: false,
  addPlantActionError: null,

  pullDataActionPending: false,
  pullDataActionError: null,
  pull_data_response: [],

  deletePlantActionPending: false,
  deletePlantActionError: null,

  updateDataPointActionPending: false,
  updateDataPointActionError: null,

  pullPlantActionPending: false,
  pullPlantActionError: null,
  plant_data_response: [],
};

export default initialState;
