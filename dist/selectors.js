'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var recordSelector = exports.recordSelector = function recordSelector(state, name) {
  var value = state.getIn(['deepstream', name]);
  if (!value) {
    throw new Error('Unable to get record with name "' + name + '"');
  }
  return value;
};

var listSelector = exports.listSelector = function listSelector(state, name) {
  var value = state.getIn(['deepstream', name]);
  if (!value) {
    throw new Error('Unable to get list with name "' + name + '"');
  }
  return value;
};