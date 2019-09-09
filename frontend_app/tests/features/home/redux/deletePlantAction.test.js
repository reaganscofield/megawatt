import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  HOME_DELETE_PLANT_ACTION_BEGIN,
  HOME_DELETE_PLANT_ACTION_SUCCESS,
  HOME_DELETE_PLANT_ACTION_FAILURE,
  HOME_DELETE_PLANT_ACTION_DISMISS_ERROR,
} from '../../../../src/features/home/redux/constants';

import {
  deletePlantAction,
  dismissDeletePlantActionError,
  reducer,
} from '../../../../src/features/home/redux/deletePlantAction';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('home/redux/deletePlantAction', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when deletePlantAction succeeds', () => {
    const store = mockStore({});

    return store.dispatch(deletePlantAction())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', HOME_DELETE_PLANT_ACTION_BEGIN);
        expect(actions[1]).toHaveProperty('type', HOME_DELETE_PLANT_ACTION_SUCCESS);
      });
  });

  it('dispatches failure action when deletePlantAction fails', () => {
    const store = mockStore({});

    return store.dispatch(deletePlantAction({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', HOME_DELETE_PLANT_ACTION_BEGIN);
        expect(actions[1]).toHaveProperty('type', HOME_DELETE_PLANT_ACTION_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissDeletePlantActionError', () => {
    const expectedAction = {
      type: HOME_DELETE_PLANT_ACTION_DISMISS_ERROR,
    };
    expect(dismissDeletePlantActionError()).toEqual(expectedAction);
  });

  it('handles action type HOME_DELETE_PLANT_ACTION_BEGIN correctly', () => {
    const prevState = { deletePlantActionPending: false };
    const state = reducer(
      prevState,
      { type: HOME_DELETE_PLANT_ACTION_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.deletePlantActionPending).toBe(true);
  });

  it('handles action type HOME_DELETE_PLANT_ACTION_SUCCESS correctly', () => {
    const prevState = { deletePlantActionPending: true };
    const state = reducer(
      prevState,
      { type: HOME_DELETE_PLANT_ACTION_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.deletePlantActionPending).toBe(false);
  });

  it('handles action type HOME_DELETE_PLANT_ACTION_FAILURE correctly', () => {
    const prevState = { deletePlantActionPending: true };
    const state = reducer(
      prevState,
      { type: HOME_DELETE_PLANT_ACTION_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.deletePlantActionPending).toBe(false);
    expect(state.deletePlantActionError).toEqual(expect.anything());
  });

  it('handles action type HOME_DELETE_PLANT_ACTION_DISMISS_ERROR correctly', () => {
    const prevState = { deletePlantActionError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: HOME_DELETE_PLANT_ACTION_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.deletePlantActionError).toBe(null);
  });
});

