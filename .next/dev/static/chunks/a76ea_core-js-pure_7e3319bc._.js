(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/global-this.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var check = function(it) {
    return it && it.Math === Math && it;
};
// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
module.exports = // eslint-disable-next-line es/no-global-this -- safe
check(typeof globalThis == 'object' && globalThis) || check(typeof window == 'object' && window) || // eslint-disable-next-line no-restricted-globals -- safe
check(typeof self == 'object' && self) || check(("TURBOPACK compile-time value", "object") == 'object' && /*TURBOPACK member replacement*/ __turbopack_context__.g) || check(typeof /*TURBOPACK member replacement*/ __turbopack_context__.e == 'object' && /*TURBOPACK member replacement*/ __turbopack_context__.e) || // eslint-disable-next-line no-new-func -- fallback
function() {
    return this;
}() || Function('return this')();
}),
"[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/fails.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

module.exports = function(exec) {
    try {
        return !!exec();
    } catch (error) {
        return true;
    }
};
}),
"[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/function-bind-native.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var fails = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/fails.js [app-client] (ecmascript)");
module.exports = !fails(function() {
    // eslint-disable-next-line es/no-function-prototype-bind -- safe
    var test = (function() {}).bind();
    // eslint-disable-next-line no-prototype-builtins -- safe
    return typeof test != 'function' || test.hasOwnProperty('prototype');
});
}),
"[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/function-apply.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var NATIVE_BIND = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/function-bind-native.js [app-client] (ecmascript)");
var FunctionPrototype = Function.prototype;
var apply = FunctionPrototype.apply;
var call = FunctionPrototype.call;
// eslint-disable-next-line es/no-function-prototype-bind, es/no-reflect -- safe
module.exports = typeof Reflect == 'object' && Reflect.apply || (NATIVE_BIND ? call.bind(apply) : function() {
    return call.apply(apply, arguments);
});
}),
"[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/function-uncurry-this.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var NATIVE_BIND = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/function-bind-native.js [app-client] (ecmascript)");
var FunctionPrototype = Function.prototype;
var call = FunctionPrototype.call;
// eslint-disable-next-line es/no-function-prototype-bind -- safe
var uncurryThisWithBind = NATIVE_BIND && FunctionPrototype.bind.bind(call, call);
module.exports = NATIVE_BIND ? uncurryThisWithBind : function(fn) {
    return function() {
        return call.apply(fn, arguments);
    };
};
}),
"[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/classof-raw.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var uncurryThis = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/function-uncurry-this.js [app-client] (ecmascript)");
var toString = uncurryThis({}.toString);
var stringSlice = uncurryThis(''.slice);
module.exports = function(it) {
    return stringSlice(toString(it), 8, -1);
};
}),
"[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/function-uncurry-this-clause.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var classofRaw = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/classof-raw.js [app-client] (ecmascript)");
var uncurryThis = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/function-uncurry-this.js [app-client] (ecmascript)");
module.exports = function(fn) {
    // Nashorn bug:
    //   https://github.com/zloirock/core-js/issues/1128
    //   https://github.com/zloirock/core-js/issues/1130
    if (classofRaw(fn) === 'Function') return uncurryThis(fn);
};
}),
"[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/is-callable.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// https://tc39.es/ecma262/#sec-IsHTMLDDA-internal-slot
var documentAll = typeof document == 'object' && document.all;
// `IsCallable` abstract operation
// https://tc39.es/ecma262/#sec-iscallable
// eslint-disable-next-line unicorn/no-typeof-undefined -- required for testing
module.exports = typeof documentAll == 'undefined' && documentAll !== undefined ? function(argument) {
    return typeof argument == 'function' || argument === documentAll;
} : function(argument) {
    return typeof argument == 'function';
};
}),
"[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/descriptors.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var fails = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/fails.js [app-client] (ecmascript)");
// Detect IE8's incomplete defineProperty implementation
module.exports = !fails(function() {
    // eslint-disable-next-line es/no-object-defineproperty -- required for testing
    return Object.defineProperty({}, 1, {
        get: function() {
            return 7;
        }
    })[1] !== 7;
});
}),
"[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/function-call.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var NATIVE_BIND = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/function-bind-native.js [app-client] (ecmascript)");
var call = Function.prototype.call;
// eslint-disable-next-line es/no-function-prototype-bind -- safe
module.exports = NATIVE_BIND ? call.bind(call) : function() {
    return call.apply(call, arguments);
};
}),
"[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/object-property-is-enumerable.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var $propertyIsEnumerable = {}.propertyIsEnumerable;
// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
// Nashorn ~ JDK8 bug
var NASHORN_BUG = getOwnPropertyDescriptor && !$propertyIsEnumerable.call({
    1: 2
}, 1);
// `Object.prototype.propertyIsEnumerable` method implementation
// https://tc39.es/ecma262/#sec-object.prototype.propertyisenumerable
exports.f = NASHORN_BUG ? function propertyIsEnumerable(V) {
    var descriptor = getOwnPropertyDescriptor(this, V);
    return !!descriptor && descriptor.enumerable;
} : $propertyIsEnumerable;
}),
"[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/create-property-descriptor.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

module.exports = function(bitmap, value) {
    return {
        enumerable: !(bitmap & 1),
        configurable: !(bitmap & 2),
        writable: !(bitmap & 4),
        value: value
    };
};
}),
"[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/indexed-object.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var uncurryThis = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/function-uncurry-this.js [app-client] (ecmascript)");
var fails = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/fails.js [app-client] (ecmascript)");
var classof = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/classof-raw.js [app-client] (ecmascript)");
var $Object = Object;
var split = uncurryThis(''.split);
// fallback for non-array-like ES3 and non-enumerable old V8 strings
module.exports = fails(function() {
    // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
    // eslint-disable-next-line no-prototype-builtins -- safe
    return !$Object('z').propertyIsEnumerable(0);
}) ? function(it) {
    return classof(it) === 'String' ? split(it, '') : $Object(it);
} : $Object;
}),
"[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/is-null-or-undefined.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// we can't use just `it == null` since of `document.all` special case
// https://tc39.es/ecma262/#sec-IsHTMLDDA-internal-slot-aec
module.exports = function(it) {
    return it === null || it === undefined;
};
}),
"[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/require-object-coercible.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var isNullOrUndefined = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/is-null-or-undefined.js [app-client] (ecmascript)");
var $TypeError = TypeError;
// `RequireObjectCoercible` abstract operation
// https://tc39.es/ecma262/#sec-requireobjectcoercible
module.exports = function(it) {
    if (isNullOrUndefined(it)) throw new $TypeError("Can't call method on " + it);
    return it;
};
}),
"[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/to-indexed-object.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// toObject with fallback for non-array-like ES3 strings
var IndexedObject = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/indexed-object.js [app-client] (ecmascript)");
var requireObjectCoercible = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/require-object-coercible.js [app-client] (ecmascript)");
module.exports = function(it) {
    return IndexedObject(requireObjectCoercible(it));
};
}),
"[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/is-object.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var isCallable = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/is-callable.js [app-client] (ecmascript)");
module.exports = function(it) {
    return typeof it == 'object' ? it !== null : isCallable(it);
};
}),
"[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/path.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

module.exports = {};
}),
"[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/get-built-in.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var path = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/path.js [app-client] (ecmascript)");
var globalThis = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/global-this.js [app-client] (ecmascript)");
var isCallable = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/is-callable.js [app-client] (ecmascript)");
var aFunction = function(variable) {
    return isCallable(variable) ? variable : undefined;
};
module.exports = function(namespace, method) {
    return arguments.length < 2 ? aFunction(path[namespace]) || aFunction(globalThis[namespace]) : path[namespace] && path[namespace][method] || globalThis[namespace] && globalThis[namespace][method];
};
}),
"[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/object-is-prototype-of.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var uncurryThis = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/function-uncurry-this.js [app-client] (ecmascript)");
module.exports = uncurryThis({}.isPrototypeOf);
}),
"[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/environment-user-agent.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var globalThis = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/global-this.js [app-client] (ecmascript)");
var navigator = globalThis.navigator;
var userAgent = navigator && navigator.userAgent;
module.exports = userAgent ? String(userAgent) : '';
}),
"[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/environment-v8-version.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var globalThis = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/global-this.js [app-client] (ecmascript)");
var userAgent = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/environment-user-agent.js [app-client] (ecmascript)");
var process = globalThis.process;
var Deno = globalThis.Deno;
var versions = process && process.versions || Deno && Deno.version;
var v8 = versions && versions.v8;
var match, version;
if (v8) {
    match = v8.split('.');
    // in old Chrome, versions of V8 isn't V8 = Chrome / 10
    // but their correct versions are not interesting for us
    version = match[0] > 0 && match[0] < 4 ? 1 : +(match[0] + match[1]);
}
// BrowserFS NodeJS `process` polyfill incorrectly set `.v8` to `0.0`
// so check `userAgent` even if `.v8` exists, but 0
if (!version && userAgent) {
    match = userAgent.match(/Edge\/(\d+)/);
    if (!match || match[1] >= 74) {
        match = userAgent.match(/Chrome\/(\d+)/);
        if (match) version = +match[1];
    }
}
module.exports = version;
}),
"[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/symbol-constructor-detection.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/* eslint-disable es/no-symbol -- required for testing */ var V8_VERSION = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/environment-v8-version.js [app-client] (ecmascript)");
var fails = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/fails.js [app-client] (ecmascript)");
var globalThis = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/global-this.js [app-client] (ecmascript)");
var $String = globalThis.String;
// eslint-disable-next-line es/no-object-getownpropertysymbols -- required for testing
module.exports = !!Object.getOwnPropertySymbols && !fails(function() {
    var symbol = Symbol('symbol detection');
    // Chrome 38 Symbol has incorrect toString conversion
    // `get-own-property-symbols` polyfill symbols converted to object are not Symbol instances
    // nb: Do not call `String` directly to avoid this being optimized out to `symbol+''` which will,
    // of course, fail.
    return !$String(symbol) || !(Object(symbol) instanceof Symbol) || // Chrome 38-40 symbols are not inherited from DOM collections prototypes to instances
    !Symbol.sham && V8_VERSION && V8_VERSION < 41;
});
}),
"[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/use-symbol-as-uid.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/* eslint-disable es/no-symbol -- required for testing */ var NATIVE_SYMBOL = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/symbol-constructor-detection.js [app-client] (ecmascript)");
module.exports = NATIVE_SYMBOL && !Symbol.sham && typeof Symbol.iterator == 'symbol';
}),
"[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/is-symbol.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var getBuiltIn = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/get-built-in.js [app-client] (ecmascript)");
var isCallable = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/is-callable.js [app-client] (ecmascript)");
var isPrototypeOf = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/object-is-prototype-of.js [app-client] (ecmascript)");
var USE_SYMBOL_AS_UID = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/use-symbol-as-uid.js [app-client] (ecmascript)");
var $Object = Object;
module.exports = USE_SYMBOL_AS_UID ? function(it) {
    return typeof it == 'symbol';
} : function(it) {
    var $Symbol = getBuiltIn('Symbol');
    return isCallable($Symbol) && isPrototypeOf($Symbol.prototype, $Object(it));
};
}),
"[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/try-to-string.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var $String = String;
module.exports = function(argument) {
    try {
        return $String(argument);
    } catch (error) {
        return 'Object';
    }
};
}),
"[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/a-callable.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var isCallable = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/is-callable.js [app-client] (ecmascript)");
var tryToString = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/try-to-string.js [app-client] (ecmascript)");
var $TypeError = TypeError;
// `Assert: IsCallable(argument) is true`
module.exports = function(argument) {
    if (isCallable(argument)) return argument;
    throw new $TypeError(tryToString(argument) + ' is not a function');
};
}),
"[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/get-method.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var aCallable = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/a-callable.js [app-client] (ecmascript)");
var isNullOrUndefined = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/is-null-or-undefined.js [app-client] (ecmascript)");
// `GetMethod` abstract operation
// https://tc39.es/ecma262/#sec-getmethod
module.exports = function(V, P) {
    var func = V[P];
    return isNullOrUndefined(func) ? undefined : aCallable(func);
};
}),
"[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/ordinary-to-primitive.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var call = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/function-call.js [app-client] (ecmascript)");
var isCallable = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/is-callable.js [app-client] (ecmascript)");
var isObject = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/is-object.js [app-client] (ecmascript)");
var $TypeError = TypeError;
// `OrdinaryToPrimitive` abstract operation
// https://tc39.es/ecma262/#sec-ordinarytoprimitive
module.exports = function(input, pref) {
    var fn, val;
    if (pref === 'string' && isCallable(fn = input.toString) && !isObject(val = call(fn, input))) return val;
    if (isCallable(fn = input.valueOf) && !isObject(val = call(fn, input))) return val;
    if (pref !== 'string' && isCallable(fn = input.toString) && !isObject(val = call(fn, input))) return val;
    throw new $TypeError("Can't convert object to primitive value");
};
}),
"[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/is-pure.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

