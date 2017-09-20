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

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _lodash = require('lodash');

var _deepstream = require('deepstream.io-client-js');

var _deepstream2 = _interopRequireDefault(_deepstream);

var _constants = require('./constants');

var constants = _interopRequireWildcard(_constants);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Adapter = function () {
  function Adapter(client) {
    (0, _classCallCheck3.default)(this, Adapter);

    this.client = client;
    this.dispatches = [];
    this.records = {};
    this.lists = {};
    this.listeners = {};
  }

  (0, _createClass3.default)(Adapter, [{
    key: 'addDispatch',
    value: function addDispatch(dispatch) {
      this.dispatches.push(dispatch);
    }
  }, {
    key: 'removeDispatch',
    value: function removeDispatch(dispatch) {
      this.dispatches = this.dispatches.filter(function (func) {
        return func !== dispatch;
      });
    }
  }, {
    key: 'recordSubscribe',
    value: function recordSubscribe(name) {
      var _this = this;

      if (this.records[name] && !this.records[name].isDestroyed) {
        return;
      }
      var record = this.client.record.getRecord(name);
      record.on('delete', function () {
        _this.dispatches.forEach(function (dispatch) {
          dispatch({
            type: constants.RECORD_DELETE,
            value: name
          });
        });
        _this.recordUnsubscribe(name);
      });
      this.records[name] = record;
      var listener = function listener(value) {
        var prunedValue = (0, _lodash.pickBy)(value, _lodash.identity);
        _this.dispatches.forEach(function (dispatch) {
          dispatch({
            type: constants.RECORD_UPDATE,
            value: {
              name: name,
              value: prunedValue
            }
          });
        });
      };
      this.listeners[name] = listener;
      record.subscribe(listener, true);
    }
  }, {
    key: 'recordUnsubscribe',
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(name) {
        var record;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                record = this.records[name];

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

                delete this.listeners[name];
                delete this.records[name];
                return _context.abrupt('return');

              case 7:
                record.unsubscribe(this.listeners[name]);
                delete this.listeners[name];
                delete this.records[name];
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
        }, _callee, this);
      }));

      function recordUnsubscribe(_x) {
        return _ref.apply(this, arguments);
      }

      return recordUnsubscribe;
    }()
  }, {
    key: 'listSubscribe',
    value: function listSubscribe(name) {
      var _this2 = this;

      if (this.lists[name] && !this.lists[name].isDestroyed) {
        return;
      }
      var list = this.client.record.getList(name);
      list.on('delete', function () {
        _this2.dispatches.forEach(function (dispatch) {
          dispatch({
            type: constants.LIST_DELETE,
            value: name
          });
        });
        _this2.listUnsubscribe(name);
      });
      this.lists[name] = list;
      var listener = function listener(value) {
        _this2.dispatches.forEach(function (dispatch) {
          dispatch({
            type: constants.LIST_UPDATE,
            value: {
              name: name,
              value: value
            }
          });
        });
      };
      this.listeners[name] = listener;
      list.subscribe(listener, true);
    }
  }, {
    key: 'listUnsubscribe',
    value: function () {
      var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(name) {
        var list;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                list = this.lists[name];

                if (list) {
                  _context2.next = 3;
                  break;
                }

                return _context2.abrupt('return');

              case 3:
                list.unsubscribe(this.listeners[name]);
                delete this.listeners[name];
                delete this.lists[name];
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
        }, _callee2, this);
      }));

      function listUnsubscribe(_x2) {
        return _ref2.apply(this, arguments);
      }

      return listUnsubscribe;
    }()
  }]);
  return Adapter;
}();

exports.default = Adapter;