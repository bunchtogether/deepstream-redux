// @flow

// import { pickBy, identity } from 'lodash';
import DeepstreamClient from 'deepstream.io-client-js';
import * as constants from './constants';
import type { AdapterInterface } from './types';

export default class Adapter implements AdapterInterface {
  dispatches: Array<Function>;
  client: DeepstreamClient;
  records: {
    [string]: {
      subscribe: Function,
      unsubscribe: Function,
      once: Function,
      discard: Function
    }
  };
  lists: {
    [string]: {
      subscribe: Function,
      unsubscribe: Function,
      once: Function,
      discard: Function
    }
  };
  listeners: {
    [string]: Function
  };

  constructor(client:DeepstreamClient) {
    this.client = client;
    this.dispatches = [];
    this.records = {};
    this.lists = {};
    this.listeners = {};
  }

  addDispatch = (dispatch:Function) => {
    this.dispatches.push(dispatch);
  }

  removeDispatch = (dispatch:Function) => {
    this.dispatches = this.dispatches.filter((func) => func !== dispatch);
  }

  recordSubscribe = (name:string): void => {
    if (this.records[name] && !this.records[name].isDestroyed) {
      return;
    }
    const record = this.client.record.getRecord(name);
    record.on('delete', () => {
      this.dispatches.forEach((dispatch) => {
        dispatch({
          type: constants.RECORD_DELETE,
          value: name,
        });
      });
      this.recordUnsubscribe(name);
    });
    this.records[name] = record;
    const listener = (value:Object) => {
      // const prunedValue = pickBy(value, identity);
      this.dispatches.forEach((dispatch) => {
        dispatch({
          type: constants.RECORD_UPDATE,
          value: {
            name,
            value, // : prunedValue,
          },
        });
      });
    };
    this.listeners[name] = listener;
    record.subscribe(listener, true);
  }

  recordUnsubscribe = async (name:string): Promise<void> => {
    const record = this.records[name];
    if (!record) {
      return;
    }
    if (record.isDestroyed) {
      delete this.listeners[name];
      delete this.records[name];
      return;
    }
    record.unsubscribe(this.listeners[name]);
    delete this.listeners[name];
    delete this.records[name];
    await new Promise((resolve, reject) => {
      record.once('error', reject);
      record.once('discard', resolve);
      record.discard();
    });
  }

  listSubscribe = (name:string): void => {
    if (this.lists[name] && !this.lists[name].isDestroyed) {
      return;
    }
    const list = this.client.record.getList(name);
    list.on('delete', () => {
      this.dispatches.forEach((dispatch) => {
        dispatch({
          type: constants.LIST_DELETE,
          value: name,
        });
      });
      this.listUnsubscribe(name);
    });
    this.lists[name] = list;
    const listener = (value:Array<string>) => {
      this.dispatches.forEach((dispatch) => {
        dispatch({
          type: constants.LIST_UPDATE,
          value: {
            name,
            value,
          },
        });
      });
    };
    this.listeners[name] = listener;
    list.subscribe(listener, true);
  }

  listUnsubscribe = async (name:string): Promise<void> => {
    const list = this.lists[name];
    if (!list) {
      return;
    }
    list.unsubscribe(this.listeners[name]);
    delete this.listeners[name];
    delete this.lists[name];
    await new Promise((resolve, reject) => {
      list.once('error', reject);
      list.once('discard', resolve);
      list.discard();
    });
  }
}