module.exports = true;
}),
"[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/define-global-property.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var globalThis = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/global-this.js [app-client] (ecmascript)");
// eslint-disable-next-line es/no-object-defineproperty -- safe
var defineProperty = Object.defineProperty;
module.exports = function(key, value) {
    try {
        defineProperty(globalThis, key, {
            value: value,
            configurable: true,
            writable: true
        });
    } catch (error) {
        globalThis[key] = value;
    }
    return value;
};
}),
"[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/shared-store.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var IS_PURE = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/is-pure.js [app-client] (ecmascript)");
var globalThis = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/global-this.js [app-client] (ecmascript)");
var defineGlobalProperty = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/define-global-property.js [app-client] (ecmascript)");
var SHARED = '__core-js_shared__';
var store = module.exports = globalThis[SHARED] || defineGlobalProperty(SHARED, {});
(store.versions || (store.versions = [])).push({
    version: '3.47.0',
    mode: IS_PURE ? 'pure' : 'global',
    copyright: '© 2014-2025 Denis Pushkarev (zloirock.ru), 2025 CoreJS Company (core-js.io)',
    license: 'https://github.com/zloirock/core-js/blob/v3.47.0/LICENSE',
    source: 'https://github.com/zloirock/core-js'
});
}),
"[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/shared.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var store = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/shared-store.js [app-client] (ecmascript)");
module.exports = function(key, value) {
    return store[key] || (store[key] = value || {});
};
}),
"[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/to-object.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var requireObjectCoercible = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/require-object-coercible.js [app-client] (ecmascript)");
var $Object = Object;
// `ToObject` abstract operation
// https://tc39.es/ecma262/#sec-toobject
module.exports = function(argument) {
    return $Object(requireObjectCoercible(argument));
};
}),
"[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/has-own-property.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var uncurryThis = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/function-uncurry-this.js [app-client] (ecmascript)");
var toObject = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/to-object.js [app-client] (ecmascript)");
var hasOwnProperty = uncurryThis({}.hasOwnProperty);
// `HasOwnProperty` abstract operation
// https://tc39.es/ecma262/#sec-hasownproperty
// eslint-disable-next-line es/no-object-hasown -- safe
module.exports = Object.hasOwn || function hasOwn(it, key) {
    return hasOwnProperty(toObject(it), key);
};
}),
"[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/uid.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var uncurryThis = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/function-uncurry-this.js [app-client] (ecmascript)");
var id = 0;
var postfix = Math.random();
var toString = uncurryThis(1.1.toString);
module.exports = function(key) {
    return 'Symbol(' + (key === undefined ? '' : key) + ')_' + toString(++id + postfix, 36);
};
}),
"[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/well-known-symbol.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var globalThis = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/global-this.js [app-client] (ecmascript)");
var shared = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/shared.js [app-client] (ecmascript)");
var hasOwn = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/has-own-property.js [app-client] (ecmascript)");
var uid = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/uid.js [app-client] (ecmascript)");
var NATIVE_SYMBOL = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/symbol-constructor-detection.js [app-client] (ecmascript)");
var USE_SYMBOL_AS_UID = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/use-symbol-as-uid.js [app-client] (ecmascript)");
var Symbol = globalThis.Symbol;
var WellKnownSymbolsStore = shared('wks');
var createWellKnownSymbol = USE_SYMBOL_AS_UID ? Symbol['for'] || Symbol : Symbol && Symbol.withoutSetter || uid;
module.exports = function(name) {
    if (!hasOwn(WellKnownSymbolsStore, name)) {
        WellKnownSymbolsStore[name] = NATIVE_SYMBOL && hasOwn(Symbol, name) ? Symbol[name] : createWellKnownSymbol('Symbol.' + name);
    }
    return WellKnownSymbolsStore[name];
};
}),
"[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/to-primitive.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var call = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/function-call.js [app-client] (ecmascript)");
var isObject = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/is-object.js [app-client] (ecmascript)");
var isSymbol = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/is-symbol.js [app-client] (ecmascript)");
var getMethod = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/get-method.js [app-client] (ecmascript)");
var ordinaryToPrimitive = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/ordinary-to-primitive.js [app-client] (ecmascript)");
var wellKnownSymbol = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/well-known-symbol.js [app-client] (ecmascript)");
var $TypeError = TypeError;
var TO_PRIMITIVE = wellKnownSymbol('toPrimitive');
// `ToPrimitive` abstract operation
// https://tc39.es/ecma262/#sec-toprimitive
module.exports = function(input, pref) {
    if (!isObject(input) || isSymbol(input)) return input;
    var exoticToPrim = getMethod(input, TO_PRIMITIVE);
    var result;
    if (exoticToPrim) {
        if (pref === undefined) pref = 'default';
        result = call(exoticToPrim, input, pref);
        if (!isObject(result) || isSymbol(result)) return result;
        throw new $TypeError("Can't convert object to primitive value");
    }
    if (pref === undefined) pref = 'number';
    return ordinaryToPrimitive(input, pref);
};
}),
"[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/to-property-key.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var toPrimitive = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/to-primitive.js [app-client] (ecmascript)");
var isSymbol = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/is-symbol.js [app-client] (ecmascript)");
// `ToPropertyKey` abstract operation
// https://tc39.es/ecma262/#sec-topropertykey
module.exports = function(argument) {
    var key = toPrimitive(argument, 'string');
    return isSymbol(key) ? key : key + '';
};
}),
"[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/document-create-element.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var globalThis = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/global-this.js [app-client] (ecmascript)");
var isObject = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/is-object.js [app-client] (ecmascript)");
var document = globalThis.document;
// typeof document.createElement is 'object' in old IE
var EXISTS = isObject(document) && isObject(document.createElement);
module.exports = function(it) {
    return EXISTS ? document.createElement(it) : {};
};
}),
"[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/ie8-dom-define.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var DESCRIPTORS = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/descriptors.js [app-client] (ecmascript)");
var fails = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/fails.js [app-client] (ecmascript)");
var createElement = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/document-create-element.js [app-client] (ecmascript)");
// Thanks to IE8 for its funny defineProperty
module.exports = !DESCRIPTORS && !fails(function() {
    // eslint-disable-next-line es/no-object-defineproperty -- required for testing
    return Object.defineProperty(createElement('div'), 'a', {
        get: function() {
            return 7;
        }
    }).a !== 7;
});
}),
"[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/object-get-own-property-descriptor.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var DESCRIPTORS = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/descriptors.js [app-client] (ecmascript)");
var call = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/function-call.js [app-client] (ecmascript)");
var propertyIsEnumerableModule = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/object-property-is-enumerable.js [app-client] (ecmascript)");
var createPropertyDescriptor = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/create-property-descriptor.js [app-client] (ecmascript)");
var toIndexedObject = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/to-indexed-object.js [app-client] (ecmascript)");
var toPropertyKey = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/to-property-key.js [app-client] (ecmascript)");
var hasOwn = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/has-own-property.js [app-client] (ecmascript)");
var IE8_DOM_DEFINE = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/ie8-dom-define.js [app-client] (ecmascript)");
// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
// `Object.getOwnPropertyDescriptor` method
// https://tc39.es/ecma262/#sec-object.getownpropertydescriptor
exports.f = DESCRIPTORS ? $getOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
    O = toIndexedObject(O);
    P = toPropertyKey(P);
    if (IE8_DOM_DEFINE) try {
        return $getOwnPropertyDescriptor(O, P);
    } catch (error) {}
    if (hasOwn(O, P)) return createPropertyDescriptor(!call(propertyIsEnumerableModule.f, O, P), O[P]);
};
}),
"[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/is-forced.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var fails = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/fails.js [app-client] (ecmascript)");
var isCallable = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/is-callable.js [app-client] (ecmascript)");
var replacement = /#|\.prototype\./;
var isForced = function(feature, detection) {
    var value = data[normalize(feature)];
    return value === POLYFILL ? true : value === NATIVE ? false : isCallable(detection) ? fails(detection) : !!detection;
};
var normalize = isForced.normalize = function(string) {
    return String(string).replace(replacement, '.').toLowerCase();
};
var data = isForced.data = {};
var NATIVE = isForced.NATIVE = 'N';
var POLYFILL = isForced.POLYFILL = 'P';
module.exports = isForced;
}),
"[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/function-bind-context.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var uncurryThis = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/function-uncurry-this-clause.js [app-client] (ecmascript)");
var aCallable = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/a-callable.js [app-client] (ecmascript)");
var NATIVE_BIND = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/function-bind-native.js [app-client] (ecmascript)");
var bind = uncurryThis(uncurryThis.bind);
// optional / simple context binding
module.exports = function(fn, that) {
    aCallable(fn);
    return that === undefined ? fn : NATIVE_BIND ? bind(fn, that) : function() {
        return fn.apply(that, arguments);
    };
};
}),
"[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/v8-prototype-define-bug.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var DESCRIPTORS = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/descriptors.js [app-client] (ecmascript)");
var fails = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/fails.js [app-client] (ecmascript)");
// V8 ~ Chrome 36-
// https://bugs.chromium.org/p/v8/issues/detail?id=3334
module.exports = DESCRIPTORS && fails(function() {
    // eslint-disable-next-line es/no-object-defineproperty -- required for testing
    return Object.defineProperty(function() {}, 'prototype', {
        value: 42,
        writable: false
    }).prototype !== 42;
});
}),
"[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/an-object.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var isObject = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/is-object.js [app-client] (ecmascript)");
var $String = String;
var $TypeError = TypeError;
// `Assert: Type(argument) is Object`
module.exports = function(argument) {
    if (isObject(argument)) return argument;
    throw new $TypeError($String(argument) + ' is not an object');
};
}),
"[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/object-define-property.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var DESCRIPTORS = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/descriptors.js [app-client] (ecmascript)");
var IE8_DOM_DEFINE = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/ie8-dom-define.js [app-client] (ecmascript)");
var V8_PROTOTYPE_DEFINE_BUG = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/v8-prototype-define-bug.js [app-client] (ecmascript)");
var anObject = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/an-object.js [app-client] (ecmascript)");
var toPropertyKey = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/to-property-key.js [app-client] (ecmascript)");
var $TypeError = TypeError;
// eslint-disable-next-line es/no-object-defineproperty -- safe
var $defineProperty = Object.defineProperty;
// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
var ENUMERABLE = 'enumerable';
var CONFIGURABLE = 'configurable';
var WRITABLE = 'writable';
// `Object.defineProperty` method
// https://tc39.es/ecma262/#sec-object.defineproperty
exports.f = DESCRIPTORS ? V8_PROTOTYPE_DEFINE_BUG ? function defineProperty(O, P, Attributes) {
    anObject(O);
    P = toPropertyKey(P);
    anObject(Attributes);
    if (typeof O === 'function' && P === 'prototype' && 'value' in Attributes && WRITABLE in Attributes && !Attributes[WRITABLE]) {
        var current = $getOwnPropertyDescriptor(O, P);
        if (current && current[WRITABLE]) {
            O[P] = Attributes.value;
            Attributes = {
                configurable: CONFIGURABLE in Attributes ? Attributes[CONFIGURABLE] : current[CONFIGURABLE],
                enumerable: ENUMERABLE in Attributes ? Attributes[ENUMERABLE] : current[ENUMERABLE],
                writable: false
            };
        }
    }
    return $defineProperty(O, P, Attributes);
} : $defineProperty : function defineProperty(O, P, Attributes) {
    anObject(O);
    P = toPropertyKey(P);
    anObject(Attributes);
    if (IE8_DOM_DEFINE) try {
        return $defineProperty(O, P, Attributes);
    } catch (error) {}
    if ('get' in Attributes || 'set' in Attributes) throw new $TypeError('Accessors not supported');
    if ('value' in Attributes) O[P] = Attributes.value;
    return O;
};
}),
"[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/create-non-enumerable-property.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var DESCRIPTORS = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/descriptors.js [app-client] (ecmascript)");
var definePropertyModule = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/object-define-property.js [app-client] (ecmascript)");
var createPropertyDescriptor = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/create-property-descriptor.js [app-client] (ecmascript)");
module.exports = DESCRIPTORS ? function(object, key, value) {
    return definePropertyModule.f(object, key, createPropertyDescriptor(1, value));
} : function(object, key, value) {
    object[key] = value;
    return object;
};
}),
"[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/export.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var globalThis = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/global-this.js [app-client] (ecmascript)");
var apply = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/function-apply.js [app-client] (ecmascript)");
var uncurryThis = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/function-uncurry-this-clause.js [app-client] (ecmascript)");
var isCallable = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/is-callable.js [app-client] (ecmascript)");
var getOwnPropertyDescriptor = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/object-get-own-property-descriptor.js [app-client] (ecmascript)").f;
var isForced = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/is-forced.js [app-client] (ecmascript)");
var path = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/path.js [app-client] (ecmascript)");
var bind = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/function-bind-context.js [app-client] (ecmascript)");
var createNonEnumerableProperty = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/create-non-enumerable-property.js [app-client] (ecmascript)");
var hasOwn = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/has-own-property.js [app-client] (ecmascript)");
// add debugging info
__turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/shared-store.js [app-client] (ecmascript)");
var wrapConstructor = function(NativeConstructor) {
    var Wrapper = function(a, b, c) {
        if (this instanceof Wrapper) {
            switch(arguments.length){
                case 0:
                    return new NativeConstructor();
                case 1:
                    return new NativeConstructor(a);
                case 2:
                    return new NativeConstructor(a, b);
            }
            return new NativeConstructor(a, b, c);
        }
        return apply(NativeConstructor, this, arguments);
    };
    Wrapper.prototype = NativeConstructor.prototype;
    return Wrapper;
};
/*
  options.target         - name of the target object
  options.global         - target is the global object
  options.stat           - export as static methods of target
  options.proto          - export as prototype methods of target
  options.real           - real prototype method for the `pure` version
  options.forced         - export even if the native feature is available
  options.bind           - bind methods to the target, required for the `pure` version
  options.wrap           - wrap constructors to preventing global pollution, required for the `pure` version
  options.unsafe         - use the simple assignment of property instead of delete + defineProperty
  options.sham           - add a flag to not completely full polyfills
  options.enumerable     - export as enumerable property
  options.dontCallGetSet - prevent calling a getter on target
  options.name           - the .name of the function if it does not match the key
*/ module.exports = function(options, source) {
    var TARGET = options.target;
    var GLOBAL = options.global;
    var STATIC = options.stat;
    var PROTO = options.proto;
    var nativeSource = GLOBAL ? globalThis : STATIC ? globalThis[TARGET] : globalThis[TARGET] && globalThis[TARGET].prototype;
    var target = GLOBAL ? path : path[TARGET] || createNonEnumerableProperty(path, TARGET, {})[TARGET];
    var targetPrototype = target.prototype;
    var FORCED, USE_NATIVE, VIRTUAL_PROTOTYPE;
    var key, sourceProperty, targetProperty, nativeProperty, resultProperty, descriptor;
    for(key in source){
        FORCED = isForced(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);
        // contains in native
        USE_NATIVE = !FORCED && nativeSource && hasOwn(nativeSource, key);
        targetProperty = target[key];
        if (USE_NATIVE) if (options.dontCallGetSet) {
            descriptor = getOwnPropertyDescriptor(nativeSource, key);
            nativeProperty = descriptor && descriptor.value;
        } else nativeProperty = nativeSource[key];
        // export native or implementation
        sourceProperty = USE_NATIVE && nativeProperty ? nativeProperty : source[key];
        if (!FORCED && !PROTO && typeof targetProperty == typeof sourceProperty) continue;
        // bind methods to global for calling from export context
        if (options.bind && USE_NATIVE) resultProperty = bind(sourceProperty, globalThis);
        else if (options.wrap && USE_NATIVE) resultProperty = wrapConstructor(sourceProperty);
        else if (PROTO && isCallable(sourceProperty)) resultProperty = uncurryThis(sourceProperty);
        else resultProperty = sourceProperty;
        // add a flag to not completely full polyfills
        if (options.sham || sourceProperty && sourceProperty.sham || targetProperty && targetProperty.sham) {
            createNonEnumerableProperty(resultProperty, 'sham', true);
        }
        createNonEnumerableProperty(target, key, resultProperty);
        if (PROTO) {
            VIRTUAL_PROTOTYPE = TARGET + 'Prototype';
            if (!hasOwn(path, VIRTUAL_PROTOTYPE)) {
                createNonEnumerableProperty(path, VIRTUAL_PROTOTYPE, {});
            }
            // export virtual prototype methods
            createNonEnumerableProperty(path[VIRTUAL_PROTOTYPE], key, sourceProperty);
            // export real prototype methods
            if (options.real && targetPrototype && (FORCED || !targetPrototype[key])) {
                createNonEnumerableProperty(targetPrototype, key, sourceProperty);
            }
        }
    }
};
}),
"[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/math-trunc.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var ceil = Math.ceil;
var floor = Math.floor;
// `Math.trunc` method
// https://tc39.es/ecma262/#sec-math.trunc
// eslint-disable-next-line es/no-math-trunc -- safe
module.exports = Math.trunc || function trunc(x) {
    var n = +x;
    return (n > 0 ? floor : ceil)(n);
};
}),
"[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/to-integer-or-infinity.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var trunc = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/math-trunc.js [app-client] (ecmascript)");
// `ToIntegerOrInfinity` abstract operation
// https://tc39.es/ecma262/#sec-tointegerorinfinity
module.exports = function(argument) {
    var number = +argument;
    // eslint-disable-next-line no-self-compare -- NaN check
    return number !== number || number === 0 ? 0 : trunc(number);
};
}),
"[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/to-absolute-index.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var toIntegerOrInfinity = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/to-integer-or-infinity.js [app-client] (ecmascript)");
var max = Math.max;
var min = Math.min;
// Helper for a popular repeating case of the spec:
// Let integer be ? ToInteger(index).
// If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).
module.exports = function(index, length) {
    var integer = toIntegerOrInfinity(index);
    return integer < 0 ? max(integer + length, 0) : min(integer, length);
};
}),
"[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/to-length.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var toIntegerOrInfinity = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/to-integer-or-infinity.js [app-client] (ecmascript)");
var min = Math.min;
// `ToLength` abstract operation
// https://tc39.es/ecma262/#sec-tolength
module.exports = function(argument) {
    var len = toIntegerOrInfinity(argument);
    return len > 0 ? min(len, 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
};
}),
"[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/length-of-array-like.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var toLength = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/to-length.js [app-client] (ecmascript)");
// `LengthOfArrayLike` abstract operation
// https://tc39.es/ecma262/#sec-lengthofarraylike
module.exports = function(obj) {
    return toLength(obj.length);
};
}),
"[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/array-includes.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var toIndexedObject = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/to-indexed-object.js [app-client] (ecmascript)");
var toAbsoluteIndex = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/to-absolute-index.js [app-client] (ecmascript)");
var lengthOfArrayLike = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/length-of-array-like.js [app-client] (ecmascript)");
// `Array.prototype.{ indexOf, includes }` methods implementation
var createMethod = function(IS_INCLUDES) {
    return function($this, el, fromIndex) {
        var O = toIndexedObject($this);
        var length = lengthOfArrayLike(O);
        if (length === 0) return !IS_INCLUDES && -1;
        var index = toAbsoluteIndex(fromIndex, length);
        var value;
        // Array#includes uses SameValueZero equality algorithm
        // eslint-disable-next-line no-self-compare -- NaN check
        if (IS_INCLUDES && el !== el) while(length > index){
            value = O[index++];
            // eslint-disable-next-line no-self-compare -- NaN check
            if (value !== value) return true;
        // Array#indexOf ignores holes, Array#includes - not
        }
        else for(; length > index; index++){
            if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
        }
        return !IS_INCLUDES && -1;
    };
};
module.exports = {
    // `Array.prototype.includes` method
    // https://tc39.es/ecma262/#sec-array.prototype.includes
    includes: createMethod(true),
    // `Array.prototype.indexOf` method
    // https://tc39.es/ecma262/#sec-array.prototype.indexof
    indexOf: createMethod(false)
};
}),
"[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/hidden-keys.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

