'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.recordSubscribe = recordSubscribe;
exports.recordUnsubscribe = recordUnsubscribe;
exports.recordDelete = recordDelete;
exports.recordUpdate = recordUpdate;
exports.listSubscribe = listSubscribe;
exports.listUnsubscribe = listUnsubscribe;
exports.listDelete = listDelete;
exports.listUpdate = listUpdate;

var _constants = require('./constants');

var constants = _interopRequireWildcard(_constants);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function recordSubscribe(name) {
  return {
    type: constants.RECORD_SUBSCRIBE,
    value: name
  };
}

function recordUnsubscribe(name) {
  return {
    type: constants.RECORD_UNSUBSCRIBE,
    value: name
  };
}

function recordDelete(name) {
  return {
    type: constants.RECORD_DELETE,
    value: name
  };
}

function recordUpdate(name, value) {
  return {
    type: constants.RECORD_UPDATE,
    value: {
      name: name,
      value: value
    }
  };
}

function listSubscribe(name) {
  return {
    type: constants.LIST_SUBSCRIBE,
    value: name
  };
}

function listUnsubscribe(name) {
  return {
    type: constants.LIST_UNSUBSCRIBE,
    value: name
  };
}

function listDelete(name) {
  return {
    type: constants.LIST_DELETE,
    value: name
  };
}

function listUpdate(name, value) {
  return {
    type: constants.LIST_UPDATE,
    value: {
      name: name,
      value: value
    }
  };
}