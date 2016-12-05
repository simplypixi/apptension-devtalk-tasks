'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

exports.default = function () {
  var source = 'football-italia';
  //ES2015: Template Literals
  var url = 'https://newsapi.org/v1/articles?source=' + source + '&sortBy=top&apiKey=' + _config.newsApiKey;

  //ES2015: Promises - First class representation of a value that may be made asynchronously and be available in the future.
  var promiseExample = new _promise2.default(function (resolve, reject) {
    var request = new XMLHttpRequest();
    request.onload = function () {
      var response = JSON.parse(this.response) || this.statusText;
      if (this.status === 200) {
        // Success
        resolve(response);
      } else {
        // Something went wrong (404 etc.)
        reject(new Error(response.message));
      }
    };
    request.onerror = function () {
      reject(new Error('XMLHttpRequest Error: ' + this.statusText));
    };
    request.open('GET', url);
    request.send();
  });

  promiseExample
  //ES2015: Arrow functions
  .then(function (response) {
    return successAction(response);
  }).catch(function (response) {
    return (0, _layout.errorLayout)({ message: _config.readingErrorMsg });
  });
};

var _lodash = require('lodash');

var _layout = require('./layout');

var _config = require('../config');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function successAction(response) {
  (0, _layout.layout)((0, _lodash.chunk)((0, _lodash.sampleSize)(response.articles, 4), 2));
  return response.articles;
} //ES2015: Modules export/import

//# sourceMappingURL=index-compiled.js.map