module.exports = {};
}),
"[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/object-keys-internal.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var uncurryThis = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/function-uncurry-this.js [app-client] (ecmascript)");
var hasOwn = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/has-own-property.js [app-client] (ecmascript)");
var toIndexedObject = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/to-indexed-object.js [app-client] (ecmascript)");
var indexOf = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/array-includes.js [app-client] (ecmascript)").indexOf;
var hiddenKeys = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/hidden-keys.js [app-client] (ecmascript)");
var push = uncurryThis([].push);
module.exports = function(object, names) {
    var O = toIndexedObject(object);
    var i = 0;
    var result = [];
    var key;
    for(key in O)!hasOwn(hiddenKeys, key) && hasOwn(O, key) && push(result, key);
    // Don't enum bug & hidden keys
    while(names.length > i)if (hasOwn(O, key = names[i++])) {
        ~indexOf(result, key) || push(result, key);
    }
    return result;
};
}),
"[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/enum-bug-keys.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// IE8- don't enum bug keys
module.exports = [
    'constructor',
    'hasOwnProperty',
    'isPrototypeOf',
    'propertyIsEnumerable',
    'toLocaleString',
    'toString',
    'valueOf'
];
}),
"[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/object-keys.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var internalObjectKeys = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/object-keys-internal.js [app-client] (ecmascript)");
var enumBugKeys = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/enum-bug-keys.js [app-client] (ecmascript)");
// `Object.keys` method
// https://tc39.es/ecma262/#sec-object.keys
// eslint-disable-next-line es/no-object-keys -- safe
module.exports = Object.keys || function keys(O) {
    return internalObjectKeys(O, enumBugKeys);
};
}),
"[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/object-get-own-property-symbols.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// eslint-disable-next-line es/no-object-getownpropertysymbols -- safe
exports.f = Object.getOwnPropertySymbols;
}),
"[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/object-assign.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var DESCRIPTORS = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/descriptors.js [app-client] (ecmascript)");
var uncurryThis = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/function-uncurry-this.js [app-client] (ecmascript)");
var call = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/function-call.js [app-client] (ecmascript)");
var fails = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/fails.js [app-client] (ecmascript)");
var objectKeys = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/object-keys.js [app-client] (ecmascript)");
var getOwnPropertySymbolsModule = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/object-get-own-property-symbols.js [app-client] (ecmascript)");
var propertyIsEnumerableModule = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/object-property-is-enumerable.js [app-client] (ecmascript)");
var toObject = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/to-object.js [app-client] (ecmascript)");
var IndexedObject = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/indexed-object.js [app-client] (ecmascript)");
// eslint-disable-next-line es/no-object-assign -- safe
var $assign = Object.assign;
// eslint-disable-next-line es/no-object-defineproperty -- required for testing
var defineProperty = Object.defineProperty;
var concat = uncurryThis([].concat);
// `Object.assign` method
// https://tc39.es/ecma262/#sec-object.assign
module.exports = !$assign || fails(function() {
    // should have correct order of operations (Edge bug)
    if (DESCRIPTORS && $assign({
        b: 1
    }, $assign(defineProperty({}, 'a', {
        enumerable: true,
        get: function() {
            defineProperty(this, 'b', {
                value: 3,
                enumerable: false
            });
        }
    }), {
        b: 2
    })).b !== 1) return true;
    // should work with symbols and should have deterministic property order (V8 bug)
    var A = {};
    var B = {};
    // eslint-disable-next-line es/no-symbol -- safe
    var symbol = Symbol('assign detection');
    var alphabet = 'abcdefghijklmnopqrst';
    A[symbol] = 7;
    // eslint-disable-next-line es/no-array-prototype-foreach -- safe
    alphabet.split('').forEach(function(chr) {
        B[chr] = chr;
    });
    return $assign({}, A)[symbol] !== 7 || objectKeys($assign({}, B)).join('') !== alphabet;
}) ? function assign(target, source) {
    var T = toObject(target);
    var argumentsLength = arguments.length;
    var index = 1;
    var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
    var propertyIsEnumerable = propertyIsEnumerableModule.f;
    while(argumentsLength > index){
        var S = IndexedObject(arguments[index++]);
        var keys = getOwnPropertySymbols ? concat(objectKeys(S), getOwnPropertySymbols(S)) : objectKeys(S);
        var length = keys.length;
        var j = 0;
        var key;
        while(length > j){
            key = keys[j++];
            if (!DESCRIPTORS || call(propertyIsEnumerable, S, key)) T[key] = S[key];
        }
    }
    return T;
} : $assign;
}),
"[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/modules/es.object.assign.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var $ = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/export.js [app-client] (ecmascript)");
var assign = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/object-assign.js [app-client] (ecmascript)");
// `Object.assign` method
// https://tc39.es/ecma262/#sec-object.assign
// eslint-disable-next-line es/no-object-assign -- required for testing
$({
    target: 'Object',
    stat: true,
    arity: 2,
    forced: Object.assign !== assign
}, {
    assign: assign
});
}),
"[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/es/object/assign.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

__turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/modules/es.object.assign.js [app-client] (ecmascript)");
var path = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/path.js [app-client] (ecmascript)");
module.exports = path.Object.assign;
}),
"[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/stable/object/assign.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var parent = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/es/object/assign.js [app-client] (ecmascript)");
module.exports = parent;
}),
"[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/actual/object/assign.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var parent = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/stable/object/assign.js [app-client] (ecmascript)");
module.exports = parent;
}),
"[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/full/object/assign.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var parent = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/actual/object/assign.js [app-client] (ecmascript)");
module.exports = parent;
}),
"[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/features/object/assign.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

module.exports = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/full/object/assign.js [app-client] (ecmascript)");
}),
"[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/array-slice.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var uncurryThis = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/function-uncurry-this.js [app-client] (ecmascript)");
module.exports = uncurryThis([].slice);
}),
"[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/function-bind.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var uncurryThis = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/function-uncurry-this.js [app-client] (ecmascript)");
var aCallable = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/a-callable.js [app-client] (ecmascript)");
var isObject = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/is-object.js [app-client] (ecmascript)");
var hasOwn = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/has-own-property.js [app-client] (ecmascript)");
var arraySlice = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/array-slice.js [app-client] (ecmascript)");
var NATIVE_BIND = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/function-bind-native.js [app-client] (ecmascript)");
var $Function = Function;
var concat = uncurryThis([].concat);
var join = uncurryThis([].join);
var factories = {};
var construct = function(C, argsLength, args) {
    if (!hasOwn(factories, argsLength)) {
        var list = [];
        var i = 0;
        for(; i < argsLength; i++)list[i] = 'a[' + i + ']';
        factories[argsLength] = $Function('C,a', 'return new C(' + join(list, ',') + ')');
    }
    return factories[argsLength](C, args);
};
// `Function.prototype.bind` method implementation
// https://tc39.es/ecma262/#sec-function.prototype.bind
// eslint-disable-next-line es/no-function-prototype-bind -- detection
module.exports = NATIVE_BIND ? $Function.bind : function bind(that /* , ...args */ ) {
    var F = aCallable(this);
    var Prototype = F.prototype;
    var partArgs = arraySlice(arguments, 1);
    var boundFunction = function bound() {
        var args = concat(partArgs, arraySlice(arguments));
        return this instanceof boundFunction ? construct(F, args.length, args) : F.apply(that, args);
    };
    if (isObject(Prototype)) boundFunction.prototype = Prototype;
    return boundFunction;
};
}),
"[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/modules/es.function.bind.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// TODO: Remove from `core-js@4`
var $ = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/export.js [app-client] (ecmascript)");
var bind = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/function-bind.js [app-client] (ecmascript)");
// `Function.prototype.bind` method
// https://tc39.es/ecma262/#sec-function.prototype.bind
// eslint-disable-next-line es/no-function-prototype-bind -- detection
$({
    target: 'Function',
    proto: true,
    forced: Function.bind !== bind
}, {
    bind: bind
});
}),
"[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/get-built-in-prototype-method.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var globalThis = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/global-this.js [app-client] (ecmascript)");
var path = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/path.js [app-client] (ecmascript)");
module.exports = function(CONSTRUCTOR, METHOD) {
    var Namespace = path[CONSTRUCTOR + 'Prototype'];
    var pureMethod = Namespace && Namespace[METHOD];
    if (pureMethod) return pureMethod;
    var NativeConstructor = globalThis[CONSTRUCTOR];
    var NativePrototype = NativeConstructor && NativeConstructor.prototype;
    return NativePrototype && NativePrototype[METHOD];
};
}),
"[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/es/function/virtual/bind.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

__turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/modules/es.function.bind.js [app-client] (ecmascript)");
var getBuiltInPrototypeMethod = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/get-built-in-prototype-method.js [app-client] (ecmascript)");
module.exports = getBuiltInPrototypeMethod('Function', 'bind');
}),
"[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/es/instance/bind.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var isPrototypeOf = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/object-is-prototype-of.js [app-client] (ecmascript)");
var method = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/es/function/virtual/bind.js [app-client] (ecmascript)");
var FunctionPrototype = Function.prototype;
module.exports = function(it) {
    var own = it.bind;
    return it === FunctionPrototype || isPrototypeOf(FunctionPrototype, it) && own === FunctionPrototype.bind ? method : own;
};
}),
"[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/stable/instance/bind.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var parent = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/es/instance/bind.js [app-client] (ecmascript)");
module.exports = parent;
}),
"[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/actual/instance/bind.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var parent = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/stable/instance/bind.js [app-client] (ecmascript)");
module.exports = parent;
}),
"[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/full/instance/bind.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var parent = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/actual/instance/bind.js [app-client] (ecmascript)");
module.exports = parent;
}),
"[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/features/instance/bind.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

module.exports = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/full/instance/bind.js [app-client] (ecmascript)");
}),
"[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/shared-key.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var shared = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/shared.js [app-client] (ecmascript)");
var uid = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/uid.js [app-client] (ecmascript)");
var keys = shared('keys');
module.exports = function(key) {
    return keys[key] || (keys[key] = uid(key));
};
}),
"[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/correct-prototype-getter.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var fails = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/fails.js [app-client] (ecmascript)");
module.exports = !fails(function() {
    function F() {}
    F.prototype.constructor = null;
    // eslint-disable-next-line es/no-object-getprototypeof -- required for testing
    return Object.getPrototypeOf(new F()) !== F.prototype;
});
}),
"[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/object-get-prototype-of.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var hasOwn = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/has-own-property.js [app-client] (ecmascript)");
var isCallable = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/is-callable.js [app-client] (ecmascript)");
var toObject = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/to-object.js [app-client] (ecmascript)");
var sharedKey = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/shared-key.js [app-client] (ecmascript)");
var CORRECT_PROTOTYPE_GETTER = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/correct-prototype-getter.js [app-client] (ecmascript)");
var IE_PROTO = sharedKey('IE_PROTO');
var $Object = Object;
var ObjectPrototype = $Object.prototype;
// `Object.getPrototypeOf` method
// https://tc39.es/ecma262/#sec-object.getprototypeof
// eslint-disable-next-line es/no-object-getprototypeof -- safe
module.exports = CORRECT_PROTOTYPE_GETTER ? $Object.getPrototypeOf : function(O) {
    var object = toObject(O);
    if (hasOwn(object, IE_PROTO)) return object[IE_PROTO];
    var constructor = object.constructor;
    if (isCallable(constructor) && object instanceof constructor) {
        return constructor.prototype;
    }
    return object instanceof $Object ? ObjectPrototype : null;
};
}),
"[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/function-uncurry-this-accessor.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var uncurryThis = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/function-uncurry-this.js [app-client] (ecmascript)");
var aCallable = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/a-callable.js [app-client] (ecmascript)");
module.exports = function(object, key, method) {
    try {
        // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
        return uncurryThis(aCallable(Object.getOwnPropertyDescriptor(object, key)[method]));
    } catch (error) {}
};
}),
"[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/is-possible-prototype.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var isObject = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/is-object.js [app-client] (ecmascript)");
module.exports = function(argument) {
    return isObject(argument) || argument === null;
};
}),
"[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/a-possible-prototype.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var isPossiblePrototype = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/is-possible-prototype.js [app-client] (ecmascript)");
var $String = String;
var $TypeError = TypeError;
module.exports = function(argument) {
    if (isPossiblePrototype(argument)) return argument;
    throw new $TypeError("Can't set " + $String(argument) + ' as a prototype');
};
}),
"[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/object-set-prototype-of.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/* eslint-disable no-proto -- safe */ var uncurryThisAccessor = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/function-uncurry-this-accessor.js [app-client] (ecmascript)");
var isObject = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/is-object.js [app-client] (ecmascript)");
var requireObjectCoercible = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/require-object-coercible.js [app-client] (ecmascript)");
var aPossiblePrototype = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/a-possible-prototype.js [app-client] (ecmascript)");
// `Object.setPrototypeOf` method
// https://tc39.es/ecma262/#sec-object.setprototypeof
// Works with __proto__ only. Old v8 can't work with null proto objects.
// eslint-disable-next-line es/no-object-setprototypeof -- safe
module.exports = Object.setPrototypeOf || ('__proto__' in {} ? function() {
    var CORRECT_SETTER = false;
    var test = {};
    var setter;
    try {
        setter = uncurryThisAccessor(Object.prototype, '__proto__', 'set');
        setter(test, []);
        CORRECT_SETTER = test instanceof Array;
    } catch (error) {}
    return function setPrototypeOf(O, proto) {
        requireObjectCoercible(O);
        aPossiblePrototype(proto);
        if (!isObject(O)) return O;
        if (CORRECT_SETTER) setter(O, proto);
        else O.__proto__ = proto;
        return O;
    };
}() : undefined);
}),
"[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/object-get-own-property-names.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var internalObjectKeys = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/object-keys-internal.js [app-client] (ecmascript)");
var enumBugKeys = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/enum-bug-keys.js [app-client] (ecmascript)");
var hiddenKeys = enumBugKeys.concat('length', 'prototype');
// `Object.getOwnPropertyNames` method
// https://tc39.es/ecma262/#sec-object.getownpropertynames
// eslint-disable-next-line es/no-object-getownpropertynames -- safe
exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
    return internalObjectKeys(O, hiddenKeys);
};
}),
"[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/own-keys.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var getBuiltIn = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/get-built-in.js [app-client] (ecmascript)");
var uncurryThis = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/function-uncurry-this.js [app-client] (ecmascript)");
var getOwnPropertyNamesModule = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/object-get-own-property-names.js [app-client] (ecmascript)");
var getOwnPropertySymbolsModule = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/object-get-own-property-symbols.js [app-client] (ecmascript)");
var anObject = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/an-object.js [app-client] (ecmascript)");
var concat = uncurryThis([].concat);
// all object keys, includes non-enumerable and symbols
module.exports = getBuiltIn('Reflect', 'ownKeys') || function ownKeys(it) {
    var keys = getOwnPropertyNamesModule.f(anObject(it));
    var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
    return getOwnPropertySymbols ? concat(keys, getOwnPropertySymbols(it)) : keys;
};
}),
"[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/copy-constructor-properties.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var hasOwn = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/has-own-property.js [app-client] (ecmascript)");
var ownKeys = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/own-keys.js [app-client] (ecmascript)");
var getOwnPropertyDescriptorModule = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/object-get-own-property-descriptor.js [app-client] (ecmascript)");
var definePropertyModule = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/object-define-property.js [app-client] (ecmascript)");
module.exports = function(target, source, exceptions) {
    var keys = ownKeys(source);
    var defineProperty = definePropertyModule.f;
    var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
    for(var i = 0; i < keys.length; i++){
        var key = keys[i];
        if (!hasOwn(target, key) && !(exceptions && hasOwn(exceptions, key))) {
            defineProperty(target, key, getOwnPropertyDescriptor(source, key));
        }
    }
};
}),
"[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/object-define-properties.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var DESCRIPTORS = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/descriptors.js [app-client] (ecmascript)");
var V8_PROTOTYPE_DEFINE_BUG = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/v8-prototype-define-bug.js [app-client] (ecmascript)");
var definePropertyModule = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/object-define-property.js [app-client] (ecmascript)");
var anObject = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/an-object.js [app-client] (ecmascript)");
var toIndexedObject = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/to-indexed-object.js [app-client] (ecmascript)");
var objectKeys = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/object-keys.js [app-client] (ecmascript)");
// `Object.defineProperties` method
// https://tc39.es/ecma262/#sec-object.defineproperties
// eslint-disable-next-line es/no-object-defineproperties -- safe
exports.f = DESCRIPTORS && !V8_PROTOTYPE_DEFINE_BUG ? Object.defineProperties : function defineProperties(O, Properties) {
    anObject(O);
    var props = toIndexedObject(Properties);
    var keys = objectKeys(Properties);
    var length = keys.length;
    var index = 0;
    var key;
    while(length > index)definePropertyModule.f(O, key = keys[index++], props[key]);
    return O;
};
}),
"[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/html.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var getBuiltIn = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/get-built-in.js [app-client] (ecmascript)");
module.exports = getBuiltIn('document', 'documentElement');
}),
"[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/object-create.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/* global ActiveXObject -- old IE, WSH */ var anObject = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/an-object.js [app-client] (ecmascript)");
var definePropertiesModule = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/object-define-properties.js [app-client] (ecmascript)");
var enumBugKeys = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/enum-bug-keys.js [app-client] (ecmascript)");
var hiddenKeys = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/hidden-keys.js [app-client] (ecmascript)");
var html = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/html.js [app-client] (ecmascript)");
var documentCreateElement = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/document-create-element.js [app-client] (ecmascript)");
var sharedKey = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/shared-key.js [app-client] (ecmascript)");
var GT = '>';
var LT = '<';
var PROTOTYPE = 'prototype';
var SCRIPT = 'script';
var IE_PROTO = sharedKey('IE_PROTO');
var EmptyConstructor = function() {};
var scriptTag = function(content) {
    return LT + SCRIPT + GT + content + LT + '/' + SCRIPT + GT;
};
// Create object with fake `null` prototype: use ActiveX Object with cleared prototype
var NullProtoObjectViaActiveX = function(activeXDocument) {
    activeXDocument.write(scriptTag(''));
    activeXDocument.close();
    var temp = activeXDocument.parentWindow.Object;
    // eslint-disable-next-line no-useless-assignment -- avoid memory leak
    activeXDocument = null;
    return temp;
};
// Create object with fake `null` prototype: use iframe Object with cleared prototype
var NullProtoObjectViaIFrame = function() {
    // Thrash, waste and sodomy: IE GC bug
    var iframe = documentCreateElement('iframe');
    var JS = 'java' + SCRIPT + ':';
    var iframeDocument;
    iframe.style.display = 'none';
    html.appendChild(iframe);
    // https://github.com/zloirock/core-js/issues/475
    iframe.src = String(JS);
    iframeDocument = iframe.contentWindow.document;
    iframeDocument.open();
    iframeDocument.write(scriptTag('document.F=Object'));
    iframeDocument.close();
    return iframeDocument.F;
};
// Check for document.domain and active x support
// No need to use active x approach when document.domain is not set
// see https://github.com/es-shims/es5-shim/issues/150
// variation of https://github.com/kitcambridge/es5-shim/commit/4f738ac066346
// avoid IE GC bug
var activeXDocument;
var NullProtoObject = function() {
    try {
        activeXDocument = new ActiveXObject('htmlfile');
    } catch (error) {}
    NullProtoObject = typeof document != 'undefined' ? document.domain && activeXDocument ? NullProtoObjectViaActiveX(activeXDocument) // old IE
     : NullProtoObjectViaIFrame() : NullProtoObjectViaActiveX(activeXDocument); // WSH
    var length = enumBugKeys.length;
    while(length--)delete NullProtoObject[PROTOTYPE][enumBugKeys[length]];
    return NullProtoObject();
};
hiddenKeys[IE_PROTO] = true;
// `Object.create` method
// https://tc39.es/ecma262/#sec-object.create
// eslint-disable-next-line es/no-object-create -- safe
module.exports = Object.create || function create(O, Properties) {
    var result;
    if (O !== null) {
        EmptyConstructor[PROTOTYPE] = anObject(O);
        result = new EmptyConstructor();
        EmptyConstructor[PROTOTYPE] = null;
        // add "__proto__" for Object.getPrototypeOf polyfill
        result[IE_PROTO] = O;
    } else result = NullProtoObject();
    return Properties === undefined ? result : definePropertiesModule.f(result, Properties);
};
}),
"[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/install-error-cause.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var isObject = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/is-object.js [app-client] (ecmascript)");
var createNonEnumerableProperty = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/create-non-enumerable-property.js [app-client] (ecmascript)");
// `InstallErrorCause` abstract operation
// https://tc39.es/ecma262/#sec-installerrorcause
module.exports = function(O, options) {
    if (isObject(options) && 'cause' in options) {
        createNonEnumerableProperty(O, 'cause', options.cause);
    }
};
}),
"[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/error-stack-clear.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var uncurryThis = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/function-uncurry-this.js [app-client] (ecmascript)");
var $Error = Error;
var replace = uncurryThis(''.replace);
var TEST = function(arg) {
    return String(new $Error(arg).stack);
}('zxcasd');
// eslint-disable-next-line redos/no-vulnerable, sonarjs/slow-regex -- safe
var V8_OR_CHAKRA_STACK_ENTRY = /\n\s*at [^:]*:[^\n]*/;
var IS_V8_OR_CHAKRA_STACK = V8_OR_CHAKRA_STACK_ENTRY.test(TEST);
module.exports = function(stack, dropEntries) {
    if (IS_V8_OR_CHAKRA_STACK && typeof stack == 'string' && !$Error.prepareStackTrace) {
        while(dropEntries--)stack = replace(stack, V8_OR_CHAKRA_STACK_ENTRY, '');
    }
    return stack;
};
}),
"[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/error-stack-installable.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var fails = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/fails.js [app-client] (ecmascript)");
var createPropertyDescriptor = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/create-property-descriptor.js [app-client] (ecmascript)");
module.exports = !fails(function() {
    var error = new Error('a');
    if (!('stack' in error)) return true;
    // eslint-disable-next-line es/no-object-defineproperty -- safe
    Object.defineProperty(error, 'stack', createPropertyDescriptor(1, 7));
    return error.stack !== 7;
});
}),
"[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/error-stack-install.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var createNonEnumerableProperty = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/create-non-enumerable-property.js [app-client] (ecmascript)");
var clearErrorStack = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/error-stack-clear.js [app-client] (ecmascript)");
var ERROR_STACK_INSTALLABLE = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/error-stack-installable.js [app-client] (ecmascript)");
// non-standard V8
// eslint-disable-next-line es/no-nonstandard-error-properties -- safe
var captureStackTrace = Error.captureStackTrace;
module.exports = function(error, C, stack, dropEntries) {
    if (ERROR_STACK_INSTALLABLE) {
        if (captureStackTrace) captureStackTrace(error, C);
        else createNonEnumerableProperty(error, 'stack', clearErrorStack(stack, dropEntries));
    }
};
}),
"[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/iterators.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

