// @flow

import { Map, fromJS } from 'immutable';
import * as constants from './constants';
import type { ActionType, StateType } from './types';

const initialState = Map({});

const actionsMap = {
  [constants.RECORD_UPDATE](state: StateType, action: ActionType): StateType {
    return state.set(action.value.name, fromJS(action.value.value));
  },
  [constants.RECORD_DELETE](state: StateType, action: ActionType): StateType {
    return state.delete(action.value);
  },
  [constants.LIST_UPDATE](state: StateType, action: ActionType): StateType {
    return state.set(action.value.name, fromJS(action.value.value));
  },
  [constants.LIST_DELETE](state: StateType, action: ActionType): StateType {
    return state.delete(action.value);
  },
};

export default (state: StateType = initialState, action: ActionType): StateType => {
  const reduceFn = actionsMap[action.type];
  if (!reduceFn) return state;
  return reduceFn(state, action);
};
