// @flow 

import uuid from 'uuid';
import expect from 'expect';
import { fromJS } from 'immutable';
import SagaTester from 'redux-saga-tester';
import type { AdapterInterface } from '../src/types';
import { constants, actions, createDefaultSaga } from '../src';

class Adapter implements AdapterInterface {
  dispatches = [];
  addDispatch = jest.fn();
  removeDispatch = jest.fn();
  recordSubscribe = jest.fn();
  recordUnsubscribe = jest.fn();
  listSubscribe = jest.fn();
  listUnsubscribe = jest.fn();
}

const adapter = new Adapter();

class FailingAdapter implements AdapterInterface {
  dispatches = [];
  addDispatch = jest.fn();
  removeDispatch = jest.fn();
  recordSubscribe = () => { throw new Error('Should fail'); };
  recordUnsubscribe = () => { throw new Error('Should fail'); };
  listSubscribe = () => { throw new Error('Should fail'); };
  listUnsubscribe = () => { throw new Error('Should fail'); };
}

const failingAdapter = new FailingAdapter();

test('Should call adapter.recordSubscribe', async () => {
  const name = uuid.v4();
  const sagaTester = new SagaTester({ initialState: fromJS({ deepstream: {} }) });
  sagaTester.start(createDefaultSaga(adapter));
  expect(adapter.recordSubscribe).toHaveBeenCalledTimes(0);
  sagaTester.dispatch(actions.recordSubscribe(name));
  expect(adapter.recordSubscribe).toHaveBeenCalledTimes(1);
});

test('Should call adapter.recordUnsubscribe', async () => {
  const name = uuid.v4();
  const sagaTester = new SagaTester({ initialState: fromJS({ deepstream: {} }) });
  sagaTester.start(createDefaultSaga(adapter));
  expect(adapter.recordUnsubscribe).toHaveBeenCalledTimes(0);
  sagaTester.dispatch(actions.recordUnsubscribe(name));
  expect(adapter.recordUnsubscribe).toHaveBeenCalledTimes(1);
});

test('Should dispatch RECORD_ERROR if the adapter fails on subscribe', async () => {
  const name = uuid.v4();
  const sagaTester = new SagaTester({ initialState: fromJS({ deepstream: {} }) });
  sagaTester.start(createDefaultSaga(failingAdapter));
  sagaTester.dispatch(actions.recordSubscribe(name));
  expect(sagaTester.wasCalled(constants.RECORD_ERROR)).toEqual(true);
});

test('Should dispatch RECORD_ERROR if the adapter fails on unsubscribe', async () => {
  const name = uuid.v4();
  const sagaTester = new SagaTester({ initialState: fromJS({ deepstream: {} }) });
  sagaTester.start(createDefaultSaga(failingAdapter));
  sagaTester.dispatch(actions.recordUnsubscribe(name));
  expect(sagaTester.wasCalled(constants.RECORD_ERROR)).toEqual(true);
});

test('Should call adapter.listSubscribe', async () => {
  const name = uuid.v4();
  const sagaTester = new SagaTester({ initialState: fromJS({ deepstream: {} }) });
  sagaTester.start(createDefaultSaga(adapter));
  expect(adapter.listSubscribe).toHaveBeenCalledTimes(0);
  sagaTester.dispatch(actions.listSubscribe(name));
  expect(adapter.listSubscribe).toHaveBeenCalledTimes(1);
});

test('Should call adapter.listUnsubscribe', async () => {
  const name = uuid.v4();
  const sagaTester = new SagaTester({ initialState: fromJS({ deepstream: {} }) });
  sagaTester.start(createDefaultSaga(adapter));
  expect(adapter.listUnsubscribe).toHaveBeenCalledTimes(0);
  sagaTester.dispatch(actions.listUnsubscribe(name));
  expect(adapter.listUnsubscribe).toHaveBeenCalledTimes(1);
});


test('Should dispatch LIST_ERROR if the adapter fails on subscribe', async () => {
  const name = uuid.v4();
  const sagaTester = new SagaTester({ initialState: fromJS({ deepstream: {} }) });
  sagaTester.start(createDefaultSaga(failingAdapter));
  sagaTester.dispatch(actions.listSubscribe(name));
  expect(sagaTester.wasCalled(constants.LIST_ERROR)).toEqual(true);
});

test('Should dispatch LIST_ERROR if the adapter fails on unsubscribe', async () => {
  const name = uuid.v4();
  const sagaTester = new SagaTester({ initialState: fromJS({ deepstream: {} }) });
  sagaTester.start(createDefaultSaga(failingAdapter));
  sagaTester.dispatch(actions.listUnsubscribe(name));
  expect(sagaTester.wasCalled(constants.LIST_ERROR)).toEqual(true);
});
