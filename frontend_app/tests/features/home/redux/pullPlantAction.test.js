import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  HOME_PULL_PLANT_ACTION_BEGIN,
  HOME_PULL_PLANT_ACTION_SUCCESS,
  HOME_PULL_PLANT_ACTION_FAILURE,
  HOME_PULL_PLANT_ACTION_DISMISS_ERROR,
} from '../../../../src/features/home/redux/constants';

import {
  pullPlantAction,
  dismissPullPlantActionError,
  reducer,
} from '../../../../src/features/home/redux/pullPlantAction';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('home/redux/pullPlantAction', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when pullPlantAction succeeds', () => {
    const store = mockStore({});

    return store.dispatch(pullPlantAction())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', HOME_PULL_PLANT_ACTION_BEGIN);
        expect(actions[1]).toHaveProperty('type', HOME_PULL_PLANT_ACTION_SUCCESS);
      });
  });

  it('dispatches failure action when pullPlantAction fails', () => {
    const store = mockStore({});

    return store.dispatch(pullPlantAction({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', HOME_PULL_PLANT_ACTION_BEGIN);
        expect(actions[1]).toHaveProperty('type', HOME_PULL_PLANT_ACTION_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissPullPlantActionError', () => {
    const expectedAction = {
      type: HOME_PULL_PLANT_ACTION_DISMISS_ERROR,
    };
    expect(dismissPullPlantActionError()).toEqual(expectedAction);
  });

  it('handles action type HOME_PULL_PLANT_ACTION_BEGIN correctly', () => {
    const prevState = { pullPlantActionPending: false };
    const state = reducer(
      prevState,
      { type: HOME_PULL_PLANT_ACTION_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.pullPlantActionPending).toBe(true);
  });

  it('handles action type HOME_PULL_PLANT_ACTION_SUCCESS correctly', () => {
    const prevState = { pullPlantActionPending: true };
    const state = reducer(
      prevState,
      { type: HOME_PULL_PLANT_ACTION_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.pullPlantActionPending).toBe(false);
  });

  it('handles action type HOME_PULL_PLANT_ACTION_FAILURE correctly', () => {
    const prevState = { pullPlantActionPending: true };
    const state = reducer(
      prevState,
      { type: HOME_PULL_PLANT_ACTION_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.pullPlantActionPending).toBe(false);
    expect(state.pullPlantActionError).toEqual(expect.anything());
  });

  it('handles action type HOME_PULL_PLANT_ACTION_DISMISS_ERROR correctly', () => {
    const prevState = { pullPlantActionError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: HOME_PULL_PLANT_ACTION_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.pullPlantActionError).toBe(null);
  });
});