module.exports = {};
}),
"[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/is-array-iterator-method.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var wellKnownSymbol = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/well-known-symbol.js [app-client] (ecmascript)");
var Iterators = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/iterators.js [app-client] (ecmascript)");
var ITERATOR = wellKnownSymbol('iterator');
var ArrayPrototype = Array.prototype;
// check on default Array iterator
module.exports = function(it) {
    return it !== undefined && (Iterators.Array === it || ArrayPrototype[ITERATOR] === it);
};
}),
"[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/to-string-tag-support.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var wellKnownSymbol = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/well-known-symbol.js [app-client] (ecmascript)");
var TO_STRING_TAG = wellKnownSymbol('toStringTag');
var test = {};
// eslint-disable-next-line unicorn/no-immediate-mutation -- ES3 syntax limitation
test[TO_STRING_TAG] = 'z';
module.exports = String(test) === '[object z]';
}),
"[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/classof.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var TO_STRING_TAG_SUPPORT = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/to-string-tag-support.js [app-client] (ecmascript)");
var isCallable = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/is-callable.js [app-client] (ecmascript)");
var classofRaw = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/classof-raw.js [app-client] (ecmascript)");
var wellKnownSymbol = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/well-known-symbol.js [app-client] (ecmascript)");
var TO_STRING_TAG = wellKnownSymbol('toStringTag');
var $Object = Object;
// ES3 wrong here
var CORRECT_ARGUMENTS = classofRaw(function() {
    return arguments;
}()) === 'Arguments';
// fallback for IE11 Script Access Denied error
var tryGet = function(it, key) {
    try {
        return it[key];
    } catch (error) {}
};
// getting tag from ES6+ `Object.prototype.toString`
module.exports = TO_STRING_TAG_SUPPORT ? classofRaw : function(it) {
    var O, tag, result;
    return it === undefined ? 'Undefined' : it === null ? 'Null' : typeof (tag = tryGet(O = $Object(it), TO_STRING_TAG)) == 'string' ? tag : CORRECT_ARGUMENTS ? classofRaw(O) : (result = classofRaw(O)) === 'Object' && isCallable(O.callee) ? 'Arguments' : result;
};
}),
"[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/get-iterator-method.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var classof = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/classof.js [app-client] (ecmascript)");
var getMethod = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/get-method.js [app-client] (ecmascript)");
var isNullOrUndefined = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/is-null-or-undefined.js [app-client] (ecmascript)");
var Iterators = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/iterators.js [app-client] (ecmascript)");
var wellKnownSymbol = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/well-known-symbol.js [app-client] (ecmascript)");
var ITERATOR = wellKnownSymbol('iterator');
module.exports = function(it) {
    if (!isNullOrUndefined(it)) return getMethod(it, ITERATOR) || getMethod(it, '@@iterator') || Iterators[classof(it)];
};
}),
"[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/get-iterator.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var call = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/function-call.js [app-client] (ecmascript)");
var aCallable = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/a-callable.js [app-client] (ecmascript)");
var anObject = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/an-object.js [app-client] (ecmascript)");
var tryToString = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/try-to-string.js [app-client] (ecmascript)");
var getIteratorMethod = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/get-iterator-method.js [app-client] (ecmascript)");
var $TypeError = TypeError;
module.exports = function(argument, usingIterator) {
    var iteratorMethod = arguments.length < 2 ? getIteratorMethod(argument) : usingIterator;
    if (aCallable(iteratorMethod)) return anObject(call(iteratorMethod, argument));
    throw new $TypeError(tryToString(argument) + ' is not iterable');
};
}),
"[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/iterator-close.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var call = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/function-call.js [app-client] (ecmascript)");
var anObject = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/an-object.js [app-client] (ecmascript)");
var getMethod = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/get-method.js [app-client] (ecmascript)");
module.exports = function(iterator, kind, value) {
    var innerResult, innerError;
    anObject(iterator);
    try {
        innerResult = getMethod(iterator, 'return');
        if (!innerResult) {
            if (kind === 'throw') throw value;
            return value;
        }
        innerResult = call(innerResult, iterator);
    } catch (error) {
        innerError = true;
        innerResult = error;
    }
    if (kind === 'throw') throw value;
    if (innerError) throw innerResult;
    anObject(innerResult);
    return value;
};
}),
"[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/iterate.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var bind = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/function-bind-context.js [app-client] (ecmascript)");
var call = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/function-call.js [app-client] (ecmascript)");
var anObject = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/an-object.js [app-client] (ecmascript)");
var tryToString = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/try-to-string.js [app-client] (ecmascript)");
var isArrayIteratorMethod = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/is-array-iterator-method.js [app-client] (ecmascript)");
var lengthOfArrayLike = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/length-of-array-like.js [app-client] (ecmascript)");
var isPrototypeOf = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/object-is-prototype-of.js [app-client] (ecmascript)");
var getIterator = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/get-iterator.js [app-client] (ecmascript)");
var getIteratorMethod = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/get-iterator-method.js [app-client] (ecmascript)");
var iteratorClose = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/iterator-close.js [app-client] (ecmascript)");
var $TypeError = TypeError;
var Result = function(stopped, result) {
    this.stopped = stopped;
    this.result = result;
};
var ResultPrototype = Result.prototype;
module.exports = function(iterable, unboundFunction, options) {
    var that = options && options.that;
    var AS_ENTRIES = !!(options && options.AS_ENTRIES);
    var IS_RECORD = !!(options && options.IS_RECORD);
    var IS_ITERATOR = !!(options && options.IS_ITERATOR);
    var INTERRUPTED = !!(options && options.INTERRUPTED);
    var fn = bind(unboundFunction, that);
    var iterator, iterFn, index, length, result, next, step;
    var stop = function(condition) {
        if (iterator) iteratorClose(iterator, 'normal');
        return new Result(true, condition);
    };
    var callFn = function(value) {
        if (AS_ENTRIES) {
            anObject(value);
            return INTERRUPTED ? fn(value[0], value[1], stop) : fn(value[0], value[1]);
        }
        return INTERRUPTED ? fn(value, stop) : fn(value);
    };
    if (IS_RECORD) {
        iterator = iterable.iterator;
    } else if (IS_ITERATOR) {
        iterator = iterable;
    } else {
        iterFn = getIteratorMethod(iterable);
        if (!iterFn) throw new $TypeError(tryToString(iterable) + ' is not iterable');
        // optimisation for array iterators
        if (isArrayIteratorMethod(iterFn)) {
            for(index = 0, length = lengthOfArrayLike(iterable); length > index; index++){
                result = callFn(iterable[index]);
                if (result && isPrototypeOf(ResultPrototype, result)) return result;
            }
            return new Result(false);
        }
        iterator = getIterator(iterable, iterFn);
    }
    next = IS_RECORD ? iterable.next : iterator.next;
    while(!(step = call(next, iterator)).done){
        try {
            result = callFn(step.value);
        } catch (error) {
            iteratorClose(iterator, 'throw', error);
        }
        if (typeof result == 'object' && result && isPrototypeOf(ResultPrototype, result)) return result;
    }
    return new Result(false);
};
}),
"[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/to-string.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var classof = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/classof.js [app-client] (ecmascript)");
var $String = String;
module.exports = function(argument) {
    if (classof(argument) === 'Symbol') throw new TypeError('Cannot convert a Symbol value to a string');
    return $String(argument);
};
}),
"[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/normalize-string-argument.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var toString = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/to-string.js [app-client] (ecmascript)");
module.exports = function(argument, $default) {
    return argument === undefined ? arguments.length < 2 ? '' : $default : toString(argument);
};
}),
"[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/modules/es.aggregate-error.constructor.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var $ = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/export.js [app-client] (ecmascript)");
var isPrototypeOf = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/object-is-prototype-of.js [app-client] (ecmascript)");
var getPrototypeOf = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/object-get-prototype-of.js [app-client] (ecmascript)");
var setPrototypeOf = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/object-set-prototype-of.js [app-client] (ecmascript)");
var copyConstructorProperties = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/copy-constructor-properties.js [app-client] (ecmascript)");
var create = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/object-create.js [app-client] (ecmascript)");
var createNonEnumerableProperty = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/create-non-enumerable-property.js [app-client] (ecmascript)");
var createPropertyDescriptor = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/create-property-descriptor.js [app-client] (ecmascript)");
var installErrorCause = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/install-error-cause.js [app-client] (ecmascript)");
var installErrorStack = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/error-stack-install.js [app-client] (ecmascript)");
var iterate = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/iterate.js [app-client] (ecmascript)");
var normalizeStringArgument = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/normalize-string-argument.js [app-client] (ecmascript)");
var wellKnownSymbol = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/well-known-symbol.js [app-client] (ecmascript)");
var TO_STRING_TAG = wellKnownSymbol('toStringTag');
var $Error = Error;
var push = [].push;
var $AggregateError = function AggregateError(errors, message /* , options */ ) {
    var isInstance = isPrototypeOf(AggregateErrorPrototype, this);
    var that;
    if (setPrototypeOf) {
        that = setPrototypeOf(new $Error(), isInstance ? getPrototypeOf(this) : AggregateErrorPrototype);
    } else {
        that = isInstance ? this : create(AggregateErrorPrototype);
        createNonEnumerableProperty(that, TO_STRING_TAG, 'Error');
    }
    if (message !== undefined) createNonEnumerableProperty(that, 'message', normalizeStringArgument(message));
    installErrorStack(that, $AggregateError, that.stack, 1);
    if (arguments.length > 2) installErrorCause(that, arguments[2]);
    var errorsArray = [];
    iterate(errors, push, {
        that: errorsArray
    });
    createNonEnumerableProperty(that, 'errors', errorsArray);
    return that;
};
if (setPrototypeOf) setPrototypeOf($AggregateError, $Error);
else copyConstructorProperties($AggregateError, $Error, {
    name: true
});
var AggregateErrorPrototype = $AggregateError.prototype = create($Error.prototype, {
    constructor: createPropertyDescriptor(1, $AggregateError),
    message: createPropertyDescriptor(1, ''),
    name: createPropertyDescriptor(1, 'AggregateError')
});
// `AggregateError` constructor
// https://tc39.es/ecma262/#sec-aggregate-error-constructor
$({
    global: true,
    constructor: true,
    arity: 2
}, {
    AggregateError: $AggregateError
});
}),
"[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/modules/es.aggregate-error.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// TODO: Remove this module from `core-js@4` since it's replaced to module below
__turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/modules/es.aggregate-error.constructor.js [app-client] (ecmascript)");
}),
"[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/modules/esnext.aggregate-error.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// TODO: Remove from `core-js@4`
__turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/modules/es.aggregate-error.js [app-client] (ecmascript)");
}),
"[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/proxy-accessor.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var defineProperty = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/object-define-property.js [app-client] (ecmascript)").f;
module.exports = function(Target, Source, key) {
    key in Target || defineProperty(Target, key, {
        configurable: true,
        get: function() {
            return Source[key];
        },
        set: function(it) {
            Source[key] = it;
        }
    });
};
}),
"[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/inherit-if-required.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var isCallable = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/is-callable.js [app-client] (ecmascript)");
var isObject = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/is-object.js [app-client] (ecmascript)");
var setPrototypeOf = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/object-set-prototype-of.js [app-client] (ecmascript)");
// makes subclassing work correct for wrapped built-ins
module.exports = function($this, dummy, Wrapper) {
    var NewTarget, NewTargetPrototype;
    if (// it can work only with native `setPrototypeOf`
    setPrototypeOf && // we haven't completely correct pre-ES6 way for getting `new.target`, so use this
    isCallable(NewTarget = dummy.constructor) && NewTarget !== Wrapper && isObject(NewTargetPrototype = NewTarget.prototype) && NewTargetPrototype !== Wrapper.prototype) setPrototypeOf($this, NewTargetPrototype);
    return $this;
};
}),
"[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/wrap-error-constructor-with-cause.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var getBuiltIn = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/get-built-in.js [app-client] (ecmascript)");
var hasOwn = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/has-own-property.js [app-client] (ecmascript)");
var createNonEnumerableProperty = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/create-non-enumerable-property.js [app-client] (ecmascript)");
var isPrototypeOf = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/object-is-prototype-of.js [app-client] (ecmascript)");
var setPrototypeOf = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/object-set-prototype-of.js [app-client] (ecmascript)");
var copyConstructorProperties = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/copy-constructor-properties.js [app-client] (ecmascript)");
var proxyAccessor = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/proxy-accessor.js [app-client] (ecmascript)");
var inheritIfRequired = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/inherit-if-required.js [app-client] (ecmascript)");
var normalizeStringArgument = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/normalize-string-argument.js [app-client] (ecmascript)");
var installErrorCause = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/install-error-cause.js [app-client] (ecmascript)");
var installErrorStack = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/error-stack-install.js [app-client] (ecmascript)");
var DESCRIPTORS = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/descriptors.js [app-client] (ecmascript)");
var IS_PURE = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/is-pure.js [app-client] (ecmascript)");
module.exports = function(FULL_NAME, wrapper, FORCED, IS_AGGREGATE_ERROR) {
    var STACK_TRACE_LIMIT = 'stackTraceLimit';
    var OPTIONS_POSITION = IS_AGGREGATE_ERROR ? 2 : 1;
    var path = FULL_NAME.split('.');
    var ERROR_NAME = path[path.length - 1];
    var OriginalError = getBuiltIn.apply(null, path);
    if (!OriginalError) return;
    var OriginalErrorPrototype = OriginalError.prototype;
    // V8 9.3- bug https://bugs.chromium.org/p/v8/issues/detail?id=12006
    if (!IS_PURE && hasOwn(OriginalErrorPrototype, 'cause')) delete OriginalErrorPrototype.cause;
    if (!FORCED) return OriginalError;
    var BaseError = getBuiltIn('Error');
    var WrappedError = wrapper(function(a, b) {
        var message = normalizeStringArgument(IS_AGGREGATE_ERROR ? b : a, undefined);
        var result = IS_AGGREGATE_ERROR ? new OriginalError(a) : new OriginalError();
        if (message !== undefined) createNonEnumerableProperty(result, 'message', message);
        installErrorStack(result, WrappedError, result.stack, 2);
        if (this && isPrototypeOf(OriginalErrorPrototype, this)) inheritIfRequired(result, this, WrappedError);
        if (arguments.length > OPTIONS_POSITION) installErrorCause(result, arguments[OPTIONS_POSITION]);
        return result;
    });
    WrappedError.prototype = OriginalErrorPrototype;
    if (ERROR_NAME !== 'Error') {
        if (setPrototypeOf) setPrototypeOf(WrappedError, BaseError);
        else copyConstructorProperties(WrappedError, BaseError, {
            name: true
        });
    } else if (DESCRIPTORS && STACK_TRACE_LIMIT in OriginalError) {
        proxyAccessor(WrappedError, OriginalError, STACK_TRACE_LIMIT);
        proxyAccessor(WrappedError, OriginalError, 'prepareStackTrace');
    }
    copyConstructorProperties(WrappedError, OriginalError);
    if (!IS_PURE) try {
        // Safari 13- bug: WebAssembly errors does not have a proper `.name`
        if (OriginalErrorPrototype.name !== ERROR_NAME) {
            createNonEnumerableProperty(OriginalErrorPrototype, 'name', ERROR_NAME);
        }
        OriginalErrorPrototype.constructor = WrappedError;
    } catch (error) {}
    return WrappedError;
};
}),
"[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/modules/es.error.cause.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/* eslint-disable no-unused-vars -- required for functions `.length` */ var $ = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/export.js [app-client] (ecmascript)");
var globalThis = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/global-this.js [app-client] (ecmascript)");
var apply = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/function-apply.js [app-client] (ecmascript)");
var wrapErrorConstructorWithCause = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/wrap-error-constructor-with-cause.js [app-client] (ecmascript)");
var WEB_ASSEMBLY = 'WebAssembly';
var WebAssembly = globalThis[WEB_ASSEMBLY];
// eslint-disable-next-line es/no-error-cause -- feature detection
var FORCED = new Error('e', {
    cause: 7
}).cause !== 7;
var exportGlobalErrorCauseWrapper = function(ERROR_NAME, wrapper) {
    var O = {};
    // eslint-disable-next-line unicorn/no-immediate-mutation -- ES3 syntax limitation
    O[ERROR_NAME] = wrapErrorConstructorWithCause(ERROR_NAME, wrapper, FORCED);
    $({
        global: true,
        constructor: true,
        arity: 1,
        forced: FORCED
    }, O);
};
var exportWebAssemblyErrorCauseWrapper = function(ERROR_NAME, wrapper) {
    if (WebAssembly && WebAssembly[ERROR_NAME]) {
        var O = {};
        // eslint-disable-next-line unicorn/no-immediate-mutation -- ES3 syntax limitation
        O[ERROR_NAME] = wrapErrorConstructorWithCause(WEB_ASSEMBLY + '.' + ERROR_NAME, wrapper, FORCED);
        $({
            target: WEB_ASSEMBLY,
            stat: true,
            constructor: true,
            arity: 1,
            forced: FORCED
        }, O);
    }
};
// https://tc39.es/ecma262/#sec-nativeerror
exportGlobalErrorCauseWrapper('Error', function(init) {
    return function Error1(message) {
        return apply(init, this, arguments);
    };
});
exportGlobalErrorCauseWrapper('EvalError', function(init) {
    return function EvalError(message) {
        return apply(init, this, arguments);
    };
});
exportGlobalErrorCauseWrapper('RangeError', function(init) {
    return function RangeError(message) {
        return apply(init, this, arguments);
    };
});
exportGlobalErrorCauseWrapper('ReferenceError', function(init) {
    return function ReferenceError(message) {
        return apply(init, this, arguments);
    };
});
exportGlobalErrorCauseWrapper('SyntaxError', function(init) {
    return function SyntaxError(message) {
        return apply(init, this, arguments);
    };
});
exportGlobalErrorCauseWrapper('TypeError', function(init) {
    return function TypeError(message) {
        return apply(init, this, arguments);
    };
});
exportGlobalErrorCauseWrapper('URIError', function(init) {
    return function URIError(message) {
        return apply(init, this, arguments);
    };
});
exportWebAssemblyErrorCauseWrapper('CompileError', function(init) {
    return function CompileError(message) {
        return apply(init, this, arguments);
    };
});
exportWebAssemblyErrorCauseWrapper('LinkError', function(init) {
    return function LinkError(message) {
        return apply(init, this, arguments);
    };
});
exportWebAssemblyErrorCauseWrapper('RuntimeError', function(init) {
    return function RuntimeError(message) {
        return apply(init, this, arguments);
    };
});
}),
"[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/modules/es.aggregate-error.cause.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var $ = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/export.js [app-client] (ecmascript)");
var getBuiltIn = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/get-built-in.js [app-client] (ecmascript)");
var apply = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/function-apply.js [app-client] (ecmascript)");
var fails = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/fails.js [app-client] (ecmascript)");
var wrapErrorConstructorWithCause = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/wrap-error-constructor-with-cause.js [app-client] (ecmascript)");
var AGGREGATE_ERROR = 'AggregateError';
var $AggregateError = getBuiltIn(AGGREGATE_ERROR);
var FORCED = !fails(function() {
    return $AggregateError([
        1
    ]).errors[0] !== 1;
}) && fails(function() {
    return $AggregateError([
        1
    ], AGGREGATE_ERROR, {
        cause: 7
    }).cause !== 7;
});
// https://tc39.es/ecma262/#sec-aggregate-error
$({
    global: true,
    constructor: true,
    arity: 2,
    forced: FORCED
}, {
    AggregateError: wrapErrorConstructorWithCause(AGGREGATE_ERROR, function(init) {
        // eslint-disable-next-line no-unused-vars -- required for functions `.length`
        return function AggregateError(errors, message) {
            return apply(init, this, arguments);
        };
    }, FORCED, true)
});
}),
"[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/add-to-unscopables.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

