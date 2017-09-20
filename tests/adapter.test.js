// @flow 

// import expect from 'expect';
import uuid from 'uuid';
import { constants, Adapter } from '../src';
import type { ActionType } from '../src/types';
import { getClient, getServer } from './lib/deepstream';

let server;
let client;
let adapter;

beforeAll(async () => {
  server = await getServer();
  client = await getClient();
  adapter = new Adapter(client);
});

afterAll(async () => {
  await client.shutdown();
  await server.shutdown();
});

test('Should subscribe and unsubscribe from a record.', async () => {
  const name = uuid.v4();
  const value = {
    [uuid.v4()]: uuid.v4(),
  };
  const dispatchPromise = new Promise((resolve) => {
    const dispatch = (action: ActionType) => {
      expect(action).toEqual({
        type: constants.RECORD_UPDATE,
        value: {
          name,
          value,
        },
      });
      adapter.removeDispatch(dispatch);
      resolve();
    };
    adapter.addDispatch(dispatch);
  });
  adapter.recordSubscribe(name);
  client.record.setData(name, value);
  await dispatchPromise;
  adapter.recordUnsubscribe(name);
});

test('Should subscribe twice, then unsubscribe from a record.', async () => {
  const name = uuid.v4();
  const value = {
    [uuid.v4()]: uuid.v4(),
  };
  const dispatchPromise = new Promise((resolve) => {
    const dispatch = (action: ActionType) => {
      expect(action).toEqual({
        type: constants.RECORD_UPDATE,
        value: {
          name,
          value,
        },
      });
      adapter.removeDispatch(dispatch);
      resolve();
    };
    adapter.addDispatch(dispatch);
  });
  adapter.recordSubscribe(name);
  adapter.recordSubscribe(name);
  client.record.setData(name, value);
  await dispatchPromise;
  adapter.recordUnsubscribe(name);
});

test('Should handle a deleted record.', async () => {
  const name = uuid.v4();
  const value = {
    [uuid.v4()]: uuid.v4(),
  };
  adapter.recordSubscribe(name);
  const record = client.record.getRecord(name);
  client.record.setData(name, value);
  const dispatchPromise = new Promise((resolve) => {
    const dispatch = (action: ActionType) => {
      if (action.type === constants.RECORD_DELETE && action.value === name) {
        adapter.removeDispatch(dispatch);
        resolve();
      }
    };
    adapter.addDispatch(dispatch);
  });
  await new Promise((resolve, reject) => {
    record.once('delete', resolve);
    record.once('error', reject);
    record.delete();
  });
  await adapter.recordUnsubscribe(name);
  await dispatchPromise;
});

test('Should subscribe and unsubscribe from a list.', async () => {
  const name = uuid.v4();
  const value = [uuid.v4(), uuid.v4(), uuid.v4()];
  const list = client.record.getList(name);
  const dispatchPromise = new Promise((resolve) => {
    const dispatch = (action: ActionType) => {
      expect(action).toEqual({
        type: constants.LIST_UPDATE,
        value: {
          name,
          value,
        },
      });
      adapter.removeDispatch(dispatch);
      resolve();
    };
    adapter.addDispatch(dispatch);
  });
  adapter.listSubscribe(name);
  list.setEntries(value);
  await dispatchPromise;
  adapter.listUnsubscribe(name);
  await new Promise((resolve, reject) => {
    list.once('error', reject);
    list.once('discard', resolve);
    list.discard();
  });
});

test('Should subscribe twice, then unsubscribe from a list.', async () => {
  const name = uuid.v4();
  const value = [uuid.v4(), uuid.v4(), uuid.v4()];
  const list = client.record.getList(name);
  const dispatchPromise = new Promise((resolve) => {
    const dispatch = (action: ActionType) => {
      expect(action).toEqual({
        type: constants.LIST_UPDATE,
        value: {
          name,
          value,
        },
      });
      adapter.removeDispatch(dispatch);
      resolve();
    };
    adapter.addDispatch(dispatch);
  });
  adapter.listSubscribe(name);
  adapter.listSubscribe(name);
  list.setEntries(value);
  await dispatchPromise;
  adapter.listUnsubscribe(name);
  await new Promise((resolve, reject) => {
    list.once('error', reject);
    list.once('discard', resolve);
    list.discard();
  });
});

test('Should handle a deleted list.', async () => {
  const name = uuid.v4();
  const value = [uuid.v4(), uuid.v4(), uuid.v4()];
  adapter.listSubscribe(name);
  const list = client.record.getList(name);
  list.setEntries(value);
  const dispatchPromise = new Promise((resolve) => {
    const dispatch = (action: ActionType) => {
      if (action.type === constants.LIST_DELETE && action.value === name) {
        adapter.removeDispatch(dispatch);
        resolve();
      }
    };
    adapter.addDispatch(dispatch);
  });
  await new Promise((resolve, reject) => {
    list.once('delete', resolve);
    list.once('error', reject);
    list.delete();
  });
  await adapter.listUnsubscribe(name);
  await dispatchPromise;
});
