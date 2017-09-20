// @flow

import type { List, Map } from 'immutable';
import type { StateType } from './types';

export const recordSelector = (state: StateType, name: string):Map<string, *> => {
  const value = state.getIn(['deepstream', name]);
  if (!value) {
    throw new Error(`Unable to get record with name "${name}"`);
  }
  return value;
};

export const listSelector = (state: StateType, name: string):List<string> => {
  const value = state.getIn(['deepstream', name]);
  if (!value) {
    throw new Error(`Unable to get list with name "${name}"`);
  }
  return value;
};
