// @flow

import type { IOEffect } from 'redux-saga/effects';
import type { Store } from 'redux';
import type { Map } from 'immutable';

export type ActionType = {
  type: string,
  value: any
};

export type StateType = Map<string, *>;

export type StoreType = Store<StateType, ActionType>;

export interface AdapterInterface {
  dispatches: Array<Function>,
  addDispatch(dispatch:Function): void,
  removeDispatch(dispatch:Function): void,
  recordSubscribe(name: string): void,
  recordUnsubscribe(name: string): Promise<void>,
  listSubscribe(name: string): void,
  listUnsubscribe(name: string): Promise<void>
}

export type DefaultSagaType = (adapter: AdapterInterface) => Generator<IOEffect, *, *>;
