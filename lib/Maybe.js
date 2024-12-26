"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.NOTHING = void 0;
exports.liftM = liftM;
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var NOTHING = exports.NOTHING = null;
var Maybe = /*#__PURE__*/function () {
  function Maybe(x) {
    _classCallCheck(this, Maybe);
    this.content = x;
  }

  // Adhering to best practices of the functional JS community
  // in order to distinguish monads from regular classes.
  return _createClass(Maybe, [{
    key: "isNothing",
    value:
    // Simulates Haskell's pattern matching behavior.
    function isNothing() {
      return this.content === null || this.content === undefined;
    }

    // Functor implementation.
  }, {
    key: "fmap",
    value: function fmap(f) {
      if (this.isNothing()) return this;else return Maybe.of(f(this.content));
    }

    // Applicative behavior.
  }, {
    key: "ap",
    value: function ap(m) {
      if (this.isNothing()) return this;else return m.fmap(this.content);
    }

    // Monadic bind.
  }, {
    key: "chain",
    value: function chain(mf) {
      if (this.isNothing()) return this;else return this.fmap(mf).content;
    }

    // Convenience method to allow for more flexible handling of "Nothing" states, 
    // rather than simply skipping all functions along the pipeline. 
    // Takes a handler function as its argument which will only be invoked if the Maybe instance 
    // has decayed to "Nothing". The handler will receive the "NOTHING" constant as an argument, 
    // but has the chance of returning a different value to "turn" the monad back into "something". 
    // It thus sits as a "guard" between a broken section of the pipeline and subsequent stages.
  }, {
    key: "guard",
    value: function guard(ex) {
      if (this.isNothing()) return Maybe.of(ex(NOTHING));else return this;
    }

    // Print the current contents of the Maybe to the console.
  }, {
    key: "show",
    value: function show() {
      if (this.isNothing()) console.log("Nothing");else console.log("Just: ", this.content);
      return this;
    }
  }], [{
    key: "of",
    value: function of(x) {
      return new Maybe(x);
    }
  }]);
}(); // This helper is intended to "lift" primitive functions operating on
// regular data types into a Maybe context. 
function liftM(f) {
  for (var _len = arguments.length, monads = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    monads[_key - 1] = arguments[_key];
  }
  if (monads.length !== 1) {
    if (!monads.length || monads.some(function (arg) {
      return arg.isNothing();
    })) return Maybe.of(NOTHING);else return Maybe.of(f.apply(void 0, _toConsumableArray(monads.map(function (arg) {
      return arg.content;
    }))));
  } else return monads[0].fmap(f);
}
var _default = exports["default"] = Maybe;