import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  HOME_PULL_DATA_ACTION_BEGIN,
  HOME_PULL_DATA_ACTION_SUCCESS,
  HOME_PULL_DATA_ACTION_FAILURE,
  HOME_PULL_DATA_ACTION_DISMISS_ERROR,
} from '../../../../src/features/home/redux/constants';

import {
  pullDataAction,
  dismissPullDataActionError,
  reducer,
} from '../../../../src/features/home/redux/pullDataAction';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('home/redux/pullDataAction', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when pullDataAction succeeds', () => {
    const store = mockStore({});

    return store.dispatch(pullDataAction())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', HOME_PULL_DATA_ACTION_BEGIN);
        expect(actions[1]).toHaveProperty('type', HOME_PULL_DATA_ACTION_SUCCESS);
      });
  });

  it('dispatches failure action when pullDataAction fails', () => {
    const store = mockStore({});

    return store.dispatch(pullDataAction({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', HOME_PULL_DATA_ACTION_BEGIN);
        expect(actions[1]).toHaveProperty('type', HOME_PULL_DATA_ACTION_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissPullDataActionError', () => {
    const expectedAction = {
      type: HOME_PULL_DATA_ACTION_DISMISS_ERROR,
    };
    expect(dismissPullDataActionError()).toEqual(expectedAction);
  });

  it('handles action type HOME_PULL_DATA_ACTION_BEGIN correctly', () => {
    const prevState = { pullUpdateActionPending: false };
    const state = reducer(
      prevState,
      { type: HOME_PULL_DATA_ACTION_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.pullUpdateActionPending).toBe(true);
  });

  it('handles action type HOME_PULL_DATA_ACTION_SUCCESS correctly', () => {
    const prevState = { pullUpdateActionPending: true };
    const state = reducer(
      prevState,
      { type: HOME_PULL_DATA_ACTION_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.pullUpdateActionPending).toBe(false);
  });

  it('handles action type HOME_PULL_DATA_ACTION_FAILURE correctly', () => {
    const prevState = { pullUpdateActionPending: true };
    const state = reducer(
      prevState,
      { type: HOME_PULL_DATA_ACTION_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.pullUpdateActionPending).toBe(false);
    expect(state.pullUpdateActionError).toEqual(expect.anything());
  });

  it('handles action type HOME_PULL_DATA_ACTION_DISMISS_ERROR correctly', () => {
    const prevState = { pullUpdateActionError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: HOME_PULL_DATA_ACTION_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.pullUpdateActionError).toBe(null);
  });
});

