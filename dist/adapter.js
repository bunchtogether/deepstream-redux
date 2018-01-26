'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _deepstream = require('deepstream.io-client-js');

var _deepstream2 = _interopRequireDefault(_deepstream);

var _constants = require('./constants');

var constants = _interopRequireWildcard(_constants);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import { pickBy, identity } from 'lodash';
var Adapter = function Adapter(client) {
  var _this = this;

  (0, _classCallCheck3.default)(this, Adapter);

  this.addDispatch = function (dispatch) {
    _this.dispatches.push(dispatch);
  };

  this.removeDispatch = function (dispatch) {
    _this.dispatches = _this.dispatches.filter(function (func) {
      return func !== dispatch;
    });
  };

  this.recordSubscribe = function (name) {
    if (_this.records[name] && !_this.records[name].isDestroyed) {
      return;
    }
    var record = _this.client.record.getRecord(name);
    record.on('delete', function () {
      _this.dispatches.forEach(function (dispatch) {
        dispatch({
          type: constants.RECORD_DELETE,
          value: name
        });
      });
      _this.recordUnsubscribe(name);
    });
    _this.records[name] = record;
    var listener = function listener(value) {
      // const prunedValue = pickBy(value, identity);
      _this.dispatches.forEach(function (dispatch) {
        dispatch({
          type: constants.RECORD_UPDATE,
          value: {
            name: name,
            value: value // : prunedValue,
          }
        });
      });
    };
    _this.listeners[name] = listener;
    record.subscribe(listener, true);
  };

  this.recordUnsubscribe = function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(name) {
      var record;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              record = _this.records[name];

              if (record) {
                _context.next = 3;
                break;
              }

              return _context.abrupt('return');

            case 3:
              if (!record.isDestroyed) {
                _context.next = 7;
                break;
              }

              delete _this.listeners[name];
              delete _this.records[name];
              return _context.abrupt('return');

            case 7:
              record.unsubscribe(_this.listeners[name]);
              delete _this.listeners[name];
              delete _this.records[name];
              _context.next = 12;
              return new Promise(function (resolve, reject) {
                record.once('error', reject);
                record.once('discard', resolve);
                record.discard();
              });

            case 12:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, _this);
    }));

    return function (_x) {
      return _ref.apply(this, arguments);
    };
  }();

  this.listSubscribe = function (name) {
    if (_this.lists[name] && !_this.lists[name].isDestroyed) {
      return;
    }
    var list = _this.client.record.getList(name);
    list.on('delete', function () {
      _this.dispatches.forEach(function (dispatch) {
        dispatch({
          type: constants.LIST_DELETE,
          value: name
        });
      });
      _this.listUnsubscribe(name);
    });
    _this.lists[name] = list;
    var listener = function listener(value) {
      _this.dispatches.forEach(function (dispatch) {
        dispatch({
          type: constants.LIST_UPDATE,
          value: {
            name: name,
            value: value
          }
        });
      });
    };
    _this.listeners[name] = listener;
    list.subscribe(listener, true);
  };

  this.listUnsubscribe = function () {
    var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(name) {
      var list;
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              list = _this.lists[name];

              if (list) {
                _context2.next = 3;
                break;
              }

              return _context2.abrupt('return');

            case 3:
              list.unsubscribe(_this.listeners[name]);
              delete _this.listeners[name];
              delete _this.lists[name];
              _context2.next = 8;
              return new Promise(function (resolve, reject) {
                list.once('error', reject);
                list.once('discard', resolve);
                list.discard();
              });

            case 8:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, _this);
    }));

    return function (_x2) {
      return _ref2.apply(this, arguments);
    };
  }();

  this.client = client;
  this.dispatches = [];
  this.records = {};
  this.lists = {};
  this.listeners = {};
};

exports.default = Adapter;