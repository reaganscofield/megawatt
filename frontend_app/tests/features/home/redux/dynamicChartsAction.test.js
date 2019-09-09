import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  HOME_DYNAMIC_CHARTS_ACTION_BEGIN,
  HOME_DYNAMIC_CHARTS_ACTION_SUCCESS,
  HOME_DYNAMIC_CHARTS_ACTION_FAILURE,
  HOME_DYNAMIC_CHARTS_ACTION_DISMISS_ERROR,
} from '../../../../src/features/home/redux/constants';

import {
  dynamicChartsAction,
  dismissDynamicChartsActionError,
  reducer,
} from '../../../../src/features/home/redux/dynamicChartsAction';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('home/redux/dynamicChartsAction', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when dynamicChartsAction succeeds', () => {
    const store = mockStore({});

    return store.dispatch(dynamicChartsAction())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', HOME_DYNAMIC_CHARTS_ACTION_BEGIN);
        expect(actions[1]).toHaveProperty('type', HOME_DYNAMIC_CHARTS_ACTION_SUCCESS);
      });
  });

  it('dispatches failure action when dynamicChartsAction fails', () => {
    const store = mockStore({});

    return store.dispatch(dynamicChartsAction({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', HOME_DYNAMIC_CHARTS_ACTION_BEGIN);
        expect(actions[1]).toHaveProperty('type', HOME_DYNAMIC_CHARTS_ACTION_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissDynamicChartsActionError', () => {
    const expectedAction = {
      type: HOME_DYNAMIC_CHARTS_ACTION_DISMISS_ERROR,
    };
    expect(dismissDynamicChartsActionError()).toEqual(expectedAction);
  });

  it('handles action type HOME_DYNAMIC_CHARTS_ACTION_BEGIN correctly', () => {
    const prevState = { dynamicChartsActionPending: false };
    const state = reducer(
      prevState,
      { type: HOME_DYNAMIC_CHARTS_ACTION_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.dynamicChartsActionPending).toBe(true);
  });

  it('handles action type HOME_DYNAMIC_CHARTS_ACTION_SUCCESS correctly', () => {
    const prevState = { dynamicChartsActionPending: true };
    const state = reducer(
      prevState,
      { type: HOME_DYNAMIC_CHARTS_ACTION_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.dynamicChartsActionPending).toBe(false);
  });

  it('handles action type HOME_DYNAMIC_CHARTS_ACTION_FAILURE correctly', () => {
    const prevState = { dynamicChartsActionPending: true };
    const state = reducer(
      prevState,
      { type: HOME_DYNAMIC_CHARTS_ACTION_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.dynamicChartsActionPending).toBe(false);
    expect(state.dynamicChartsActionError).toEqual(expect.anything());
  });

  it('handles action type HOME_DYNAMIC_CHARTS_ACTION_DISMISS_ERROR correctly', () => {
    const prevState = { dynamicChartsActionError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: HOME_DYNAMIC_CHARTS_ACTION_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.dynamicChartsActionError).toBe(null);
  });
});

