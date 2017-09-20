// @flow 

import uuid from 'uuid';
import expect from 'expect';
import { actions, constants } from '../src';

test('Should create an action to subscribe to a record.', () => {
  const name = uuid.v4();
  const expected = {
    type: constants.RECORD_SUBSCRIBE,
    value: name,
  };
  expect(actions.recordSubscribe(name)).toEqual(expected);
});

test('Should create an action to unsubscribe from a record.', () => {
  const name = uuid.v4();
  const expected = {
    type: constants.RECORD_UNSUBSCRIBE,
    value: name,
  };
  expect(actions.recordUnsubscribe(name)).toEqual(expected);
});

test('Should create an action when a record is deleted.', () => {
  const name = uuid.v4();
  const expected = {
    type: constants.RECORD_DELETE,
    value: name,
  };
  expect(actions.recordDelete(name)).toEqual(expected);
});

test('Should create an action to update a record.', () => {
  const name = uuid.v4();
  const value = {
    [uuid.v4()]: uuid.v4(),
  };
  const expected = {
    type: constants.RECORD_UPDATE,
    value: {
      name,
      value,
    },
  };
  expect(actions.recordUpdate(name, value)).toEqual(expected);
});

test('Should create an action to subscribe to a list.', () => {
  const name = uuid.v4();
  const expected = {
    type: constants.LIST_SUBSCRIBE,
    value: name,
  };
  expect(actions.listSubscribe(name)).toEqual(expected);
});

test('Should create an action to unsubscribe from a list.', () => {
  const name = uuid.v4();
  const expected = {
    type: constants.LIST_UNSUBSCRIBE,
    value: name,
  };
  expect(actions.listUnsubscribe(name)).toEqual(expected);
});

test('Should create an action to update a list.', () => {
  const name = uuid.v4();
  const value = [uuid.v4(), uuid.v4(), uuid.v4()];
  const expected = {
    type: constants.LIST_UPDATE,
    value: {
      name,
      value,
    },
  };
  expect(actions.listUpdate(name, value)).toEqual(expected);
});

test('Should create an action when a list is deleted.', () => {
  const name = uuid.v4();
  const expected = {
    type: constants.LIST_DELETE,
    value: name,
  };
  expect(actions.listDelete(name)).toEqual(expected);
});

