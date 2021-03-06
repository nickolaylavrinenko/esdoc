'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var filePathMap = {};

var NamingUtil = (function () {
  function NamingUtil() {
    _classCallCheck(this, NamingUtil);
  }

  _createClass(NamingUtil, null, [{
    key: 'filePathToName',
    value: function filePathToName(filePath) {
      var basename = _path2['default'].basename(filePath).split('.')[0];
      basename = basename.replace(/[^a-zA-Z0-9_$]/g, '');

      filePathMap[filePath] = filePathMap[filePath] || 0;
      var count = filePathMap[filePath];
      if (count > 0) basename += count;
      filePathMap[filePath]++;

      return basename;
    }
  }]);

  return NamingUtil;
})();

exports['default'] = NamingUtil;
module.exports = exports['default'];