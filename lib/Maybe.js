"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.liftM = liftM;
exports["default"] = exports.NOTHING = void 0;

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var NOTHING = null;
exports.NOTHING = NOTHING;

var Maybe = /*#__PURE__*/function () {
  function Maybe(x) {
    _classCallCheck(this, Maybe);

    this.content = x;
  } // Adhering to best practices of the functional JS community
  // in order to distinguish monads from regular classes.


  _createClass(Maybe, [{
    key: "isNothing",
    // Simulates Haskell's pattern matching behavior.
    value: function isNothing() {
      return this.content === null || this.content === undefined;
    } // Functor implementation.

  }, {
    key: "fmap",
    value: function fmap(f) {
      if (this.isNothing()) return this;else return Maybe.of(f(this.content));
    } // Applicative behavior.

  }, {
    key: "ap",
    value: function ap(m) {
      if (this.isNothing()) return this;else return m.fmap(this.content);
    } // Monadic bind.

  }, {
    key: "chain",
    value: function chain(mf) {
      if (this.isNothing()) return this;else return this.fmap(mf).content;
    } // Convenience method to allow for more flexible handling of "Nothing" states, 
    // rather than simply skipping all functions along the pipeline. 
    // Takes a handler function as its argument which will only be invoked if the Maybe instance 
    // has decayed to "Nothing". The handler will receive the "NOTHING" constant as an argument, 
    // but has the chance of returning a different value to "turn" the monad back into "something". 
    // It thus sits as a "guard" between a broken section of the pipeline and subsequent stages.

  }, {
    key: "guard",
    value: function guard(ex) {
      if (this.isNothing()) return Maybe.of(ex(NOTHING));else return this;
    } // Print the current contents of the Maybe to the console.

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

  return Maybe;
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

var _default = Maybe;
exports["default"] = _default;