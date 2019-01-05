// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  return newRequire;
})({"vdom/createElement.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _default = function _default(tagName) {
  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      _ref$attr = _ref.attr,
      attr = _ref$attr === void 0 ? {} : _ref$attr,
      _ref$children = _ref.children,
      children = _ref$children === void 0 ? [] : _ref$children;

  return {
    tagName: tagName,
    attr: attr,
    children: children
  };
};

exports.default = _default;
},{}],"vdom/render.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var renderElement = function renderElement(_ref) {
  var tagName = _ref.tagName,
      attr = _ref.attr,
      children = _ref.children;
  var $el = document.createElement(tagName); // set attributes

  var _arr = Object.entries(attr);

  for (var _i = 0; _i < _arr.length; _i++) {
    var _arr$_i = _slicedToArray(_arr[_i], 2),
        key = _arr$_i[0],
        value = _arr$_i[1];

    $el.setAttribute(key, value);
  } // set children


  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = children[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var child = _step.value;
      var $child = render(child);
      $el.appendChild($child);
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return != null) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return $el;
};

var render = function render(vNode) {
  if (typeof vNode === 'string') return document.createTextNode(vNode);
  return renderElement(vNode);
};

var _default = render;
exports.default = _default;
},{}],"vdom/mount.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _default = function _default($node, $target) {
  $target.replaceWith($node);
  return $node;
};

exports.default = _default;
},{}],"vdom/diff.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _render = _interopRequireDefault(require("./render"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var zipp = function zipp(xs, ys) {
  var zipped = [];

  for (var i = 0; i < Math.min(xs.length, ys.length); i++) {
    zipped.push([xs[i], ys[i]]);
  }

  ;
  return zipped;
};

var diffAttributes = function diffAttributes(oldAttr, newAttr) {
  var patches = []; // set new atributes

  var _arr = Object.entries(newAttr);

  var _loop = function _loop() {
    var _arr$_i = _slicedToArray(_arr[_i], 2),
        key = _arr$_i[0],
        value = _arr$_i[1];

    patches.push(function ($node) {
      $node.setAttribute(key, value);
      return $node;
    });
  };

  for (var _i = 0; _i < _arr.length; _i++) {
    _loop();
  }

  ; // remove old atributes

  var _arr2 = Object.entries(oldAttr);

  for (var _i2 = 0; _i2 < _arr2.length; _i2++) {
    var _arr2$_i = _slicedToArray(_arr2[_i2], 2),
        key = _arr2$_i[0],
        value = _arr2$_i[1];

    if (!(key in newAttr)) {
      $node.removeAttribute(key);
      return $node;
    }
  } // return


  return function ($node) {
    for (var _i3 = 0; _i3 < patches.length; _i3++) {
      var patch = patches[_i3];
      patch($node);
    }
  };
};

var diffChildren = function diffChildren(oldChildren, newChildren) {
  var childPatches = [];
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = zipp(oldChildren, newChildren)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var _step$value = _slicedToArray(_step.value, 2),
          oldChild = _step$value[0],
          newChild = _step$value[1];

      childPatches.push(diff(oldChild, newChild));
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return != null) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  ;
  var additionalPatches = [];
  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    var _loop2 = function _loop2() {
      var additionalChild = _step2.value;
      additionalPatches.push(function ($node) {
        $node.appendChild((0, _render.default)(additionalChild));
        return $node;
      });
    };

    for (var _iterator2 = newChildren.slice(oldChildren.length)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      _loop2();
    }
  } catch (err) {
    _didIteratorError2 = true;
    _iteratorError2 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
        _iterator2.return();
      }
    } finally {
      if (_didIteratorError2) {
        throw _iteratorError2;
      }
    }
  }

  return function ($parent) {
    var _iteratorNormalCompletion3 = true;
    var _didIteratorError3 = false;
    var _iteratorError3 = undefined;

    try {
      for (var _iterator3 = zipp(childPatches, $parent.childNodes)[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
        var _step3$value = _slicedToArray(_step3.value, 2),
            patch = _step3$value[0],
            child = _step3$value[1];

        patch(child);
      }
    } catch (err) {
      _didIteratorError3 = true;
      _iteratorError3 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion3 && _iterator3.return != null) {
          _iterator3.return();
        }
      } finally {
        if (_didIteratorError3) {
          throw _iteratorError3;
        }
      }
    }

    for (var _i4 = 0; _i4 < additionalPatches.length; _i4++) {
      var patch = additionalPatches[_i4];
      patch($parent);
    }

    return $parent;
  };
};

var diff = function diff(vOldNode, vNewNode) {
  if (vNewNode === undefined) {
    return function ($node) {
      $node.remove();
      return undefined;
    };
  }

  ; // handle text nodes

  if (typeof vOldNode === 'string' || typeof vNewNode === 'string') {
    if (vOldNode !== vNewNode) {
      return function ($node) {
        var $newNode = (0, _render.default)(vNewNode);
        $node.replaceWith($newNode);
        return $newNode;
      };
    } else {
      return function ($node) {};
    }
  } // handle element nodes


  if (vOldNode.tagName !== vNewNode.tagName) {
    return function ($node) {
      var $newNode = (0, _render.default)(vNewNode);
      $node.replaceWith($newNode);
      return $newNode;
    };
  }

  ;
  var patchAttr = diffAttributes(vOldNode.attr, vNewNode.attr);
  var patchChildren = diffChildren(vOldNode.children, vNewNode.children);
  return function ($node) {
    patchAttr($node);
    patchChildren($node);
    return $node;
  };
};

var _default = diff;
exports.default = _default;
},{"./render":"vdom/render.js"}],"main.js":[function(require,module,exports) {
"use strict";

var _createElement = _interopRequireDefault(require("./vdom/createElement"));

var _render = _interopRequireDefault(require("./vdom/render"));

var _mount = _interopRequireDefault(require("./vdom/mount"));

var _diff = _interopRequireDefault(require("./vdom/diff"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createVApp = function createVApp(count) {
  return (0, _createElement.default)('div', {
    attr: {
      id: 'app',
      dataCount: count
    },
    children: [String(count), (0, _createElement.default)('img', {
      attr: {
        src: 'https://media.giphy.com/media/3NtY188QaxDdC/giphy.gif'
      }
    }), (0, _createElement.default)('input')]
  });
};

var count = 0;
var vApp = createVApp(count);
var $app = (0, _render.default)(vApp);
var $rootElement = (0, _mount.default)($app, document.getElementById('root'));
setInterval(function () {
  count++;
  var vNewApp = createVApp(count);
  var patch = (0, _diff.default)(vApp, vNewApp);
  $rootElement = patch($rootElement);
  vApp = vNewApp;
}, 1000);
console.log($app);
},{"./vdom/createElement":"vdom/createElement.js","./vdom/render":"vdom/render.js","./vdom/mount":"vdom/mount.js","./vdom/diff":"vdom/diff.js"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "43151" + '/');

  ws.onmessage = function (event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      console.clear();
      data.assets.forEach(function (asset) {
        hmrApply(global.parcelRequire, asset);
      });
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.parcelRequire, asset.id);
        }
      });
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAccept(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAccept(global.parcelRequire, id);
  });
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","main.js"], null)
//# sourceMappingURL=/main.1f19ae8e.map