module.exports = function() {};
}),
"[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/weak-map-basic-detection.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var globalThis = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/global-this.js [app-client] (ecmascript)");
var isCallable = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/is-callable.js [app-client] (ecmascript)");
var WeakMap = globalThis.WeakMap;
module.exports = isCallable(WeakMap) && /native code/.test(String(WeakMap));
}),
"[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/internal-state.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var NATIVE_WEAK_MAP = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/weak-map-basic-detection.js [app-client] (ecmascript)");
var globalThis = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/global-this.js [app-client] (ecmascript)");
var isObject = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/is-object.js [app-client] (ecmascript)");
var createNonEnumerableProperty = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/create-non-enumerable-property.js [app-client] (ecmascript)");
var hasOwn = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/has-own-property.js [app-client] (ecmascript)");
var shared = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/shared-store.js [app-client] (ecmascript)");
var sharedKey = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/shared-key.js [app-client] (ecmascript)");
var hiddenKeys = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/hidden-keys.js [app-client] (ecmascript)");
var OBJECT_ALREADY_INITIALIZED = 'Object already initialized';
var TypeError = globalThis.TypeError;
var WeakMap = globalThis.WeakMap;
var set, get, has;
var enforce = function(it) {
    return has(it) ? get(it) : set(it, {});
};
var getterFor = function(TYPE) {
    return function(it) {
        var state;
        if (!isObject(it) || (state = get(it)).type !== TYPE) {
            throw new TypeError('Incompatible receiver, ' + TYPE + ' required');
        }
        return state;
    };
};
if (NATIVE_WEAK_MAP || shared.state) {
    var store = shared.state || (shared.state = new WeakMap());
    /* eslint-disable no-self-assign -- prototype methods protection */ store.get = store.get;
    store.has = store.has;
    store.set = store.set;
    /* eslint-enable no-self-assign -- prototype methods protection */ set = function(it, metadata) {
        if (store.has(it)) throw new TypeError(OBJECT_ALREADY_INITIALIZED);
        metadata.facade = it;
        store.set(it, metadata);
        return metadata;
    };
    get = function(it) {
        return store.get(it) || {};
    };
    has = function(it) {
        return store.has(it);
    };
} else {
    var STATE = sharedKey('state');
    hiddenKeys[STATE] = true;
    set = function(it, metadata) {
        if (hasOwn(it, STATE)) throw new TypeError(OBJECT_ALREADY_INITIALIZED);
        metadata.facade = it;
        createNonEnumerableProperty(it, STATE, metadata);
        return metadata;
    };
    get = function(it) {
        return hasOwn(it, STATE) ? it[STATE] : {};
    };
    has = function(it) {
        return hasOwn(it, STATE);
    };
}
module.exports = {
    set: set,
    get: get,
    has: has,
    enforce: enforce,
    getterFor: getterFor
};
}),
"[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/function-name.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var DESCRIPTORS = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/descriptors.js [app-client] (ecmascript)");
var hasOwn = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/has-own-property.js [app-client] (ecmascript)");
var FunctionPrototype = Function.prototype;
// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var getDescriptor = DESCRIPTORS && Object.getOwnPropertyDescriptor;
var EXISTS = hasOwn(FunctionPrototype, 'name');
// additional protection from minified / mangled / dropped function names
var PROPER = EXISTS && (function something() {}).name === 'something';
var CONFIGURABLE = EXISTS && (!DESCRIPTORS || DESCRIPTORS && getDescriptor(FunctionPrototype, 'name').configurable);
module.exports = {
    EXISTS: EXISTS,
    PROPER: PROPER,
    CONFIGURABLE: CONFIGURABLE
};
}),
"[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/define-built-in.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var createNonEnumerableProperty = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/create-non-enumerable-property.js [app-client] (ecmascript)");
module.exports = function(target, key, value, options) {
    if (options && options.enumerable) target[key] = value;
    else createNonEnumerableProperty(target, key, value);
    return target;
};
}),
"[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/iterators-core.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var fails = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/fails.js [app-client] (ecmascript)");
var isCallable = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/is-callable.js [app-client] (ecmascript)");
var isObject = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/is-object.js [app-client] (ecmascript)");
var create = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/object-create.js [app-client] (ecmascript)");
var getPrototypeOf = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/object-get-prototype-of.js [app-client] (ecmascript)");
var defineBuiltIn = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/define-built-in.js [app-client] (ecmascript)");
var wellKnownSymbol = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/well-known-symbol.js [app-client] (ecmascript)");
var IS_PURE = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/is-pure.js [app-client] (ecmascript)");
var ITERATOR = wellKnownSymbol('iterator');
var BUGGY_SAFARI_ITERATORS = false;
// `%IteratorPrototype%` object
// https://tc39.es/ecma262/#sec-%iteratorprototype%-object
var IteratorPrototype, PrototypeOfArrayIteratorPrototype, arrayIterator;
/* eslint-disable es/no-array-prototype-keys -- safe */ if ([].keys) {
    arrayIterator = [].keys();
    // Safari 8 has buggy iterators w/o `next`
    if (!('next' in arrayIterator)) BUGGY_SAFARI_ITERATORS = true;
    else {
        PrototypeOfArrayIteratorPrototype = getPrototypeOf(getPrototypeOf(arrayIterator));
        if (PrototypeOfArrayIteratorPrototype !== Object.prototype) IteratorPrototype = PrototypeOfArrayIteratorPrototype;
    }
}
var NEW_ITERATOR_PROTOTYPE = !isObject(IteratorPrototype) || fails(function() {
    var test = {};
    // FF44- legacy iterators case
    return IteratorPrototype[ITERATOR].call(test) !== test;
});
if (NEW_ITERATOR_PROTOTYPE) IteratorPrototype = {};
else if (IS_PURE) IteratorPrototype = create(IteratorPrototype);
// `%IteratorPrototype%[@@iterator]()` method
// https://tc39.es/ecma262/#sec-%iteratorprototype%-@@iterator
if (!isCallable(IteratorPrototype[ITERATOR])) {
    defineBuiltIn(IteratorPrototype, ITERATOR, function() {
        return this;
    });
}
module.exports = {
    IteratorPrototype: IteratorPrototype,
    BUGGY_SAFARI_ITERATORS: BUGGY_SAFARI_ITERATORS
};
}),
"[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/object-to-string.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var TO_STRING_TAG_SUPPORT = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/to-string-tag-support.js [app-client] (ecmascript)");
var classof = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/classof.js [app-client] (ecmascript)");
// `Object.prototype.toString` method implementation
// https://tc39.es/ecma262/#sec-object.prototype.tostring
module.exports = TO_STRING_TAG_SUPPORT ? ({}).toString : function toString() {
    return '[object ' + classof(this) + ']';
};
}),
"[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/set-to-string-tag.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var TO_STRING_TAG_SUPPORT = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/to-string-tag-support.js [app-client] (ecmascript)");
var defineProperty = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/object-define-property.js [app-client] (ecmascript)").f;
var createNonEnumerableProperty = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/create-non-enumerable-property.js [app-client] (ecmascript)");
var hasOwn = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/has-own-property.js [app-client] (ecmascript)");
var toString = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/object-to-string.js [app-client] (ecmascript)");
var wellKnownSymbol = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/well-known-symbol.js [app-client] (ecmascript)");
var TO_STRING_TAG = wellKnownSymbol('toStringTag');
module.exports = function(it, TAG, STATIC, SET_METHOD) {
    var target = STATIC ? it : it && it.prototype;
    if (target) {
        if (!hasOwn(target, TO_STRING_TAG)) {
            defineProperty(target, TO_STRING_TAG, {
                configurable: true,
                value: TAG
            });
        }
        if (SET_METHOD && !TO_STRING_TAG_SUPPORT) {
            createNonEnumerableProperty(target, 'toString', toString);
        }
    }
};
}),
"[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/iterator-create-constructor.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var IteratorPrototype = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/iterators-core.js [app-client] (ecmascript)").IteratorPrototype;
var create = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/object-create.js [app-client] (ecmascript)");
var createPropertyDescriptor = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/create-property-descriptor.js [app-client] (ecmascript)");
var setToStringTag = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/set-to-string-tag.js [app-client] (ecmascript)");
var Iterators = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/iterators.js [app-client] (ecmascript)");
var returnThis = function() {
    return this;
};
module.exports = function(IteratorConstructor, NAME, next, ENUMERABLE_NEXT) {
    var TO_STRING_TAG = NAME + ' Iterator';
    IteratorConstructor.prototype = create(IteratorPrototype, {
        next: createPropertyDescriptor(+!ENUMERABLE_NEXT, next)
    });
    setToStringTag(IteratorConstructor, TO_STRING_TAG, false, true);
    Iterators[TO_STRING_TAG] = returnThis;
    return IteratorConstructor;
};
}),
"[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/iterator-define.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var $ = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/export.js [app-client] (ecmascript)");
var call = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/function-call.js [app-client] (ecmascript)");
var IS_PURE = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/is-pure.js [app-client] (ecmascript)");
var FunctionName = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/function-name.js [app-client] (ecmascript)");
var isCallable = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/is-callable.js [app-client] (ecmascript)");
var createIteratorConstructor = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/iterator-create-constructor.js [app-client] (ecmascript)");
var getPrototypeOf = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/object-get-prototype-of.js [app-client] (ecmascript)");
var setPrototypeOf = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/object-set-prototype-of.js [app-client] (ecmascript)");
var setToStringTag = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/set-to-string-tag.js [app-client] (ecmascript)");
var createNonEnumerableProperty = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/create-non-enumerable-property.js [app-client] (ecmascript)");
var defineBuiltIn = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/define-built-in.js [app-client] (ecmascript)");
var wellKnownSymbol = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/well-known-symbol.js [app-client] (ecmascript)");
var Iterators = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/iterators.js [app-client] (ecmascript)");
var IteratorsCore = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/iterators-core.js [app-client] (ecmascript)");
var PROPER_FUNCTION_NAME = FunctionName.PROPER;
var CONFIGURABLE_FUNCTION_NAME = FunctionName.CONFIGURABLE;
var IteratorPrototype = IteratorsCore.IteratorPrototype;
var BUGGY_SAFARI_ITERATORS = IteratorsCore.BUGGY_SAFARI_ITERATORS;
var ITERATOR = wellKnownSymbol('iterator');
var KEYS = 'keys';
var VALUES = 'values';
var ENTRIES = 'entries';
var returnThis = function() {
    return this;
};
module.exports = function(Iterable, NAME, IteratorConstructor, next, DEFAULT, IS_SET, FORCED) {
    createIteratorConstructor(IteratorConstructor, NAME, next);
    var getIterationMethod = function(KIND) {
        if (KIND === DEFAULT && defaultIterator) return defaultIterator;
        if (!BUGGY_SAFARI_ITERATORS && KIND && KIND in IterablePrototype) return IterablePrototype[KIND];
        switch(KIND){
            case KEYS:
                return function keys() {
                    return new IteratorConstructor(this, KIND);
                };
            case VALUES:
                return function values() {
                    return new IteratorConstructor(this, KIND);
                };
            case ENTRIES:
                return function entries() {
                    return new IteratorConstructor(this, KIND);
                };
        }
        return function() {
            return new IteratorConstructor(this);
        };
    };
    var TO_STRING_TAG = NAME + ' Iterator';
    var INCORRECT_VALUES_NAME = false;
    var IterablePrototype = Iterable.prototype;
    var nativeIterator = IterablePrototype[ITERATOR] || IterablePrototype['@@iterator'] || DEFAULT && IterablePrototype[DEFAULT];
    var defaultIterator = !BUGGY_SAFARI_ITERATORS && nativeIterator || getIterationMethod(DEFAULT);
    var anyNativeIterator = NAME === 'Array' ? IterablePrototype.entries || nativeIterator : nativeIterator;
    var CurrentIteratorPrototype, methods, KEY;
    // fix native
    if (anyNativeIterator) {
        CurrentIteratorPrototype = getPrototypeOf(anyNativeIterator.call(new Iterable()));
        if (CurrentIteratorPrototype !== Object.prototype && CurrentIteratorPrototype.next) {
            if (!IS_PURE && getPrototypeOf(CurrentIteratorPrototype) !== IteratorPrototype) {
                if (setPrototypeOf) {
                    setPrototypeOf(CurrentIteratorPrototype, IteratorPrototype);
                } else if (!isCallable(CurrentIteratorPrototype[ITERATOR])) {
                    defineBuiltIn(CurrentIteratorPrototype, ITERATOR, returnThis);
                }
            }
            // Set @@toStringTag to native iterators
            setToStringTag(CurrentIteratorPrototype, TO_STRING_TAG, true, true);
            if (IS_PURE) Iterators[TO_STRING_TAG] = returnThis;
        }
    }
    // fix Array.prototype.{ values, @@iterator }.name in V8 / FF
    if (PROPER_FUNCTION_NAME && DEFAULT === VALUES && nativeIterator && nativeIterator.name !== VALUES) {
        if (!IS_PURE && CONFIGURABLE_FUNCTION_NAME) {
            createNonEnumerableProperty(IterablePrototype, 'name', VALUES);
        } else {
            INCORRECT_VALUES_NAME = true;
            defaultIterator = function values() {
                return call(nativeIterator, this);
            };
        }
    }
    // export additional methods
    if (DEFAULT) {
        methods = {
            values: getIterationMethod(VALUES),
            keys: IS_SET ? defaultIterator : getIterationMethod(KEYS),
            entries: getIterationMethod(ENTRIES)
        };
        if (FORCED) for(KEY in methods){
            if (BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME || !(KEY in IterablePrototype)) {
                defineBuiltIn(IterablePrototype, KEY, methods[KEY]);
            }
        }
        else $({
            target: NAME,
            proto: true,
            forced: BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME
        }, methods);
    }
    // define iterator
    if ((!IS_PURE || FORCED) && IterablePrototype[ITERATOR] !== defaultIterator) {
        defineBuiltIn(IterablePrototype, ITERATOR, defaultIterator, {
            name: DEFAULT
        });
    }
    Iterators[NAME] = defaultIterator;
    return methods;
};
}),
"[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/create-iter-result-object.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// `CreateIterResultObject` abstract operation
// https://tc39.es/ecma262/#sec-createiterresultobject
module.exports = function(value, done) {
    return {
        value: value,
        done: done
    };
};
}),
"[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/modules/es.array.iterator.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var toIndexedObject = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/to-indexed-object.js [app-client] (ecmascript)");
var addToUnscopables = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/add-to-unscopables.js [app-client] (ecmascript)");
var Iterators = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/iterators.js [app-client] (ecmascript)");
var InternalStateModule = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/internal-state.js [app-client] (ecmascript)");
var defineProperty = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/object-define-property.js [app-client] (ecmascript)").f;
var defineIterator = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/iterator-define.js [app-client] (ecmascript)");
var createIterResultObject = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/create-iter-result-object.js [app-client] (ecmascript)");
var IS_PURE = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/is-pure.js [app-client] (ecmascript)");
var DESCRIPTORS = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/descriptors.js [app-client] (ecmascript)");
var ARRAY_ITERATOR = 'Array Iterator';
var setInternalState = InternalStateModule.set;
var getInternalState = InternalStateModule.getterFor(ARRAY_ITERATOR);
// `Array.prototype.entries` method
// https://tc39.es/ecma262/#sec-array.prototype.entries
// `Array.prototype.keys` method
// https://tc39.es/ecma262/#sec-array.prototype.keys
// `Array.prototype.values` method
// https://tc39.es/ecma262/#sec-array.prototype.values
// `Array.prototype[@@iterator]` method
// https://tc39.es/ecma262/#sec-array.prototype-@@iterator
// `CreateArrayIterator` internal method
// https://tc39.es/ecma262/#sec-createarrayiterator
module.exports = defineIterator(Array, 'Array', function(iterated, kind) {
    setInternalState(this, {
        type: ARRAY_ITERATOR,
        target: toIndexedObject(iterated),
        index: 0,
        kind: kind // kind
    });
// `%ArrayIteratorPrototype%.next` method
// https://tc39.es/ecma262/#sec-%arrayiteratorprototype%.next
}, function() {
    var state = getInternalState(this);
    var target = state.target;
    var index = state.index++;
    if (!target || index >= target.length) {
        state.target = null;
        return createIterResultObject(undefined, true);
    }
    switch(state.kind){
        case 'keys':
            return createIterResultObject(index, false);
        case 'values':
            return createIterResultObject(target[index], false);
    }
    return createIterResultObject([
        index,
        target[index]
    ], false);
}, 'values');
// argumentsList[@@iterator] is %ArrayProto_values%
// https://tc39.es/ecma262/#sec-createunmappedargumentsobject
// https://tc39.es/ecma262/#sec-createmappedargumentsobject
var values = Iterators.Arguments = Iterators.Array;
// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');
// V8 ~ Chrome 45- bug
if (!IS_PURE && DESCRIPTORS && values.name !== 'values') try {
    defineProperty(values, 'name', {
        value: 'values'
    });
} catch (error) {}
}),
"[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/string-multibyte.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var uncurryThis = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/function-uncurry-this.js [app-client] (ecmascript)");
var toIntegerOrInfinity = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/to-integer-or-infinity.js [app-client] (ecmascript)");
var toString = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/to-string.js [app-client] (ecmascript)");
var requireObjectCoercible = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/require-object-coercible.js [app-client] (ecmascript)");
var charAt = uncurryThis(''.charAt);
var charCodeAt = uncurryThis(''.charCodeAt);
var stringSlice = uncurryThis(''.slice);
var createMethod = function(CONVERT_TO_STRING) {
    return function($this, pos) {
        var S = toString(requireObjectCoercible($this));
        var position = toIntegerOrInfinity(pos);
        var size = S.length;
        var first, second;
        if (position < 0 || position >= size) return CONVERT_TO_STRING ? '' : undefined;
        first = charCodeAt(S, position);
        return first < 0xD800 || first > 0xDBFF || position + 1 === size || (second = charCodeAt(S, position + 1)) < 0xDC00 || second > 0xDFFF ? CONVERT_TO_STRING ? charAt(S, position) : first : CONVERT_TO_STRING ? stringSlice(S, position, position + 2) : (first - 0xD800 << 10) + (second - 0xDC00) + 0x10000;
    };
};
module.exports = {
    // `String.prototype.codePointAt` method
    // https://tc39.es/ecma262/#sec-string.prototype.codepointat
    codeAt: createMethod(false),
    // `String.prototype.at` method
    // https://github.com/mathiasbynens/String.prototype.at
    charAt: createMethod(true)
};
}),
"[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/modules/es.string.iterator.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var charAt = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/string-multibyte.js [app-client] (ecmascript)").charAt;
var toString = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/to-string.js [app-client] (ecmascript)");
var InternalStateModule = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/internal-state.js [app-client] (ecmascript)");
var defineIterator = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/iterator-define.js [app-client] (ecmascript)");
var createIterResultObject = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/create-iter-result-object.js [app-client] (ecmascript)");
var STRING_ITERATOR = 'String Iterator';
var setInternalState = InternalStateModule.set;
var getInternalState = InternalStateModule.getterFor(STRING_ITERATOR);
// `String.prototype[@@iterator]` method
// https://tc39.es/ecma262/#sec-string.prototype-@@iterator
defineIterator(String, 'String', function(iterated) {
    setInternalState(this, {
        type: STRING_ITERATOR,
        string: toString(iterated),
        index: 0
    });
// `%StringIteratorPrototype%.next` method
// https://tc39.es/ecma262/#sec-%stringiteratorprototype%.next
}, function next() {
    var state = getInternalState(this);
    var string = state.string;
    var index = state.index;
    var point;
    if (index >= string.length) return createIterResultObject(undefined, true);
    point = charAt(string, index);
    state.index += point.length;
    return createIterResultObject(point, false);
});
}),
"[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/es/aggregate-error.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

__turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/modules/es.error.cause.js [app-client] (ecmascript)");
__turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/modules/es.aggregate-error.js [app-client] (ecmascript)");
__turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/modules/es.aggregate-error.cause.js [app-client] (ecmascript)");
__turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/modules/es.array.iterator.js [app-client] (ecmascript)");
__turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/modules/es.string.iterator.js [app-client] (ecmascript)");
var path = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/path.js [app-client] (ecmascript)");
module.exports = path.AggregateError;
}),
"[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/dom-iterables.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// iterable DOM collections
// flag - `iterable` interface - 'entries', 'keys', 'values', 'forEach' methods
module.exports = {
    CSSRuleList: 0,
    CSSStyleDeclaration: 0,
    CSSValueList: 0,
    ClientRectList: 0,
    DOMRectList: 0,
    DOMStringList: 0,
    DOMTokenList: 1,
    DataTransferItemList: 0,
    FileList: 0,
    HTMLAllCollection: 0,
    HTMLCollection: 0,
    HTMLFormElement: 0,
    HTMLSelectElement: 0,
    MediaList: 0,
    MimeTypeArray: 0,
    NamedNodeMap: 0,
    NodeList: 1,
    PaintRequestList: 0,
    Plugin: 0,
    PluginArray: 0,
    SVGLengthList: 0,
    SVGNumberList: 0,
    SVGPathSegList: 0,
    SVGPointList: 0,
    SVGStringList: 0,
    SVGTransformList: 0,
    SourceBufferList: 0,
    StyleSheetList: 0,
    TextTrackCueList: 0,
    TextTrackList: 0,
    TouchList: 0
};
}),
"[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/modules/web.dom-collections.iterator.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

__turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/modules/es.array.iterator.js [app-client] (ecmascript)");
var DOMIterables = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/dom-iterables.js [app-client] (ecmascript)");
var globalThis = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/global-this.js [app-client] (ecmascript)");
var setToStringTag = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/set-to-string-tag.js [app-client] (ecmascript)");
var Iterators = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/internals/iterators.js [app-client] (ecmascript)");
for(var COLLECTION_NAME in DOMIterables){
    setToStringTag(globalThis[COLLECTION_NAME], COLLECTION_NAME);
    Iterators[COLLECTION_NAME] = Iterators.Array;
}
}),
"[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/stable/aggregate-error.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// TODO: remove from `core-js@4`
__turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/modules/esnext.aggregate-error.js [app-client] (ecmascript)");
var parent = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/es/aggregate-error.js [app-client] (ecmascript)");
__turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/modules/web.dom-collections.iterator.js [app-client] (ecmascript)");
module.exports = parent;
}),
"[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/actual/aggregate-error.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var parent = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/stable/aggregate-error.js [app-client] (ecmascript)");
module.exports = parent;
}),
"[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/full/aggregate-error.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// TODO: remove from `core-js@4`
__turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/modules/esnext.aggregate-error.js [app-client] (ecmascript)");
var parent = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/actual/aggregate-error.js [app-client] (ecmascript)");
module.exports = parent;
}),
"[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/features/aggregate-error.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

module.exports = __turbopack_context__.r("[project]/node_modules/.pnpm/core-js-pure@3.47.0/node_modules/core-js-pure/full/aggregate-error.js [app-client] (ecmascript)");
}),
]);

//# sourceMappingURL=a76ea_core-js-pure_7e3319bc._.js.map