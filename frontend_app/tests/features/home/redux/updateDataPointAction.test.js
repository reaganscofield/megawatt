import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  HOME_UPDATE_DATA_POINT_ACTION_BEGIN,
  HOME_UPDATE_DATA_POINT_ACTION_SUCCESS,
  HOME_UPDATE_DATA_POINT_ACTION_FAILURE,
  HOME_UPDATE_DATA_POINT_ACTION_DISMISS_ERROR,
} from '../../../../src/features/home/redux/constants';

import {
  updateDataPointAction,
  dismissUpdateDataPointActionError,
  reducer,
} from '../../../../src/features/home/redux/updateDataPointAction';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('home/redux/updateDataPointAction', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when updateDataPointAction succeeds', () => {
    const store = mockStore({});

    return store.dispatch(updateDataPointAction())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', HOME_UPDATE_DATA_POINT_ACTION_BEGIN);
        expect(actions[1]).toHaveProperty('type', HOME_UPDATE_DATA_POINT_ACTION_SUCCESS);
      });
  });

  it('dispatches failure action when updateDataPointAction fails', () => {
    const store = mockStore({});

    return store.dispatch(updateDataPointAction({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', HOME_UPDATE_DATA_POINT_ACTION_BEGIN);
        expect(actions[1]).toHaveProperty('type', HOME_UPDATE_DATA_POINT_ACTION_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissUpdateDataPointActionError', () => {
    const expectedAction = {
      type: HOME_UPDATE_DATA_POINT_ACTION_DISMISS_ERROR,
    };
    expect(dismissUpdateDataPointActionError()).toEqual(expectedAction);
  });

  it('handles action type HOME_UPDATE_DATA_POINT_ACTION_BEGIN correctly', () => {
    const prevState = { updateDataPointActionPending: false };
    const state = reducer(
      prevState,
      { type: HOME_UPDATE_DATA_POINT_ACTION_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.updateDataPointActionPending).toBe(true);
  });

  it('handles action type HOME_UPDATE_DATA_POINT_ACTION_SUCCESS correctly', () => {
    const prevState = { updateDataPointActionPending: true };
    const state = reducer(
      prevState,
      { type: HOME_UPDATE_DATA_POINT_ACTION_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.updateDataPointActionPending).toBe(false);
  });

  it('handles action type HOME_UPDATE_DATA_POINT_ACTION_FAILURE correctly', () => {
    const prevState = { updateDataPointActionPending: true };
    const state = reducer(
      prevState,
      { type: HOME_UPDATE_DATA_POINT_ACTION_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.updateDataPointActionPending).toBe(false);
    expect(state.updateDataPointActionError).toEqual(expect.anything());
  });

  it('handles action type HOME_UPDATE_DATA_POINT_ACTION_DISMISS_ERROR correctly', () => {
    const prevState = { updateDataPointActionError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: HOME_UPDATE_DATA_POINT_ACTION_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.updateDataPointActionError).toBe(null);
  });
});

