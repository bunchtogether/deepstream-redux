// @flow

import { put, call, takeEvery } from 'redux-saga/effects';
import type { IOEffect } from 'redux-saga/effects';
import type { ActionType, AdapterInterface, DefaultSagaType } from './types';
import * as constants from './constants';

export function* recordSubscribeSaga(adapter: AdapterInterface, action: ActionType): Generator<IOEffect, *, *> {
  try {
    yield call(adapter.recordSubscribe, action.value);
  } catch (error) {
    yield put({
      type: constants.RECORD_ERROR,
      value: {
        name: action.value,
      },
    });
  }
}

export function* recordUnsubscribeSaga(adapter: AdapterInterface, action: ActionType): Generator<IOEffect, *, *> {
  try {
    yield call(adapter.recordUnsubscribe, action.value);
  } catch (error) {
    yield put({
      type: constants.RECORD_ERROR,
      value: {
        name: action.value,
      },
    });
  }
}

export function* listSubscribeSaga(adapter: AdapterInterface, action: ActionType): Generator<IOEffect, *, *> {
  try {
    yield call(adapter.listSubscribe, action.value);
  } catch (error) {
    yield put({
      type: constants.LIST_ERROR,
      value: {
        name: action.value,
      },
    });
  }
}

export function* listUnsubscribeSaga(adapter: AdapterInterface, action: ActionType): Generator<IOEffect, *, *> {
  try {
    yield call(adapter.listUnsubscribe, action.value);
  } catch (error) {
    yield put({
      type: constants.LIST_ERROR,
      value: {
        name: action.value,
      },
    });
  }
}

export default function createDefaultSaga(adapter: AdapterInterface): DefaultSagaType {
  return function* (): Generator<IOEffect, *, *> {
    yield takeEvery(constants.RECORD_SUBSCRIBE, recordSubscribeSaga, adapter);
    yield takeEvery(constants.RECORD_UNSUBSCRIBE, recordUnsubscribeSaga, adapter);
    yield takeEvery(constants.LIST_SUBSCRIBE, listSubscribeSaga, adapter);
    yield takeEvery(constants.LIST_UNSUBSCRIBE, listUnsubscribeSaga, adapter);
  };
}
