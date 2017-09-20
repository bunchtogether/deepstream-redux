// @flow

import * as constants from './constants';
import type { ActionType } from './types';

export function recordSubscribe(name:string): ActionType {
  return {
    type: constants.RECORD_SUBSCRIBE,
    value: name,
  };
}

export function recordUnsubscribe(name:string): ActionType {
  return {
    type: constants.RECORD_UNSUBSCRIBE,
    value: name,
  };
}

export function recordDelete(name:string): ActionType {
  return {
    type: constants.RECORD_DELETE,
    value: name,
  };
}

export function recordUpdate(name:string, value: Object): ActionType {
  return {
    type: constants.RECORD_UPDATE,
    value: {
      name,
      value,
    },
  };
}

export function listSubscribe(name:string): ActionType {
  return {
    type: constants.LIST_SUBSCRIBE,
    value: name,
  };
}

export function listUnsubscribe(name:string): ActionType {
  return {
    type: constants.LIST_UNSUBSCRIBE,
    value: name,
  };
}

export function listDelete(name:string): ActionType {
  return {
    type: constants.LIST_DELETE,
    value: name,
  };
}

export function listUpdate(name:string, value: Array<string>): ActionType {
  return {
    type: constants.LIST_UPDATE,
    value: {
      name,
      value,
    },
  };
}
