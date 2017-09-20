// @flow 

import expect from 'expect';
import uuid from 'uuid';
import { combineReducers } from 'redux-immutable';
import { actions, reducer as deepstreamReducer, selectors } from '../src';

const reducer = combineReducers({
  deepstream: deepstreamReducer,
});

test('Should handle RECORD_UPDATE actions.', async () => {
  const name = uuid.v4();
  const value = {
    [uuid.v4()]: uuid.v4(),
  };
  let state = reducer(undefined, { action: uuid.v4(), value: uuid.v4() });
  expect(() => selectors.recordSelector(state, name)).toThrow(/Unable to get/);
  state = reducer(state, actions.recordUpdate(name, value));
  expect(selectors.recordSelector(state, name).toJS()).toEqual(value);
});

test('Should handle RECORD_DELETE actions.', async () => {
  const name = uuid.v4();
  const value = {
    [uuid.v4()]: uuid.v4(),
  };
  let state = reducer(undefined, actions.recordUpdate(name, value));
  expect(selectors.recordSelector(state, name).toJS()).toEqual(value);
  state = reducer(state, actions.recordDelete(name));
  expect(() => selectors.recordSelector(state, name)).toThrow(/Unable to get/);
});

test('Should handle LIST_UPDATE actions.', async () => {
  const name = uuid.v4();
  const value = [uuid.v4(), uuid.v4(), uuid.v4()];
  let state = reducer(undefined, { action: uuid.v4(), value: uuid.v4() });
  expect(() => selectors.listSelector(state, name)).toThrow(/Unable to get/);
  state = reducer(state, actions.listUpdate(name, value));
  expect(selectors.listSelector(state, name).toJS()).toEqual(value);
});

test('Should handle LIST_DELETE actions.', async () => {
  const name = uuid.v4();
  const value = [uuid.v4(), uuid.v4(), uuid.v4()];
  let state = reducer(undefined, actions.listUpdate(name, value));
  expect(selectors.listSelector(state, name).toJS()).toEqual(value);
  state = reducer(state, actions.listDelete(name));
  expect(() => selectors.listSelector(state, name)).toThrow(/Unable to get/);
});
