import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  HOME_ADD_PLANT_ACTION_BEGIN,
  HOME_ADD_PLANT_ACTION_SUCCESS,
  HOME_ADD_PLANT_ACTION_FAILURE,
  HOME_ADD_PLANT_ACTION_DISMISS_ERROR,
} from '../../../../src/features/home/redux/constants';

import {
  addPlantAction,
  dismissAddPlantActionError,
  reducer,
} from '../../../../src/features/home/redux/addPlantAction';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('home/redux/addPlantAction', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when addPlantAction succeeds', () => {
    const store = mockStore({});

    return store.dispatch(addPlantAction())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', HOME_ADD_PLANT_ACTION_BEGIN);
        expect(actions[1]).toHaveProperty('type', HOME_ADD_PLANT_ACTION_SUCCESS);
      });
  });

  it('dispatches failure action when addPlantAction fails', () => {
    const store = mockStore({});

    return store.dispatch(addPlantAction({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', HOME_ADD_PLANT_ACTION_BEGIN);
        expect(actions[1]).toHaveProperty('type', HOME_ADD_PLANT_ACTION_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissAddPlantActionError', () => {
    const expectedAction = {
      type: HOME_ADD_PLANT_ACTION_DISMISS_ERROR,
    };
    expect(dismissAddPlantActionError()).toEqual(expectedAction);
  });

  it('handles action type HOME_ADD_PLANT_ACTION_BEGIN correctly', () => {
    const prevState = { addPlantActionPending: false };
    const state = reducer(
      prevState,
      { type: HOME_ADD_PLANT_ACTION_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.addPlantActionPending).toBe(true);
  });

  it('handles action type HOME_ADD_PLANT_ACTION_SUCCESS correctly', () => {
    const prevState = { addPlantActionPending: true };
    const state = reducer(
      prevState,
      { type: HOME_ADD_PLANT_ACTION_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.addPlantActionPending).toBe(false);
  });

  it('handles action type HOME_ADD_PLANT_ACTION_FAILURE correctly', () => {
    const prevState = { addPlantActionPending: true };
    const state = reducer(
      prevState,
      { type: HOME_ADD_PLANT_ACTION_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.addPlantActionPending).toBe(false);
    expect(state.addPlantActionError).toEqual(expect.anything());
  });

  it('handles action type HOME_ADD_PLANT_ACTION_DISMISS_ERROR correctly', () => {
    const prevState = { addPlantActionError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: HOME_ADD_PLANT_ACTION_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.addPlantActionError).toBe(null);
  });
});

