'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var Plugin = (function () {
  function Plugin() {
    _classCallCheck(this, Plugin);

    this._plugins = null;
  }

  _createClass(Plugin, [{
    key: 'init',
    value: function init() {
      var plugins = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];

      this._plugins = copy(plugins);
    }
  }, {
    key: '_execHandler',
    value: function _execHandler(handlerName, ev) {
      var giveOption = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this._plugins[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var item = _step.value;

          var plugin = undefined;
          if (item.name.match(/^[.\/]/)) {
            var pluginPath = _path2['default'].resolve(item.name);
            plugin = require(pluginPath);
          } else {
            plugin = require(item.name);
          }

          if (!plugin[handlerName]) continue;

          if (giveOption) ev.data.option = item.option;

          plugin[handlerName](ev);
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator['return']) {
            _iterator['return']();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    }
  }, {
    key: 'onStart',
    value: function onStart() {
      var ev = new PluginEvent();
      this._execHandler('onStart', ev, true);
    }
  }, {
    key: 'onHandleConfig',
    value: function onHandleConfig(config) {
      var ev = new PluginEvent({ config: config });
      this._execHandler('onHandleConfig', ev);
      return ev.data.config;
    }
  }, {
    key: 'onHandleCode',
    value: function onHandleCode(code) {
      var ev = new PluginEvent({ code: code });
      this._execHandler('onHandleCode', ev);
      return ev.data.code;
    }
  }, {
    key: 'onHandleCodeParser',
    value: function onHandleCodeParser(parser) {
      var ev = new PluginEvent();
      ev.data.parser = parser;
      this._execHandler('onHandleCodeParser', ev);
      return ev.data.parser;
    }
  }, {
    key: 'onHandleAST',
    value: function onHandleAST(ast) {
      var ev = new PluginEvent({ ast: ast });
      this._execHandler('onHandleAST', ev);
      return ev.data.ast;
    }
  }, {
    key: 'onHandleTag',
    value: function onHandleTag(tag) {
      var ev = new PluginEvent({ tag: tag });
      this._execHandler('onHandleTag', ev);
      return ev.data.tag;
    }
  }, {
    key: 'onHandleHTML',
    value: function onHandleHTML(html) {
      var ev = new PluginEvent({ html: html });
      this._execHandler('onHandleHTML', ev);
      return ev.data.html;
    }
  }, {
    key: 'onComplete',
    value: function onComplete() {
      var ev = new PluginEvent();
      this._execHandler('onComplete', ev);
    }
  }]);

  return Plugin;
})();

var PluginEvent = function PluginEvent() {
  var data = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  _classCallCheck(this, PluginEvent);

  this.data = copy(data);
};

function copy(obj) {
  return JSON.parse(JSON.stringify(obj));
}

exports['default'] = new Plugin();
module.exports = exports['default'];