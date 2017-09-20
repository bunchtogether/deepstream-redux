'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

exports.recordSubscribeSaga = recordSubscribeSaga;
exports.recordUnsubscribeSaga = recordUnsubscribeSaga;
exports.listSubscribeSaga = listSubscribeSaga;
exports.listUnsubscribeSaga = listUnsubscribeSaga;
exports.default = createDefaultSaga;

var _effects = require('redux-saga/effects');

var _constants = require('./constants');

var constants = _interopRequireWildcard(_constants);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _marked = /*#__PURE__*/_regenerator2.default.mark(recordSubscribeSaga),
    _marked2 = /*#__PURE__*/_regenerator2.default.mark(recordUnsubscribeSaga),
    _marked3 = /*#__PURE__*/_regenerator2.default.mark(listSubscribeSaga),
    _marked4 = /*#__PURE__*/_regenerator2.default.mark(listUnsubscribeSaga);

function recordSubscribeSaga(adapter, action) {
  return _regenerator2.default.wrap(function recordSubscribeSaga$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return (0, _effects.call)(adapter.recordSubscribe, action.value);

        case 3:
          _context.next = 9;
          break;

        case 5:
          _context.prev = 5;
          _context.t0 = _context['catch'](0);
          _context.next = 9;
          return (0, _effects.put)({
            type: constants.RECORD_ERROR,
            value: {
              name: action.value
            }
          });

        case 9:
        case 'end':
          return _context.stop();
      }
    }
  }, _marked, this, [[0, 5]]);
}

function recordUnsubscribeSaga(adapter, action) {
  return _regenerator2.default.wrap(function recordUnsubscribeSaga$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return (0, _effects.call)(adapter.recordUnsubscribe, action.value);

        case 3:
          _context2.next = 9;
          break;

        case 5:
          _context2.prev = 5;
          _context2.t0 = _context2['catch'](0);
          _context2.next = 9;
          return (0, _effects.put)({
            type: constants.RECORD_ERROR,
            value: {
              name: action.value
            }
          });

        case 9:
        case 'end':
          return _context2.stop();
      }
    }
  }, _marked2, this, [[0, 5]]);
}

function listSubscribeSaga(adapter, action) {
  return _regenerator2.default.wrap(function listSubscribeSaga$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return (0, _effects.call)(adapter.listSubscribe, action.value);

        case 3:
          _context3.next = 9;
          break;

        case 5:
          _context3.prev = 5;
          _context3.t0 = _context3['catch'](0);
          _context3.next = 9;
          return (0, _effects.put)({
            type: constants.LIST_ERROR,
            value: {
              name: action.value
            }
          });

        case 9:
        case 'end':
          return _context3.stop();
      }
    }
  }, _marked3, this, [[0, 5]]);
}

function listUnsubscribeSaga(adapter, action) {
  return _regenerator2.default.wrap(function listUnsubscribeSaga$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return (0, _effects.call)(adapter.listUnsubscribe, action.value);

        case 3:
          _context4.next = 9;
          break;

        case 5:
          _context4.prev = 5;
          _context4.t0 = _context4['catch'](0);
          _context4.next = 9;
          return (0, _effects.put)({
            type: constants.LIST_ERROR,
            value: {
              name: action.value
            }
          });

        case 9:
        case 'end':
          return _context4.stop();
      }
    }
  }, _marked4, this, [[0, 5]]);
}

function createDefaultSaga(adapter) {
  return (/*#__PURE__*/_regenerator2.default.mark(function _callee() {
      return _regenerator2.default.wrap(function _callee$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.next = 2;
              return (0, _effects.takeEvery)(constants.RECORD_SUBSCRIBE, recordSubscribeSaga, adapter);

            case 2:
              _context5.next = 4;
              return (0, _effects.takeEvery)(constants.RECORD_UNSUBSCRIBE, recordUnsubscribeSaga, adapter);

            case 4:
              _context5.next = 6;
              return (0, _effects.takeEvery)(constants.LIST_SUBSCRIBE, listSubscribeSaga, adapter);

            case 6:
              _context5.next = 8;
              return (0, _effects.takeEvery)(constants.LIST_UNSUBSCRIBE, listUnsubscribeSaga, adapter);

            case 8:
            case 'end':
              return _context5.stop();
          }
        }
      }, _callee, this);
    })
  );
}