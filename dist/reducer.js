'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _actionsMap;

var _immutable = require('immutable');

var _constants = require('./constants');

var constants = _interopRequireWildcard(_constants);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var initialState = (0, _immutable.Map)({});

var actionsMap = (_actionsMap = {}, (0, _defineProperty3.default)(_actionsMap, constants.RECORD_UPDATE, function (state, action) {
  return state.set(action.value.name, (0, _immutable.fromJS)(action.value.value));
}), (0, _defineProperty3.default)(_actionsMap, constants.RECORD_DELETE, function (state, action) {
  return state.delete(action.value);
}), (0, _defineProperty3.default)(_actionsMap, constants.LIST_UPDATE, function (state, action) {
  return state.set(action.value.name, (0, _immutable.fromJS)(action.value.value));
}), (0, _defineProperty3.default)(_actionsMap, constants.LIST_DELETE, function (state, action) {
  return state.delete(action.value);
}), _actionsMap);

exports.default = function () {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments[1];

  var reduceFn = actionsMap[action.type];
  if (!reduceFn) return state;
  return reduceFn(state, action);
};