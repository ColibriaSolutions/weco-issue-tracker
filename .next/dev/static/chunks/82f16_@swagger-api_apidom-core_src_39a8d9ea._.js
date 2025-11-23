(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/node_modules/.pnpm/@swagger-api+apidom-core@1.0.0-rc.3/node_modules/@swagger-api/apidom-core/src/elements/Annotation.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$minim$40$0$2e$23$2e$8$2f$node_modules$2f$minim$2f$lib$2f$minim$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/minim@0.23.8/node_modules/minim/lib/minim.js [app-client] (ecmascript)");
;
/**
 * @public
 */ class Annotation extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$minim$40$0$2e$23$2e$8$2f$node_modules$2f$minim$2f$lib$2f$minim$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StringElement"] {
    // classes: warning | error
    constructor(content, meta, attributes){
        super(content, meta, attributes);
        this.element = 'annotation';
    }
    get code() {
        return this.attributes.get('code');
    }
    set code(value) {
        this.attributes.set('code', value);
    }
}
const __TURBOPACK__default__export__ = Annotation;
}),
"[project]/node_modules/.pnpm/@swagger-api+apidom-core@1.0.0-rc.3/node_modules/@swagger-api/apidom-core/src/elements/Comment.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$minim$40$0$2e$23$2e$8$2f$node_modules$2f$minim$2f$lib$2f$minim$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/minim@0.23.8/node_modules/minim/lib/minim.js [app-client] (ecmascript)");
;
/**
 * @public
 */ class Comment extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$minim$40$0$2e$23$2e$8$2f$node_modules$2f$minim$2f$lib$2f$minim$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StringElement"] {
    constructor(content, meta, attributes){
        super(content, meta, attributes);
        this.element = 'comment';
    }
}
const __TURBOPACK__default__export__ = Comment;
}),
"[project]/node_modules/.pnpm/@swagger-api+apidom-core@1.0.0-rc.3/node_modules/@swagger-api/apidom-core/src/elements/ParseResult.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$minim$40$0$2e$23$2e$8$2f$node_modules$2f$minim$2f$lib$2f$minim$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/minim@0.23.8/node_modules/minim/lib/minim.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$ramda$2d$adjunct$40$5$2e$1$2e$0_ramda$40$0$2e$30$2e$1$2f$node_modules$2f$ramda$2d$adjunct$2f$es$2f$isUndefined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__isUndefined$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/ramda-adjunct@5.1.0_ramda@0.30.1/node_modules/ramda-adjunct/es/isUndefined.js [app-client] (ecmascript) <export default as isUndefined>");
;
;
/**
 * @public
 */ class ParseResult extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$minim$40$0$2e$23$2e$8$2f$node_modules$2f$minim$2f$lib$2f$minim$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ArrayElement"] {
    constructor(content, meta, attributes){
        super(content, meta, attributes);
        this.element = 'parseResult';
    }
    get api() {
        return this.children.filter((item)=>item.classes.contains('api')).first;
    }
    get results() {
        return this.children.filter((item)=>item.classes.contains('result'));
    }
    get result() {
        return this.results.first;
    }
    get annotations() {
        return this.children.filter((item)=>item.element === 'annotation');
    }
    get warnings() {
        return this.children.filter((item)=>item.element === 'annotation' && item.classes.contains('warning'));
    }
    get errors() {
        return this.children.filter((item)=>item.element === 'annotation' && item.classes.contains('error'));
    }
    get isEmpty() {
        return this.children.reject((item)=>item.element === 'annotation').isEmpty;
    }
    replaceResult(replacement) {
        const { result } = this;
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$ramda$2d$adjunct$40$5$2e$1$2e$0_ramda$40$0$2e$30$2e$1$2f$node_modules$2f$ramda$2d$adjunct$2f$es$2f$isUndefined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__isUndefined$3e$__["isUndefined"])(result)) {
            return false;
        }
        // @ts-ignore
        const searchIndex = this.content.findIndex((e)=>e === result);
        if (searchIndex === -1) {
            return false;
        }
        this.content[searchIndex] = replacement;
        return true;
    }
}
const __TURBOPACK__default__export__ = ParseResult;
}),
"[project]/node_modules/.pnpm/@swagger-api+apidom-core@1.0.0-rc.3/node_modules/@swagger-api/apidom-core/src/predicates/helpers.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__,
    "hasBasicElementProps",
    ()=>hasBasicElementProps,
    "hasClass",
    ()=>hasClass,
    "hasMethod",
    ()=>hasMethod,
    "isElementType",
    ()=>isElementType,
    "primitiveEq",
    ()=>primitiveEq
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$minim$40$0$2e$23$2e$8$2f$node_modules$2f$minim$2f$lib$2f$minim$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/minim@0.23.8/node_modules/minim/lib/minim.js [app-client] (ecmascript)");
;
const hasMethod = (name, element)=>{
    return typeof element === 'object' && element !== null && name in element && typeof element[name] === 'function';
};
const hasBasicElementProps = (element)=>typeof element === 'object' && element != null && '_storedElement' in element && typeof element._storedElement === 'string' && // eslint-disable-line no-underscore-dangle
    '_content' in element;
const primitiveEq = (val, element)=>{
    if (typeof element === 'object' && element !== null && 'primitive' in element) {
        return typeof element.primitive === 'function' && element.primitive() === val;
    }
    return false;
};
const hasClass = (cls, element)=>{
    return typeof element === 'object' && element !== null && 'classes' in element && (Array.isArray(element.classes) || element.classes instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$minim$40$0$2e$23$2e$8$2f$node_modules$2f$minim$2f$lib$2f$minim$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ArrayElement"]) && element.classes.includes(cls);
};
const isElementType = (name, element)=>typeof element === 'object' && element !== null && 'element' in element && element.element === name;
/**
 * @public
 */ const createPredicate = (predicateCreator)=>{
    return predicateCreator({
        hasMethod,
        hasBasicElementProps,
        primitiveEq,
        isElementType,
        hasClass
    });
};
const __TURBOPACK__default__export__ = createPredicate;
}),
"[project]/node_modules/.pnpm/@swagger-api+apidom-core@1.0.0-rc.3/node_modules/@swagger-api/apidom-core/src/predicates/index.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "hasElementSourceMap",
    ()=>hasElementSourceMap,
    "includesClasses",
    ()=>includesClasses,
    "includesSymbols",
    ()=>includesSymbols,
    "isAnnotationElement",
    ()=>isAnnotationElement,
    "isArrayElement",
    ()=>isArrayElement,
    "isBooleanElement",
    ()=>isBooleanElement,
    "isCommentElement",
    ()=>isCommentElement,
    "isElement",
    ()=>isElement,
    "isLinkElement",
    ()=>isLinkElement,
    "isMemberElement",
    ()=>isMemberElement,
    "isNullElement",
    ()=>isNullElement,
    "isNumberElement",
    ()=>isNumberElement,
    "isObjectElement",
    ()=>isObjectElement,
    "isParseResultElement",
    ()=>isParseResultElement,
    "isPrimitiveElement",
    ()=>isPrimitiveElement,
    "isRefElement",
    ()=>isRefElement,
    "isStringElement",
    ()=>isStringElement
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$minim$40$0$2e$23$2e$8$2f$node_modules$2f$minim$2f$lib$2f$minim$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/minim@0.23.8/node_modules/minim/lib/minim.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$ramda$40$0$2e$30$2e$1$2f$node_modules$2f$ramda$2f$es$2f$all$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__all$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/ramda@0.30.1/node_modules/ramda/es/all.js [app-client] (ecmascript) <export default as all>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$ramda$2d$adjunct$40$5$2e$1$2e$0_ramda$40$0$2e$30$2e$1$2f$node_modules$2f$ramda$2d$adjunct$2f$es$2f$included$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__included$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/ramda-adjunct@5.1.0_ramda@0.30.1/node_modules/ramda-adjunct/es/included.js [app-client] (ecmascript) <export default as included>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swagger$2d$api$2b$apidom$2d$core$40$1$2e$0$2e$0$2d$rc$2e$3$2f$node_modules$2f40$swagger$2d$api$2f$apidom$2d$core$2f$src$2f$elements$2f$Annotation$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@swagger-api+apidom-core@1.0.0-rc.3/node_modules/@swagger-api/apidom-core/src/elements/Annotation.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swagger$2d$api$2b$apidom$2d$core$40$1$2e$0$2e$0$2d$rc$2e$3$2f$node_modules$2f40$swagger$2d$api$2f$apidom$2d$core$2f$src$2f$elements$2f$Comment$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@swagger-api+apidom-core@1.0.0-rc.3/node_modules/@swagger-api/apidom-core/src/elements/Comment.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swagger$2d$api$2b$apidom$2d$core$40$1$2e$0$2e$0$2d$rc$2e$3$2f$node_modules$2f40$swagger$2d$api$2f$apidom$2d$core$2f$src$2f$elements$2f$ParseResult$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@swagger-api+apidom-core@1.0.0-rc.3/node_modules/@swagger-api/apidom-core/src/elements/ParseResult.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swagger$2d$api$2b$apidom$2d$core$40$1$2e$0$2e$0$2d$rc$2e$3$2f$node_modules$2f40$swagger$2d$api$2f$apidom$2d$core$2f$src$2f$predicates$2f$helpers$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@swagger-api+apidom-core@1.0.0-rc.3/node_modules/@swagger-api/apidom-core/src/predicates/helpers.mjs [app-client] (ecmascript)");
;
;
;
;
;
;
;
const isElement = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swagger$2d$api$2b$apidom$2d$core$40$1$2e$0$2e$0$2d$rc$2e$3$2f$node_modules$2f40$swagger$2d$api$2f$apidom$2d$core$2f$src$2f$predicates$2f$helpers$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(({ hasBasicElementProps, primitiveEq })=>{
    return (element)=>element instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$minim$40$0$2e$23$2e$8$2f$node_modules$2f$minim$2f$lib$2f$minim$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Element"] || hasBasicElementProps(element) && primitiveEq(undefined, element);
});
const isStringElement = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swagger$2d$api$2b$apidom$2d$core$40$1$2e$0$2e$0$2d$rc$2e$3$2f$node_modules$2f40$swagger$2d$api$2f$apidom$2d$core$2f$src$2f$predicates$2f$helpers$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(({ hasBasicElementProps, primitiveEq })=>{
    return (element)=>element instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$minim$40$0$2e$23$2e$8$2f$node_modules$2f$minim$2f$lib$2f$minim$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StringElement"] || hasBasicElementProps(element) && primitiveEq('string', element);
});
const isNumberElement = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swagger$2d$api$2b$apidom$2d$core$40$1$2e$0$2e$0$2d$rc$2e$3$2f$node_modules$2f40$swagger$2d$api$2f$apidom$2d$core$2f$src$2f$predicates$2f$helpers$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(({ hasBasicElementProps, primitiveEq })=>{
    return (element)=>element instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$minim$40$0$2e$23$2e$8$2f$node_modules$2f$minim$2f$lib$2f$minim$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NumberElement"] || hasBasicElementProps(element) && primitiveEq('number', element);
});
const isNullElement = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swagger$2d$api$2b$apidom$2d$core$40$1$2e$0$2e$0$2d$rc$2e$3$2f$node_modules$2f40$swagger$2d$api$2f$apidom$2d$core$2f$src$2f$predicates$2f$helpers$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(({ hasBasicElementProps, primitiveEq })=>{
    return (element)=>element instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$minim$40$0$2e$23$2e$8$2f$node_modules$2f$minim$2f$lib$2f$minim$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NullElement"] || hasBasicElementProps(element) && primitiveEq('null', element);
});
const isBooleanElement = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swagger$2d$api$2b$apidom$2d$core$40$1$2e$0$2e$0$2d$rc$2e$3$2f$node_modules$2f40$swagger$2d$api$2f$apidom$2d$core$2f$src$2f$predicates$2f$helpers$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(({ hasBasicElementProps, primitiveEq })=>{
    return (element)=>element instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$minim$40$0$2e$23$2e$8$2f$node_modules$2f$minim$2f$lib$2f$minim$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BooleanElement"] || hasBasicElementProps(element) && primitiveEq('boolean', element);
});
const isObjectElement = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swagger$2d$api$2b$apidom$2d$core$40$1$2e$0$2e$0$2d$rc$2e$3$2f$node_modules$2f40$swagger$2d$api$2f$apidom$2d$core$2f$src$2f$predicates$2f$helpers$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(({ hasBasicElementProps, primitiveEq, hasMethod })=>{
    return (element)=>element instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$minim$40$0$2e$23$2e$8$2f$node_modules$2f$minim$2f$lib$2f$minim$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ObjectElement"] || hasBasicElementProps(element) && primitiveEq('object', element) && hasMethod('keys', element) && hasMethod('values', element) && hasMethod('items', element);
});
const isArrayElement = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swagger$2d$api$2b$apidom$2d$core$40$1$2e$0$2e$0$2d$rc$2e$3$2f$node_modules$2f40$swagger$2d$api$2f$apidom$2d$core$2f$src$2f$predicates$2f$helpers$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(({ hasBasicElementProps, primitiveEq, hasMethod })=>{
    return (element)=>element instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$minim$40$0$2e$23$2e$8$2f$node_modules$2f$minim$2f$lib$2f$minim$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ArrayElement"] && !(element instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$minim$40$0$2e$23$2e$8$2f$node_modules$2f$minim$2f$lib$2f$minim$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ObjectElement"]) || hasBasicElementProps(element) && primitiveEq('array', element) && hasMethod('push', element) && hasMethod('unshift', element) && hasMethod('map', element) && hasMethod('reduce', element);
});
const isMemberElement = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swagger$2d$api$2b$apidom$2d$core$40$1$2e$0$2e$0$2d$rc$2e$3$2f$node_modules$2f40$swagger$2d$api$2f$apidom$2d$core$2f$src$2f$predicates$2f$helpers$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(({ hasBasicElementProps, isElementType, primitiveEq })=>{
    return (element)=>element instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$minim$40$0$2e$23$2e$8$2f$node_modules$2f$minim$2f$lib$2f$minim$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MemberElement"] || hasBasicElementProps(element) && isElementType('member', element) && primitiveEq(undefined, element);
});
const isLinkElement = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swagger$2d$api$2b$apidom$2d$core$40$1$2e$0$2e$0$2d$rc$2e$3$2f$node_modules$2f40$swagger$2d$api$2f$apidom$2d$core$2f$src$2f$predicates$2f$helpers$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(({ hasBasicElementProps, isElementType, primitiveEq })=>{
    return (element)=>element instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$minim$40$0$2e$23$2e$8$2f$node_modules$2f$minim$2f$lib$2f$minim$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LinkElement"] || hasBasicElementProps(element) && isElementType('link', element) && primitiveEq(undefined, element);
});
const isRefElement = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swagger$2d$api$2b$apidom$2d$core$40$1$2e$0$2e$0$2d$rc$2e$3$2f$node_modules$2f40$swagger$2d$api$2f$apidom$2d$core$2f$src$2f$predicates$2f$helpers$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(({ hasBasicElementProps, isElementType, primitiveEq })=>{
    return (element)=>element instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$minim$40$0$2e$23$2e$8$2f$node_modules$2f$minim$2f$lib$2f$minim$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RefElement"] || hasBasicElementProps(element) && isElementType('ref', element) && primitiveEq(undefined, element);
});
const isAnnotationElement = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swagger$2d$api$2b$apidom$2d$core$40$1$2e$0$2e$0$2d$rc$2e$3$2f$node_modules$2f40$swagger$2d$api$2f$apidom$2d$core$2f$src$2f$predicates$2f$helpers$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(({ hasBasicElementProps, isElementType, primitiveEq })=>{
    return (element)=>element instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swagger$2d$api$2b$apidom$2d$core$40$1$2e$0$2e$0$2d$rc$2e$3$2f$node_modules$2f40$swagger$2d$api$2f$apidom$2d$core$2f$src$2f$elements$2f$Annotation$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"] || hasBasicElementProps(element) && isElementType('annotation', element) && primitiveEq('array', element);
});
const isCommentElement = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swagger$2d$api$2b$apidom$2d$core$40$1$2e$0$2e$0$2d$rc$2e$3$2f$node_modules$2f40$swagger$2d$api$2f$apidom$2d$core$2f$src$2f$predicates$2f$helpers$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(({ hasBasicElementProps, isElementType, primitiveEq })=>{
    return (element)=>element instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swagger$2d$api$2b$apidom$2d$core$40$1$2e$0$2e$0$2d$rc$2e$3$2f$node_modules$2f40$swagger$2d$api$2f$apidom$2d$core$2f$src$2f$elements$2f$Comment$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"] || hasBasicElementProps(element) && isElementType('comment', element) && primitiveEq('string', element);
});
const isParseResultElement = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swagger$2d$api$2b$apidom$2d$core$40$1$2e$0$2e$0$2d$rc$2e$3$2f$node_modules$2f40$swagger$2d$api$2f$apidom$2d$core$2f$src$2f$predicates$2f$helpers$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(({ hasBasicElementProps, isElementType, primitiveEq })=>{
    return (element)=>element instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swagger$2d$api$2b$apidom$2d$core$40$1$2e$0$2e$0$2d$rc$2e$3$2f$node_modules$2f40$swagger$2d$api$2f$apidom$2d$core$2f$src$2f$elements$2f$ParseResult$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"] || hasBasicElementProps(element) && isElementType('parseResult', element) && primitiveEq('array', element);
});
const isPrimitiveElement = (element)=>{
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swagger$2d$api$2b$apidom$2d$core$40$1$2e$0$2e$0$2d$rc$2e$3$2f$node_modules$2f40$swagger$2d$api$2f$apidom$2d$core$2f$src$2f$predicates$2f$helpers$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isElementType"])('object', element) || (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swagger$2d$api$2b$apidom$2d$core$40$1$2e$0$2e$0$2d$rc$2e$3$2f$node_modules$2f40$swagger$2d$api$2f$apidom$2d$core$2f$src$2f$predicates$2f$helpers$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isElementType"])('array', element) || (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swagger$2d$api$2b$apidom$2d$core$40$1$2e$0$2e$0$2d$rc$2e$3$2f$node_modules$2f40$swagger$2d$api$2f$apidom$2d$core$2f$src$2f$predicates$2f$helpers$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isElementType"])('boolean', element) || (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swagger$2d$api$2b$apidom$2d$core$40$1$2e$0$2e$0$2d$rc$2e$3$2f$node_modules$2f40$swagger$2d$api$2f$apidom$2d$core$2f$src$2f$predicates$2f$helpers$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isElementType"])('number', element) || (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swagger$2d$api$2b$apidom$2d$core$40$1$2e$0$2e$0$2d$rc$2e$3$2f$node_modules$2f40$swagger$2d$api$2f$apidom$2d$core$2f$src$2f$predicates$2f$helpers$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isElementType"])('string', element) || (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swagger$2d$api$2b$apidom$2d$core$40$1$2e$0$2e$0$2d$rc$2e$3$2f$node_modules$2f40$swagger$2d$api$2f$apidom$2d$core$2f$src$2f$predicates$2f$helpers$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isElementType"])('null', element) || (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swagger$2d$api$2b$apidom$2d$core$40$1$2e$0$2e$0$2d$rc$2e$3$2f$node_modules$2f40$swagger$2d$api$2f$apidom$2d$core$2f$src$2f$predicates$2f$helpers$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isElementType"])('member', element);
};
const hasElementSourceMap = (element)=>{
    if (!isElement(element)) {
        return false;
    }
    return Number.isInteger(element.startPositionRow) && Number.isInteger(element.startPositionColumn) && Number.isInteger(element.startIndex) && Number.isInteger(element.endPositionRow) && Number.isInteger(element.endPositionColumn) && Number.isInteger(element.endIndex);
};
const includesSymbols = (symbols, element)=>{
    if (symbols.length === 0) {
        return true;
    }
    const elementSymbols = element.attributes.get('symbols');
    if (!isArrayElement(elementSymbols)) {
        return false;
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$ramda$40$0$2e$30$2e$1$2f$node_modules$2f$ramda$2f$es$2f$all$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__all$3e$__["all"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$ramda$2d$adjunct$40$5$2e$1$2e$0_ramda$40$0$2e$30$2e$1$2f$node_modules$2f$ramda$2d$adjunct$2f$es$2f$included$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__included$3e$__["included"])(elementSymbols.toValue()), symbols);
};
const includesClasses = (classes, element)=>{
    if (classes.length === 0) {
        return true;
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$ramda$40$0$2e$30$2e$1$2f$node_modules$2f$ramda$2f$es$2f$all$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__all$3e$__["all"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$ramda$2d$adjunct$40$5$2e$1$2e$0_ramda$40$0$2e$30$2e$1$2f$node_modules$2f$ramda$2d$adjunct$2f$es$2f$included$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__included$3e$__["included"])(element.classes.toValue()), classes);
};
}),
"[project]/node_modules/.pnpm/@swagger-api+apidom-core@1.0.0-rc.3/node_modules/@swagger-api/apidom-core/src/elements/ParseResult.mjs [app-client] (ecmascript) <export default as ParseResultElement>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ParseResultElement",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swagger$2d$api$2b$apidom$2d$core$40$1$2e$0$2e$0$2d$rc$2e$3$2f$node_modules$2f40$swagger$2d$api$2f$apidom$2d$core$2f$src$2f$elements$2f$ParseResult$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swagger$2d$api$2b$apidom$2d$core$40$1$2e$0$2e$0$2d$rc$2e$3$2f$node_modules$2f40$swagger$2d$api$2f$apidom$2d$core$2f$src$2f$elements$2f$ParseResult$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@swagger-api+apidom-core@1.0.0-rc.3/node_modules/@swagger-api/apidom-core/src/elements/ParseResult.mjs [app-client] (ecmascript)");
}),
"[project]/node_modules/.pnpm/@swagger-api+apidom-core@1.0.0-rc.3/node_modules/@swagger-api/apidom-core/src/clone/errors/CloneError.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swagger$2d$api$2b$apidom$2d$error$40$1$2e$0$2e$0$2d$rc$2e$3$2f$node_modules$2f40$swagger$2d$api$2f$apidom$2d$error$2f$src$2f$ApiDOMStructuredError$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ApiDOMStructuredError$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@swagger-api+apidom-error@1.0.0-rc.3/node_modules/@swagger-api/apidom-error/src/ApiDOMStructuredError.mjs [app-client] (ecmascript) <export default as ApiDOMStructuredError>");
;
/**
 * @public
 */ /**
 * @public
 */ class CloneError extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swagger$2d$api$2b$apidom$2d$error$40$1$2e$0$2e$0$2d$rc$2e$3$2f$node_modules$2f40$swagger$2d$api$2f$apidom$2d$error$2f$src$2f$ApiDOMStructuredError$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ApiDOMStructuredError$3e$__["ApiDOMStructuredError"] {
    value;
    constructor(message, structuredOptions){
        super(message, structuredOptions);
        if (typeof structuredOptions !== 'undefined') {
            this.value = structuredOptions.value;
        }
    }
}
const __TURBOPACK__default__export__ = CloneError;
}),
"[project]/node_modules/.pnpm/@swagger-api+apidom-core@1.0.0-rc.3/node_modules/@swagger-api/apidom-core/src/clone/errors/DeepCloneError.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swagger$2d$api$2b$apidom$2d$core$40$1$2e$0$2e$0$2d$rc$2e$3$2f$node_modules$2f40$swagger$2d$api$2f$apidom$2d$core$2f$src$2f$clone$2f$errors$2f$CloneError$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@swagger-api+apidom-core@1.0.0-rc.3/node_modules/@swagger-api/apidom-core/src/clone/errors/CloneError.mjs [app-client] (ecmascript)");
;
/**
 * @public
 */ class DeepCloneError extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swagger$2d$api$2b$apidom$2d$core$40$1$2e$0$2e$0$2d$rc$2e$3$2f$node_modules$2f40$swagger$2d$api$2f$apidom$2d$core$2f$src$2f$clone$2f$errors$2f$CloneError$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"] {
}
const __TURBOPACK__default__export__ = DeepCloneError;
}),
"[project]/node_modules/.pnpm/@swagger-api+apidom-core@1.0.0-rc.3/node_modules/@swagger-api/apidom-core/src/clone/errors/ShallowCloneError.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swagger$2d$api$2b$apidom$2d$core$40$1$2e$0$2e$0$2d$rc$2e$3$2f$node_modules$2f40$swagger$2d$api$2f$apidom$2d$core$2f$src$2f$clone$2f$errors$2f$CloneError$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@swagger-api+apidom-core@1.0.0-rc.3/node_modules/@swagger-api/apidom-core/src/clone/errors/CloneError.mjs [app-client] (ecmascript)");
;
/**
 * @public
 */ class ShallowCloneError extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swagger$2d$api$2b$apidom$2d$core$40$1$2e$0$2e$0$2d$rc$2e$3$2f$node_modules$2f40$swagger$2d$api$2f$apidom$2d$core$2f$src$2f$clone$2f$errors$2f$CloneError$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"] {
}
const __TURBOPACK__default__export__ = ShallowCloneError;
}),
"[project]/node_modules/.pnpm/@swagger-api+apidom-core@1.0.0-rc.3/node_modules/@swagger-api/apidom-core/src/util.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "assignSourceMap",
    ()=>assignSourceMap,
    "dereference",
    ()=>dereference
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$ramda$40$0$2e$30$2e$1$2f$node_modules$2f$ramda$2f$es$2f$defaultTo$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__defaultTo$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/ramda@0.30.1/node_modules/ramda/es/defaultTo.js [app-client] (ecmascript) <export default as defaultTo>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$ramda$40$0$2e$30$2e$1$2f$node_modules$2f$ramda$2f$es$2f$has$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__has$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/ramda@0.30.1/node_modules/ramda/es/has.js [app-client] (ecmascript) <export default as has>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$ramda$40$0$2e$30$2e$1$2f$node_modules$2f$ramda$2f$es$2f$mapObjIndexed$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__mapObjIndexed$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/ramda@0.30.1/node_modules/ramda/es/mapObjIndexed.js [app-client] (ecmascript) <export default as mapObjIndexed>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$ramda$40$0$2e$30$2e$1$2f$node_modules$2f$ramda$2f$es$2f$path$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__path$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/ramda@0.30.1/node_modules/ramda/es/path.js [app-client] (ecmascript) <export default as path>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$ramda$40$0$2e$30$2e$1$2f$node_modules$2f$ramda$2f$es$2f$propSatisfies$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__propSatisfies$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/ramda@0.30.1/node_modules/ramda/es/propSatisfies.js [app-client] (ecmascript) <export default as propSatisfies>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$ramda$2d$adjunct$40$5$2e$1$2e$0_ramda$40$0$2e$30$2e$1$2f$node_modules$2f$ramda$2d$adjunct$2f$es$2f$isPlainObj$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__isPlainObject$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/ramda-adjunct@5.1.0_ramda@0.30.1/node_modules/ramda-adjunct/es/isPlainObj.js [app-client] (ecmascript) <export default as isPlainObject>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$ramda$2d$adjunct$40$5$2e$1$2e$0_ramda$40$0$2e$30$2e$1$2f$node_modules$2f$ramda$2d$adjunct$2f$es$2f$isString$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__isString$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/ramda-adjunct@5.1.0_ramda@0.30.1/node_modules/ramda-adjunct/es/isString.js [app-client] (ecmascript) <export default as isString>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$ramda$2d$adjunct$40$5$2e$1$2e$0_ramda$40$0$2e$30$2e$1$2f$node_modules$2f$ramda$2d$adjunct$2f$es$2f$trimCharsStart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__trimCharsStart$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/ramda-adjunct@5.1.0_ramda@0.30.1/node_modules/ramda-adjunct/es/trimCharsStart.js [app-client] (ecmascript) <export default as trimCharsStart>");
;
;
const dereference = (object, root)=>{
    const rootObject = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$ramda$40$0$2e$30$2e$1$2f$node_modules$2f$ramda$2f$es$2f$defaultTo$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__defaultTo$3e$__["defaultTo"])(object, root);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$ramda$40$0$2e$30$2e$1$2f$node_modules$2f$ramda$2f$es$2f$mapObjIndexed$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__mapObjIndexed$3e$__["mapObjIndexed"])((val)=>{
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$ramda$2d$adjunct$40$5$2e$1$2e$0_ramda$40$0$2e$30$2e$1$2f$node_modules$2f$ramda$2d$adjunct$2f$es$2f$isPlainObj$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__isPlainObject$3e$__["isPlainObject"])(val) && (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$ramda$40$0$2e$30$2e$1$2f$node_modules$2f$ramda$2f$es$2f$has$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__has$3e$__["has"])('$ref', val) && (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$ramda$40$0$2e$30$2e$1$2f$node_modules$2f$ramda$2f$es$2f$propSatisfies$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__propSatisfies$3e$__["propSatisfies"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$ramda$2d$adjunct$40$5$2e$1$2e$0_ramda$40$0$2e$30$2e$1$2f$node_modules$2f$ramda$2d$adjunct$2f$es$2f$isString$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__isString$3e$__["isString"], '$ref', val)) {
            const $ref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$ramda$40$0$2e$30$2e$1$2f$node_modules$2f$ramda$2f$es$2f$path$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__path$3e$__["path"])([
                '$ref'
            ], val);
            // @ts-ignore
            const pointer = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$ramda$2d$adjunct$40$5$2e$1$2e$0_ramda$40$0$2e$30$2e$1$2f$node_modules$2f$ramda$2d$adjunct$2f$es$2f$trimCharsStart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__trimCharsStart$3e$__["trimCharsStart"])('#/', $ref);
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$ramda$40$0$2e$30$2e$1$2f$node_modules$2f$ramda$2f$es$2f$path$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__path$3e$__["path"])(pointer.split('/'), rootObject);
        }
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$ramda$2d$adjunct$40$5$2e$1$2e$0_ramda$40$0$2e$30$2e$1$2f$node_modules$2f$ramda$2d$adjunct$2f$es$2f$isPlainObj$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__isPlainObject$3e$__["isPlainObject"])(val)) {
            return dereference(val, rootObject);
        }
        return val;
    }, object);
};
const assignSourceMap = (to, from)=>{
    to.startPositionRow = from === null || from === void 0 ? void 0 : from.startPositionRow;
    to.startPositionColumn = from === null || from === void 0 ? void 0 : from.startPositionColumn;
    to.startIndex = from === null || from === void 0 ? void 0 : from.startIndex;
    to.endPositionRow = from === null || from === void 0 ? void 0 : from.endPositionRow;
    to.endPositionColumn = from === null || from === void 0 ? void 0 : from.endPositionColumn;
    to.endIndex = from === null || from === void 0 ? void 0 : from.endIndex;
    return to;
}; /* eslint-enable no-param-reassign */ 
}),
"[project]/node_modules/.pnpm/@swagger-api+apidom-core@1.0.0-rc.3/node_modules/@swagger-api/apidom-core/src/clone/index.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "cloneDeep",
    ()=>cloneDeep,
    "cloneShallow",
    ()=>cloneShallow
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$minim$40$0$2e$23$2e$8$2f$node_modules$2f$minim$2f$lib$2f$minim$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/minim@0.23.8/node_modules/minim/lib/minim.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swagger$2d$api$2b$apidom$2d$core$40$1$2e$0$2e$0$2d$rc$2e$3$2f$node_modules$2f40$swagger$2d$api$2f$apidom$2d$core$2f$src$2f$predicates$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@swagger-api+apidom-core@1.0.0-rc.3/node_modules/@swagger-api/apidom-core/src/predicates/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swagger$2d$api$2b$apidom$2d$core$40$1$2e$0$2e$0$2d$rc$2e$3$2f$node_modules$2f40$swagger$2d$api$2f$apidom$2d$core$2f$src$2f$clone$2f$errors$2f$DeepCloneError$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@swagger-api+apidom-core@1.0.0-rc.3/node_modules/@swagger-api/apidom-core/src/clone/errors/DeepCloneError.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swagger$2d$api$2b$apidom$2d$core$40$1$2e$0$2e$0$2d$rc$2e$3$2f$node_modules$2f40$swagger$2d$api$2f$apidom$2d$core$2f$src$2f$clone$2f$errors$2f$ShallowCloneError$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@swagger-api+apidom-core@1.0.0-rc.3/node_modules/@swagger-api/apidom-core/src/clone/errors/ShallowCloneError.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swagger$2d$api$2b$apidom$2d$core$40$1$2e$0$2e$0$2d$rc$2e$3$2f$node_modules$2f40$swagger$2d$api$2f$apidom$2d$core$2f$src$2f$util$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@swagger-api+apidom-core@1.0.0-rc.3/node_modules/@swagger-api/apidom-core/src/util.mjs [app-client] (ecmascript)");
;
;
;
;
;
const cloneDeep = (value, options = {})=>{
    const { visited = new WeakMap() } = options;
    const passThroughOptions = {
        ...options,
        visited
    };
    // detect cycle and return memoized value
    if (visited.has(value)) {
        return visited.get(value);
    }
    if (value instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$minim$40$0$2e$23$2e$8$2f$node_modules$2f$minim$2f$lib$2f$minim$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["KeyValuePair"]) {
        const { key, value: val } = value;
        const keyCopy = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swagger$2d$api$2b$apidom$2d$core$40$1$2e$0$2e$0$2d$rc$2e$3$2f$node_modules$2f40$swagger$2d$api$2f$apidom$2d$core$2f$src$2f$predicates$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isElement"])(key) ? cloneDeep(key, passThroughOptions) : key;
        const valueCopy = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swagger$2d$api$2b$apidom$2d$core$40$1$2e$0$2e$0$2d$rc$2e$3$2f$node_modules$2f40$swagger$2d$api$2f$apidom$2d$core$2f$src$2f$predicates$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isElement"])(val) ? cloneDeep(val, passThroughOptions) : val;
        const copy = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$minim$40$0$2e$23$2e$8$2f$node_modules$2f$minim$2f$lib$2f$minim$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["KeyValuePair"](keyCopy, valueCopy);
        visited.set(value, copy);
        return copy;
    }
    if (value instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$minim$40$0$2e$23$2e$8$2f$node_modules$2f$minim$2f$lib$2f$minim$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ObjectSlice"]) {
        const mapper = (element)=>cloneDeep(element, passThroughOptions);
        const items = [
            ...value
        ].map(mapper);
        const copy = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$minim$40$0$2e$23$2e$8$2f$node_modules$2f$minim$2f$lib$2f$minim$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ObjectSlice"](items);
        visited.set(value, copy);
        return copy;
    }
    if (value instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$minim$40$0$2e$23$2e$8$2f$node_modules$2f$minim$2f$lib$2f$minim$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ArraySlice"]) {
        const mapper = (element)=>cloneDeep(element, passThroughOptions);
        const items = [
            ...value
        ].map(mapper);
        const copy = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$minim$40$0$2e$23$2e$8$2f$node_modules$2f$minim$2f$lib$2f$minim$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ArraySlice"](items);
        visited.set(value, copy);
        return copy;
    }
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swagger$2d$api$2b$apidom$2d$core$40$1$2e$0$2e$0$2d$rc$2e$3$2f$node_modules$2f40$swagger$2d$api$2f$apidom$2d$core$2f$src$2f$predicates$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isElement"])(value)) {
        const copy = cloneShallow(value); // eslint-disable-line @typescript-eslint/no-use-before-define
        visited.set(value, copy);
        if (value.content) {
            if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swagger$2d$api$2b$apidom$2d$core$40$1$2e$0$2e$0$2d$rc$2e$3$2f$node_modules$2f40$swagger$2d$api$2f$apidom$2d$core$2f$src$2f$predicates$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isElement"])(value.content)) {
                copy.content = cloneDeep(value.content, passThroughOptions);
            } else if (value.content instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$minim$40$0$2e$23$2e$8$2f$node_modules$2f$minim$2f$lib$2f$minim$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["KeyValuePair"]) {
                copy.content = cloneDeep(value.content, passThroughOptions);
            } else if (Array.isArray(value.content)) {
                const mapper = (element)=>cloneDeep(element, passThroughOptions);
                copy.content = value.content.map(mapper);
            } else {
                copy.content = value.content;
            }
        } else {
            copy.content = value.content;
        }
        return copy;
    }
    throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swagger$2d$api$2b$apidom$2d$core$40$1$2e$0$2e$0$2d$rc$2e$3$2f$node_modules$2f40$swagger$2d$api$2f$apidom$2d$core$2f$src$2f$clone$2f$errors$2f$DeepCloneError$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]("Value provided to cloneDeep function couldn't be cloned", {
        value
    });
};
cloneDeep.safe = (value)=>{
    try {
        return cloneDeep(value);
    } catch  {
        return value;
    }
};
const cloneShallowKeyValuePair = (keyValuePair)=>{
    const { key, value } = keyValuePair;
    return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$minim$40$0$2e$23$2e$8$2f$node_modules$2f$minim$2f$lib$2f$minim$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["KeyValuePair"](key, value);
};
const cloneShallowArraySlice = (arraySlice)=>{
    const items = [
        ...arraySlice
    ];
    return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$minim$40$0$2e$23$2e$8$2f$node_modules$2f$minim$2f$lib$2f$minim$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ArraySlice"](items);
};
const cloneShallowObjectSlice = (objectSlice)=>{
    const items = [
        ...objectSlice
    ];
    return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$minim$40$0$2e$23$2e$8$2f$node_modules$2f$minim$2f$lib$2f$minim$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ObjectSlice"](items);
};
/* eslint-disable no-underscore-dangle */ const cloneShallowElement = (element)=>{
    // @ts-ignore
    const copy = new element.constructor();
    copy.element = element.element;
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swagger$2d$api$2b$apidom$2d$core$40$1$2e$0$2e$0$2d$rc$2e$3$2f$node_modules$2f40$swagger$2d$api$2f$apidom$2d$core$2f$src$2f$predicates$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["hasElementSourceMap"])(element)) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swagger$2d$api$2b$apidom$2d$core$40$1$2e$0$2e$0$2d$rc$2e$3$2f$node_modules$2f40$swagger$2d$api$2f$apidom$2d$core$2f$src$2f$util$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["assignSourceMap"])(copy, element);
    }
    if (element.meta.length > 0) {
        copy._meta = cloneDeep(element.meta);
    }
    if (element.attributes.length > 0) {
        copy._attributes = cloneDeep(element.attributes);
    }
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swagger$2d$api$2b$apidom$2d$core$40$1$2e$0$2e$0$2d$rc$2e$3$2f$node_modules$2f40$swagger$2d$api$2f$apidom$2d$core$2f$src$2f$predicates$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isElement"])(element.content)) {
        const content = element.content;
        copy.content = cloneShallowElement(content);
    } else if (Array.isArray(element.content)) {
        copy.content = [
            ...element.content
        ];
    } else if (element.content instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$minim$40$0$2e$23$2e$8$2f$node_modules$2f$minim$2f$lib$2f$minim$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["KeyValuePair"]) {
        copy.content = cloneShallowKeyValuePair(element.content);
    } else {
        copy.content = element.content;
    }
    return copy;
};
const cloneShallow = (value)=>{
    if (value instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$minim$40$0$2e$23$2e$8$2f$node_modules$2f$minim$2f$lib$2f$minim$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["KeyValuePair"]) {
        return cloneShallowKeyValuePair(value);
    }
    if (value instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$minim$40$0$2e$23$2e$8$2f$node_modules$2f$minim$2f$lib$2f$minim$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ObjectSlice"]) {
        return cloneShallowObjectSlice(value);
    }
    if (value instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$minim$40$0$2e$23$2e$8$2f$node_modules$2f$minim$2f$lib$2f$minim$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ArraySlice"]) {
        return cloneShallowArraySlice(value);
    }
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swagger$2d$api$2b$apidom$2d$core$40$1$2e$0$2e$0$2d$rc$2e$3$2f$node_modules$2f40$swagger$2d$api$2f$apidom$2d$core$2f$src$2f$predicates$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isElement"])(value)) {
        return cloneShallowElement(value);
    }
    throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swagger$2d$api$2b$apidom$2d$core$40$1$2e$0$2e$0$2d$rc$2e$3$2f$node_modules$2f40$swagger$2d$api$2f$apidom$2d$core$2f$src$2f$clone$2f$errors$2f$ShallowCloneError$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]("Value provided to cloneShallow function couldn't be cloned", {
        value
    });
};
cloneShallow.safe = (value)=>{
    try {
        return cloneShallow(value);
    } catch  {
        return value;
    }
};
}),
"[project]/node_modules/.pnpm/@swagger-api+apidom-core@1.0.0-rc.3/node_modules/@swagger-api/apidom-core/src/traversal/visitor.mjs [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PredicateVisitor",
    ()=>PredicateVisitor,
    "cloneNode",
    ()=>cloneNode,
    "getNodeType",
    ()=>getNodeType,
    "isNode",
    ()=>isNode,
    "keyMapDefault",
    ()=>keyMapDefault,
    "visit",
    ()=>visit
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$ramda$40$0$2e$30$2e$1$2f$node_modules$2f$ramda$2f$es$2f$F$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__F$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/ramda@0.30.1/node_modules/ramda/es/F.js [app-client] (ecmascript) <export default as F>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$ramda$40$0$2e$30$2e$1$2f$node_modules$2f$ramda$2f$es$2f$pipe$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__pipe$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/ramda@0.30.1/node_modules/ramda/es/pipe.js [app-client] (ecmascript) <export default as pipe>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$ramda$2d$adjunct$40$5$2e$1$2e$0_ramda$40$0$2e$30$2e$1$2f$node_modules$2f$ramda$2d$adjunct$2f$es$2f$isString$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__isString$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/ramda-adjunct@5.1.0_ramda@0.30.1/node_modules/ramda-adjunct/es/isString.js [app-client] (ecmascript) <export default as isString>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swagger$2d$api$2b$apidom$2d$ast$40$1$2e$0$2e$0$2d$rc$2e$3$2f$node_modules$2f40$swagger$2d$api$2f$apidom$2d$ast$2f$src$2f$traversal$2f$visitor$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@swagger-api+apidom-ast@1.0.0-rc.3/node_modules/@swagger-api/apidom-ast/src/traversal/visitor.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swagger$2d$api$2b$apidom$2d$ast$40$1$2e$0$2e$0$2d$rc$2e$3$2f$node_modules$2f40$swagger$2d$api$2f$apidom$2d$ast$2f$src$2f$traversal$2f$visitor$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__mergeAll__as__mergeAllVisitors$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@swagger-api+apidom-ast@1.0.0-rc.3/node_modules/@swagger-api/apidom-ast/src/traversal/visitor.mjs [app-client] (ecmascript) <export mergeAll as mergeAllVisitors>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swagger$2d$api$2b$apidom$2d$core$40$1$2e$0$2e$0$2d$rc$2e$3$2f$node_modules$2f40$swagger$2d$api$2f$apidom$2d$core$2f$src$2f$predicates$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@swagger-api+apidom-core@1.0.0-rc.3/node_modules/@swagger-api/apidom-core/src/predicates/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swagger$2d$api$2b$apidom$2d$core$40$1$2e$0$2e$0$2d$rc$2e$3$2f$node_modules$2f40$swagger$2d$api$2f$apidom$2d$core$2f$src$2f$clone$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@swagger-api+apidom-core@1.0.0-rc.3/node_modules/@swagger-api/apidom-core/src/clone/index.mjs [app-client] (ecmascript)");
;
;
;
;
;
;
const getNodeType = (element)=>{
    /*
   * We're translating every possible higher element type to primitive minim type here.
   * We're using polymorphism to recognize any higher element type as ObjectElement or ArrayElement.
   * Using polymorphism allows us to assume any namespace.
   *
   * There is a problem with naming visitor methods described here: https://github.com/babel/babel/discussions/12874
   */ return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swagger$2d$api$2b$apidom$2d$core$40$1$2e$0$2e$0$2d$rc$2e$3$2f$node_modules$2f40$swagger$2d$api$2f$apidom$2d$core$2f$src$2f$predicates$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isObjectElement"])(element) ? 'ObjectElement' : (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swagger$2d$api$2b$apidom$2d$core$40$1$2e$0$2e$0$2d$rc$2e$3$2f$node_modules$2f40$swagger$2d$api$2f$apidom$2d$core$2f$src$2f$predicates$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isArrayElement"])(element) ? 'ArrayElement' : (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swagger$2d$api$2b$apidom$2d$core$40$1$2e$0$2e$0$2d$rc$2e$3$2f$node_modules$2f40$swagger$2d$api$2f$apidom$2d$core$2f$src$2f$predicates$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isMemberElement"])(element) ? 'MemberElement' : (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swagger$2d$api$2b$apidom$2d$core$40$1$2e$0$2e$0$2d$rc$2e$3$2f$node_modules$2f40$swagger$2d$api$2f$apidom$2d$core$2f$src$2f$predicates$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isStringElement"])(element) ? 'StringElement' : (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swagger$2d$api$2b$apidom$2d$core$40$1$2e$0$2e$0$2d$rc$2e$3$2f$node_modules$2f40$swagger$2d$api$2f$apidom$2d$core$2f$src$2f$predicates$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isBooleanElement"])(element) ? 'BooleanElement' : (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swagger$2d$api$2b$apidom$2d$core$40$1$2e$0$2e$0$2d$rc$2e$3$2f$node_modules$2f40$swagger$2d$api$2f$apidom$2d$core$2f$src$2f$predicates$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isNumberElement"])(element) ? 'NumberElement' : (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swagger$2d$api$2b$apidom$2d$core$40$1$2e$0$2e$0$2d$rc$2e$3$2f$node_modules$2f40$swagger$2d$api$2f$apidom$2d$core$2f$src$2f$predicates$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isNullElement"])(element) ? 'NullElement' : (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swagger$2d$api$2b$apidom$2d$core$40$1$2e$0$2e$0$2d$rc$2e$3$2f$node_modules$2f40$swagger$2d$api$2f$apidom$2d$core$2f$src$2f$predicates$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isLinkElement"])(element) ? 'LinkElement' : (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swagger$2d$api$2b$apidom$2d$core$40$1$2e$0$2e$0$2d$rc$2e$3$2f$node_modules$2f40$swagger$2d$api$2f$apidom$2d$core$2f$src$2f$predicates$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isRefElement"])(element) ? 'RefElement' : undefined;
};
const cloneNode = (node)=>{
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swagger$2d$api$2b$apidom$2d$core$40$1$2e$0$2e$0$2d$rc$2e$3$2f$node_modules$2f40$swagger$2d$api$2f$apidom$2d$core$2f$src$2f$predicates$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isElement"])(node)) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swagger$2d$api$2b$apidom$2d$core$40$1$2e$0$2e$0$2d$rc$2e$3$2f$node_modules$2f40$swagger$2d$api$2f$apidom$2d$core$2f$src$2f$clone$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cloneShallow"])(node);
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swagger$2d$api$2b$apidom$2d$ast$40$1$2e$0$2e$0$2d$rc$2e$3$2f$node_modules$2f40$swagger$2d$api$2f$apidom$2d$ast$2f$src$2f$traversal$2f$visitor$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cloneNode"])(node);
};
const isNode = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$ramda$40$0$2e$30$2e$1$2f$node_modules$2f$ramda$2f$es$2f$pipe$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__pipe$3e$__["pipe"])(getNodeType, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$ramda$2d$adjunct$40$5$2e$1$2e$0_ramda$40$0$2e$30$2e$1$2f$node_modules$2f$ramda$2d$adjunct$2f$es$2f$isString$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__isString$3e$__["isString"]);
const keyMapDefault = {
    ObjectElement: [
        'content'
    ],
    ArrayElement: [
        'content'
    ],
    MemberElement: [
        'key',
        'value'
    ],
    StringElement: [],
    BooleanElement: [],
    NumberElement: [],
    NullElement: [],
    RefElement: [],
    LinkElement: [],
    Annotation: [],
    Comment: [],
    ParseResultElement: [
        'content'
    ]
};
class PredicateVisitor {
    result;
    predicate;
    returnOnTrue;
    returnOnFalse;
    constructor({ predicate = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$ramda$40$0$2e$30$2e$1$2f$node_modules$2f$ramda$2f$es$2f$F$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__F$3e$__["F"], returnOnTrue, returnOnFalse } = {}){
        this.result = [];
        this.predicate = predicate;
        this.returnOnTrue = returnOnTrue;
        this.returnOnFalse = returnOnFalse;
    }
    enter(element) {
        if (this.predicate(element)) {
            this.result.push(element);
            return this.returnOnTrue;
        }
        return this.returnOnFalse;
    }
}
const visit = (root, // @ts-ignore
visitor, { keyMap = keyMapDefault, ...rest } = {})=>{
    // @ts-ignore
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swagger$2d$api$2b$apidom$2d$ast$40$1$2e$0$2e$0$2d$rc$2e$3$2f$node_modules$2f40$swagger$2d$api$2f$apidom$2d$ast$2f$src$2f$traversal$2f$visitor$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["visit"])(root, visitor, {
        // @ts-ignore
        keyMap,
        // @ts-ignore
        nodeTypeGetter: getNodeType,
        nodePredicate: isNode,
        nodeCloneFn: cloneNode,
        ...rest
    });
};
// @ts-ignore
visit[Symbol.for('nodejs.util.promisify.custom')] = async (root, // @ts-ignore
visitor, { keyMap = keyMapDefault, ...rest } = {})=>{
    // @ts-ignore
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swagger$2d$api$2b$apidom$2d$ast$40$1$2e$0$2e$0$2d$rc$2e$3$2f$node_modules$2f40$swagger$2d$api$2f$apidom$2d$ast$2f$src$2f$traversal$2f$visitor$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["visit"][Symbol.for('nodejs.util.promisify.custom')](root, visitor, {
        // @ts-ignore
        keyMap,
        // @ts-ignore
        nodeTypeGetter: getNodeType,
        nodePredicate: isNode,
        nodeCloneFn: cloneNode,
        ...rest
    });
};
}),
"[project]/node_modules/.pnpm/@swagger-api+apidom-core@1.0.0-rc.3/node_modules/@swagger-api/apidom-core/src/transformers/serializers/value/visitor.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "visit",
    ()=>visit
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$ramda$40$0$2e$30$2e$1$2f$node_modules$2f$ramda$2f$es$2f$T$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__T$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/ramda@0.30.1/node_modules/ramda/es/T.js [app-client] (ecmascript) <export default as T>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swagger$2d$api$2b$apidom$2d$core$40$1$2e$0$2e$0$2d$rc$2e$3$2f$node_modules$2f40$swagger$2d$api$2f$apidom$2d$core$2f$src$2f$traversal$2f$visitor$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@swagger-api+apidom-core@1.0.0-rc.3/node_modules/@swagger-api/apidom-core/src/traversal/visitor.mjs [app-client] (ecmascript) <locals>");
;
;
const nodeTypeGetter = (node)=>{
    if (typeof (node === null || node === void 0 ? void 0 : node.type) === 'string') {
        return node.type;
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swagger$2d$api$2b$apidom$2d$core$40$1$2e$0$2e$0$2d$rc$2e$3$2f$node_modules$2f40$swagger$2d$api$2f$apidom$2d$core$2f$src$2f$traversal$2f$visitor$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["getNodeType"])(node);
};
const keyMapDefault = {
    EphemeralObject: [
        'content'
    ],
    EphemeralArray: [
        'content'
    ],
    ...__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swagger$2d$api$2b$apidom$2d$core$40$1$2e$0$2e$0$2d$rc$2e$3$2f$node_modules$2f40$swagger$2d$api$2f$apidom$2d$core$2f$src$2f$traversal$2f$visitor$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["keyMapDefault"]
};
const visit = (root, // @ts-ignore
visitor1, { keyMap = keyMapDefault, ...rest } = {})=>{
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swagger$2d$api$2b$apidom$2d$core$40$1$2e$0$2e$0$2d$rc$2e$3$2f$node_modules$2f40$swagger$2d$api$2f$apidom$2d$core$2f$src$2f$traversal$2f$visitor$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["visit"])(root, visitor1, {
        keyMap,
        // @ts-ignore
        nodeTypeGetter,
        nodePredicate: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$ramda$40$0$2e$30$2e$1$2f$node_modules$2f$ramda$2f$es$2f$T$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__T$3e$__["T"],
        detectCycles: false,
        deleteNodeSymbol: Symbol.for('delete-node'),
        skipVisitingNodeSymbol: Symbol.for('skip-visiting-node'),
        ...rest
    });
};
// @ts-ignore
visit[Symbol.for('nodejs.util.promisify.custom')] = async (root, { keyMap = keyMapDefault, ...rest } = {})=>{
    // @ts-ignore
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swagger$2d$api$2b$apidom$2d$core$40$1$2e$0$2e$0$2d$rc$2e$3$2f$node_modules$2f40$swagger$2d$api$2f$apidom$2d$core$2f$src$2f$traversal$2f$visitor$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["visit"][Symbol.for('nodejs.util.promisify.custom')](root, visitor, {
        keyMap,
        nodeTypeGetter,
        nodePredicate: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$ramda$40$0$2e$30$2e$1$2f$node_modules$2f$ramda$2f$es$2f$T$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__T$3e$__["T"],
        detectCycles: false,
        deleteNodeSymbol: Symbol.for('delete-node'),
        skipVisitingNodeSymbol: Symbol.for('skip-visiting-node'),
        ...rest
    });
};
}),
"[project]/node_modules/.pnpm/@swagger-api+apidom-core@1.0.0-rc.3/node_modules/@swagger-api/apidom-core/src/transformers/serializers/value/ast/ephemeral-array.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
class EphemeralArray {
    type = 'EphemeralArray';
    content = [];
    reference = undefined;
    constructor(content){
        this.content = content;
        this.reference = [];
    }
    toReference() {
        return this.reference;
    }
    toArray() {
        this.reference.push(...this.content);
        return this.reference;
    }
}
const __TURBOPACK__default__export__ = EphemeralArray;
}),
"[project]/node_modules/.pnpm/@swagger-api+apidom-core@1.0.0-rc.3/node_modules/@swagger-api/apidom-core/src/transformers/serializers/value/ast/ephemeral-object.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
class EphemeralObject {
    type = 'EphemeralObject';
    content = [];
    reference = undefined;
    constructor(content){
        this.content = content;
        this.reference = {};
    }
    toReference() {
        return this.reference;
    }
    toObject() {
        return Object.assign(this.reference, Object.fromEntries(this.content));
    }
}
const __TURBOPACK__default__export__ = EphemeralObject;
}),
"[project]/node_modules/.pnpm/@swagger-api+apidom-core@1.0.0-rc.3/node_modules/@swagger-api/apidom-core/src/transformers/serializers/value/index.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swagger$2d$api$2b$apidom$2d$core$40$1$2e$0$2e$0$2d$rc$2e$3$2f$node_modules$2f40$swagger$2d$api$2f$apidom$2d$core$2f$src$2f$transformers$2f$serializers$2f$value$2f$visitor$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@swagger-api+apidom-core@1.0.0-rc.3/node_modules/@swagger-api/apidom-core/src/transformers/serializers/value/visitor.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swagger$2d$api$2b$apidom$2d$core$40$1$2e$0$2e$0$2d$rc$2e$3$2f$node_modules$2f40$swagger$2d$api$2f$apidom$2d$core$2f$src$2f$transformers$2f$serializers$2f$value$2f$ast$2f$ephemeral$2d$array$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@swagger-api+apidom-core@1.0.0-rc.3/node_modules/@swagger-api/apidom-core/src/transformers/serializers/value/ast/ephemeral-array.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swagger$2d$api$2b$apidom$2d$core$40$1$2e$0$2e$0$2d$rc$2e$3$2f$node_modules$2f40$swagger$2d$api$2f$apidom$2d$core$2f$src$2f$transformers$2f$serializers$2f$value$2f$ast$2f$ephemeral$2d$object$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@swagger-api+apidom-core@1.0.0-rc.3/node_modules/@swagger-api/apidom-core/src/transformers/serializers/value/ast/ephemeral-object.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swagger$2d$api$2b$apidom$2d$core$40$1$2e$0$2e$0$2d$rc$2e$3$2f$node_modules$2f40$swagger$2d$api$2f$apidom$2d$core$2f$src$2f$predicates$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@swagger-api+apidom-core@1.0.0-rc.3/node_modules/@swagger-api/apidom-core/src/predicates/index.mjs [app-client] (ecmascript)");
;
;
;
;
/* eslint-disable class-methods-use-this */ class Visitor {
    ObjectElement = {
        enter: (element)=>{
            if (this.references.has(element)) {
                return this.references.get(element).toReference();
            }
            const ephemeral = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swagger$2d$api$2b$apidom$2d$core$40$1$2e$0$2e$0$2d$rc$2e$3$2f$node_modules$2f40$swagger$2d$api$2f$apidom$2d$core$2f$src$2f$transformers$2f$serializers$2f$value$2f$ast$2f$ephemeral$2d$object$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"](element.content);
            this.references.set(element, ephemeral);
            return ephemeral;
        }
    };
    EphemeralObject = {
        leave: (ephemeral)=>{
            return ephemeral.toObject();
        }
    };
    MemberElement = {
        enter: (element)=>{
            return [
                element.key,
                element.value
            ];
        }
    };
    ArrayElement = {
        enter: (element)=>{
            if (this.references.has(element)) {
                return this.references.get(element).toReference();
            }
            const ephemeral = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swagger$2d$api$2b$apidom$2d$core$40$1$2e$0$2e$0$2d$rc$2e$3$2f$node_modules$2f40$swagger$2d$api$2f$apidom$2d$core$2f$src$2f$transformers$2f$serializers$2f$value$2f$ast$2f$ephemeral$2d$array$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"](element.content);
            this.references.set(element, ephemeral);
            return ephemeral;
        }
    };
    EphemeralArray = {
        leave: (ephemeral)=>{
            return ephemeral.toArray();
        }
    };
    references = new WeakMap();
    BooleanElement(element) {
        return element.toValue();
    }
    NumberElement(element) {
        return element.toValue();
    }
    StringElement(element) {
        return element.toValue();
    }
    NullElement() {
        return null;
    }
    RefElement(element, ...rest) {
        var _ancestors;
        const ancestors = rest[3];
        if (((_ancestors = ancestors[ancestors.length - 1]) === null || _ancestors === void 0 ? void 0 : _ancestors.type) === 'EphemeralObject') {
            return Symbol.for('delete-node');
        }
        return String(element.toValue());
    }
    LinkElement(element) {
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swagger$2d$api$2b$apidom$2d$core$40$1$2e$0$2e$0$2d$rc$2e$3$2f$node_modules$2f40$swagger$2d$api$2f$apidom$2d$core$2f$src$2f$predicates$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isStringElement"])(element.href)) {
            return element.href.toValue();
        }
        return '';
    }
}
/**
 * @public
 */ const serializer = (element)=>{
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swagger$2d$api$2b$apidom$2d$core$40$1$2e$0$2e$0$2d$rc$2e$3$2f$node_modules$2f40$swagger$2d$api$2f$apidom$2d$core$2f$src$2f$predicates$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isElement"])(element)) return element;
    // shortcut optimization for certain element types
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swagger$2d$api$2b$apidom$2d$core$40$1$2e$0$2e$0$2d$rc$2e$3$2f$node_modules$2f40$swagger$2d$api$2f$apidom$2d$core$2f$src$2f$predicates$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isStringElement"])(element) || (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swagger$2d$api$2b$apidom$2d$core$40$1$2e$0$2e$0$2d$rc$2e$3$2f$node_modules$2f40$swagger$2d$api$2f$apidom$2d$core$2f$src$2f$predicates$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isNumberElement"])(element) || (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swagger$2d$api$2b$apidom$2d$core$40$1$2e$0$2e$0$2d$rc$2e$3$2f$node_modules$2f40$swagger$2d$api$2f$apidom$2d$core$2f$src$2f$predicates$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isBooleanElement"])(element) || (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swagger$2d$api$2b$apidom$2d$core$40$1$2e$0$2e$0$2d$rc$2e$3$2f$node_modules$2f40$swagger$2d$api$2f$apidom$2d$core$2f$src$2f$predicates$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isNullElement"])(element)) {
        return element.toValue();
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swagger$2d$api$2b$apidom$2d$core$40$1$2e$0$2e$0$2d$rc$2e$3$2f$node_modules$2f40$swagger$2d$api$2f$apidom$2d$core$2f$src$2f$transformers$2f$serializers$2f$value$2f$visitor$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["visit"])(element, new Visitor());
};
const __TURBOPACK__default__export__ = serializer;
}),
"[project]/node_modules/.pnpm/@swagger-api+apidom-core@1.0.0-rc.3/node_modules/@swagger-api/apidom-core/src/transformers/serializers/value/index.mjs [app-client] (ecmascript) <export default as toValue>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "toValue",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swagger$2d$api$2b$apidom$2d$core$40$1$2e$0$2e$0$2d$rc$2e$3$2f$node_modules$2f40$swagger$2d$api$2f$apidom$2d$core$2f$src$2f$transformers$2f$serializers$2f$value$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swagger$2d$api$2b$apidom$2d$core$40$1$2e$0$2e$0$2d$rc$2e$3$2f$node_modules$2f40$swagger$2d$api$2f$apidom$2d$core$2f$src$2f$transformers$2f$serializers$2f$value$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@swagger-api+apidom-core@1.0.0-rc.3/node_modules/@swagger-api/apidom-core/src/transformers/serializers/value/index.mjs [app-client] (ecmascript)");
}),
"[project]/node_modules/.pnpm/@swagger-api+apidom-core@1.0.0-rc.3/node_modules/@swagger-api/apidom-core/src/transcluder/Transcluder.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$ramda$2d$adjunct$40$5$2e$1$2e$0_ramda$40$0$2e$30$2e$1$2f$node_modules$2f$ramda$2d$adjunct$2f$es$2f$isUndefined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__isUndefined$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/ramda-adjunct@5.1.0_ramda@0.30.1/node_modules/ramda-adjunct/es/isUndefined.js [app-client] (ecmascript) <export default as isUndefined>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swagger$2d$api$2b$apidom$2d$core$40$1$2e$0$2e$0$2d$rc$2e$3$2f$node_modules$2f40$swagger$2d$api$2f$apidom$2d$core$2f$src$2f$predicates$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@swagger-api+apidom-core@1.0.0-rc.3/node_modules/@swagger-api/apidom-core/src/predicates/index.mjs [app-client] (ecmascript)");
;
;
const computeEdges = (element, edges = new WeakMap())=>{
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swagger$2d$api$2b$apidom$2d$core$40$1$2e$0$2e$0$2d$rc$2e$3$2f$node_modules$2f40$swagger$2d$api$2f$apidom$2d$core$2f$src$2f$predicates$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isMemberElement"])(element)) {
        // @ts-ignore
        edges.set(element.key, element);
        // @ts-ignore
        computeEdges(element.key, edges);
        // @ts-ignore
        edges.set(element.value, element);
        // @ts-ignore
        computeEdges(element.value, edges);
    } else {
        element.children.forEach((childElement)=>{
            edges.set(childElement, element);
            computeEdges(childElement, edges);
        });
    }
    return edges;
};
const transcludeChildOfMemberElement = (search, replace, edges)=>{
    const memberElement = edges.get(search);
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swagger$2d$api$2b$apidom$2d$core$40$1$2e$0$2e$0$2d$rc$2e$3$2f$node_modules$2f40$swagger$2d$api$2f$apidom$2d$core$2f$src$2f$predicates$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isMemberElement"])(memberElement)) {
        return;
    }
    if (memberElement.key === search) {
        memberElement.key = replace;
        edges.delete(search);
        edges.set(replace, memberElement);
    }
    if (memberElement.value === search) {
        memberElement.value = replace;
        edges.delete(search);
        edges.set(replace, memberElement);
    }
};
const transcludeChildOfObjectElement = (search, replace, edges)=>{
    const objectElement = edges.get(search);
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swagger$2d$api$2b$apidom$2d$core$40$1$2e$0$2e$0$2d$rc$2e$3$2f$node_modules$2f40$swagger$2d$api$2f$apidom$2d$core$2f$src$2f$predicates$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isObjectElement"])(objectElement)) {
        return;
    }
    objectElement.content = objectElement.map((value, key, member)=>{
        if (member === search) {
            edges.delete(search);
            edges.set(replace, objectElement);
            return replace;
        }
        return member;
    });
};
const transcludeChildOfArrayElement = (search, replace, edges)=>{
    const arrayElement = edges.get(search);
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swagger$2d$api$2b$apidom$2d$core$40$1$2e$0$2e$0$2d$rc$2e$3$2f$node_modules$2f40$swagger$2d$api$2f$apidom$2d$core$2f$src$2f$predicates$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isArrayElement"])(arrayElement)) {
        return;
    }
    arrayElement.content = arrayElement.map((element)=>{
        if (element === search) {
            edges.delete(search);
            edges.set(replace, arrayElement);
            return replace;
        }
        return element;
    });
};
/**
 * This is a mutating stamp. If you don't want your Element to be mutated,
 * clone in before passing it to initializer of this stamp.
 * @public
 */ class Transcluder {
    element;
    edges;
    constructor({ element }){
        this.element = element;
    }
    transclude(search, replace) {
        var _this$edges;
        // shortcut 1. - replacing entire ApiDOM tree
        if (search === this.element) return replace;
        // shortcut 2. - replacing nothing
        if (search === replace) return this.element;
        this.edges = (_this$edges = this.edges) !== null && _this$edges !== void 0 ? _this$edges : computeEdges(this.element);
        const parent = this.edges.get(search);
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$ramda$2d$adjunct$40$5$2e$1$2e$0_ramda$40$0$2e$30$2e$1$2f$node_modules$2f$ramda$2d$adjunct$2f$es$2f$isUndefined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__isUndefined$3e$__["isUndefined"])(parent)) {
            return undefined;
        }
        /**
     * This predicate must be first because ObjectElement extends ArrayElement.
     * isArrayElement returns true for ObjectElements.
     * (classical problems with polymorphism)
     */ if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swagger$2d$api$2b$apidom$2d$core$40$1$2e$0$2e$0$2d$rc$2e$3$2f$node_modules$2f40$swagger$2d$api$2f$apidom$2d$core$2f$src$2f$predicates$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isObjectElement"])(parent)) {
            // @ts-ignore
            transcludeChildOfObjectElement(search, replace, this.edges);
        } else if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swagger$2d$api$2b$apidom$2d$core$40$1$2e$0$2e$0$2d$rc$2e$3$2f$node_modules$2f40$swagger$2d$api$2f$apidom$2d$core$2f$src$2f$predicates$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isArrayElement"])(parent)) {
            transcludeChildOfArrayElement(search, replace, this.edges);
        } else if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swagger$2d$api$2b$apidom$2d$core$40$1$2e$0$2e$0$2d$rc$2e$3$2f$node_modules$2f40$swagger$2d$api$2f$apidom$2d$core$2f$src$2f$predicates$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isMemberElement"])(parent)) {
            transcludeChildOfMemberElement(search, replace, this.edges);
        }
        return this.element;
    }
}
const __TURBOPACK__default__export__ = Transcluder;
}),
"[project]/node_modules/.pnpm/@swagger-api+apidom-core@1.0.0-rc.3/node_modules/@swagger-api/apidom-core/src/transcluder/index.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__,
    "transclude",
    ()=>transclude
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swagger$2d$api$2b$apidom$2d$core$40$1$2e$0$2e$0$2d$rc$2e$3$2f$node_modules$2f40$swagger$2d$api$2f$apidom$2d$core$2f$src$2f$transcluder$2f$Transcluder$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@swagger-api+apidom-core@1.0.0-rc.3/node_modules/@swagger-api/apidom-core/src/transcluder/Transcluder.mjs [app-client] (ecmascript)");
;
const transclude = (search, replace, element)=>{
    const transcluder = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swagger$2d$api$2b$apidom$2d$core$40$1$2e$0$2e$0$2d$rc$2e$3$2f$node_modules$2f40$swagger$2d$api$2f$apidom$2d$core$2f$src$2f$transcluder$2f$Transcluder$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]({
        element
    });
    return transcluder.transclude(search, replace);
};
const __TURBOPACK__default__export__ = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swagger$2d$api$2b$apidom$2d$core$40$1$2e$0$2e$0$2d$rc$2e$3$2f$node_modules$2f40$swagger$2d$api$2f$apidom$2d$core$2f$src$2f$transcluder$2f$Transcluder$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"];
}),
"[project]/node_modules/.pnpm/@swagger-api+apidom-core@1.0.0-rc.3/node_modules/@swagger-api/apidom-core/src/media-types.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swagger$2d$api$2b$apidom$2d$error$40$1$2e$0$2e$0$2d$rc$2e$3$2f$node_modules$2f40$swagger$2d$api$2f$apidom$2d$error$2f$src$2f$NotImplementedError$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__NotImplementedError$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@swagger-api+apidom-error@1.0.0-rc.3/node_modules/@swagger-api/apidom-error/src/NotImplementedError.mjs [app-client] (ecmascript) <export default as NotImplementedError>");
;
/**
 * @public
 */ class MediaTypes extends Array {
    unknownMediaType = 'application/octet-stream';
    // eslint-disable-next-line class-methods-use-this
    filterByFormat() {
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swagger$2d$api$2b$apidom$2d$error$40$1$2e$0$2e$0$2d$rc$2e$3$2f$node_modules$2f40$swagger$2d$api$2f$apidom$2d$error$2f$src$2f$NotImplementedError$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__NotImplementedError$3e$__["NotImplementedError"]('filterByFormat method in MediaTypes class is not yet implemented.');
    }
    // eslint-disable-next-line class-methods-use-this
    findBy() {
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swagger$2d$api$2b$apidom$2d$error$40$1$2e$0$2e$0$2d$rc$2e$3$2f$node_modules$2f40$swagger$2d$api$2f$apidom$2d$error$2f$src$2f$NotImplementedError$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__NotImplementedError$3e$__["NotImplementedError"]('findBy method in MediaTypes class is not yet implemented.');
    }
    // eslint-disable-next-line class-methods-use-this
    latest() {
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swagger$2d$api$2b$apidom$2d$error$40$1$2e$0$2e$0$2d$rc$2e$3$2f$node_modules$2f40$swagger$2d$api$2f$apidom$2d$error$2f$src$2f$NotImplementedError$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__NotImplementedError$3e$__["NotImplementedError"]('latest method in MediaTypes class is not yet implemented.');
    }
}
const __TURBOPACK__default__export__ = MediaTypes;
}),
"[project]/node_modules/.pnpm/@swagger-api+apidom-core@1.0.0-rc.3/node_modules/@swagger-api/apidom-core/src/media-types.mjs [app-client] (ecmascript) <export default as MediaTypes>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MediaTypes",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swagger$2d$api$2b$apidom$2d$core$40$1$2e$0$2e$0$2d$rc$2e$3$2f$node_modules$2f40$swagger$2d$api$2f$apidom$2d$core$2f$src$2f$media$2d$types$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swagger$2d$api$2b$apidom$2d$core$40$1$2e$0$2e$0$2d$rc$2e$3$2f$node_modules$2f40$swagger$2d$api$2f$apidom$2d$core$2f$src$2f$media$2d$types$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@swagger-api+apidom-core@1.0.0-rc.3/node_modules/@swagger-api/apidom-core/src/media-types.mjs [app-client] (ecmascript)");
}),
"[project]/node_modules/.pnpm/@swagger-api+apidom-core@1.0.0-rc.3/node_modules/@swagger-api/apidom-core/src/namespace.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Namespace",
    ()=>Namespace,
    "createNamespace",
    ()=>createNamespace,
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$minim$40$0$2e$23$2e$8$2f$node_modules$2f$minim$2f$lib$2f$minim$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/minim@0.23.8/node_modules/minim/lib/minim.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$ramda$2d$adjunct$40$5$2e$1$2e$0_ramda$40$0$2e$30$2e$1$2f$node_modules$2f$ramda$2d$adjunct$2f$es$2f$isPlainObj$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__isPlainObject$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/ramda-adjunct@5.1.0_ramda@0.30.1/node_modules/ramda-adjunct/es/isPlainObj.js [app-client] (ecmascript) <export default as isPlainObject>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swagger$2d$api$2b$apidom$2d$core$40$1$2e$0$2e$0$2d$rc$2e$3$2f$node_modules$2f40$swagger$2d$api$2f$apidom$2d$core$2f$src$2f$elements$2f$Annotation$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@swagger-api+apidom-core@1.0.0-rc.3/node_modules/@swagger-api/apidom-core/src/elements/Annotation.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swagger$2d$api$2b$apidom$2d$core$40$1$2e$0$2e$0$2d$rc$2e$3$2f$node_modules$2f40$swagger$2d$api$2f$apidom$2d$core$2f$src$2f$elements$2f$Comment$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@swagger-api+apidom-core@1.0.0-rc.3/node_modules/@swagger-api/apidom-core/src/elements/Comment.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swagger$2d$api$2b$apidom$2d$core$40$1$2e$0$2e$0$2d$rc$2e$3$2f$node_modules$2f40$swagger$2d$api$2f$apidom$2d$core$2f$src$2f$elements$2f$ParseResult$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@swagger-api+apidom-core@1.0.0-rc.3/node_modules/@swagger-api/apidom-core/src/elements/ParseResult.mjs [app-client] (ecmascript)");
;
;
;
;
;
class Namespace extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$minim$40$0$2e$23$2e$8$2f$node_modules$2f$minim$2f$lib$2f$minim$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Namespace"] {
    constructor(){
        super();
        this.register('annotation', __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swagger$2d$api$2b$apidom$2d$core$40$1$2e$0$2e$0$2d$rc$2e$3$2f$node_modules$2f40$swagger$2d$api$2f$apidom$2d$core$2f$src$2f$elements$2f$Annotation$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]);
        this.register('comment', __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swagger$2d$api$2b$apidom$2d$core$40$1$2e$0$2e$0$2d$rc$2e$3$2f$node_modules$2f40$swagger$2d$api$2f$apidom$2d$core$2f$src$2f$elements$2f$Comment$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]);
        this.register('parseResult', __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swagger$2d$api$2b$apidom$2d$core$40$1$2e$0$2e$0$2d$rc$2e$3$2f$node_modules$2f40$swagger$2d$api$2f$apidom$2d$core$2f$src$2f$elements$2f$ParseResult$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]);
    }
}
/**
 * @public
 */ const namespace = new Namespace();
const createNamespace = (namespacePlugin)=>{
    const namespaceInstance = new Namespace();
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$ramda$2d$adjunct$40$5$2e$1$2e$0_ramda$40$0$2e$30$2e$1$2f$node_modules$2f$ramda$2d$adjunct$2f$es$2f$isPlainObj$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__isPlainObject$3e$__["isPlainObject"])(namespacePlugin)) {
        namespaceInstance.use(namespacePlugin);
    }
    return namespaceInstance;
};
const __TURBOPACK__default__export__ = namespace;
}),
"[project]/node_modules/.pnpm/@swagger-api+apidom-core@1.0.0-rc.3/node_modules/@swagger-api/apidom-core/src/transformers/from.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$ramda$40$0$2e$30$2e$1$2f$node_modules$2f$ramda$2f$es$2f$has$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__has$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/ramda@0.30.1/node_modules/ramda/es/has.js [app-client] (ecmascript) <export default as has>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$ramda$2d$adjunct$40$5$2e$1$2e$0_ramda$40$0$2e$30$2e$1$2f$node_modules$2f$ramda$2d$adjunct$2f$es$2f$isPlainObj$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__isPlainObject$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/ramda-adjunct@5.1.0_ramda@0.30.1/node_modules/ramda-adjunct/es/isPlainObj.js [app-client] (ecmascript) <export default as isPlainObject>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$ramda$2d$adjunct$40$5$2e$1$2e$0_ramda$40$0$2e$30$2e$1$2f$node_modules$2f$ramda$2d$adjunct$2f$es$2f$isString$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__isString$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/ramda-adjunct@5.1.0_ramda@0.30.1/node_modules/ramda-adjunct/es/isString.js [app-client] (ecmascript) <export default as isString>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swagger$2d$api$2b$apidom$2d$core$40$1$2e$0$2e$0$2d$rc$2e$3$2f$node_modules$2f40$swagger$2d$api$2f$apidom$2d$core$2f$src$2f$namespace$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@swagger-api+apidom-core@1.0.0-rc.3/node_modules/@swagger-api/apidom-core/src/namespace.mjs [app-client] (ecmascript)");
;
;
;
/**
 * Transforms data to an Element from a particular namespace.
 *
 * The name of the function was originally `from`,
 * but it was renamed to `fromFn` to avoid issues with Parcel.js:
 *
 * - https://github.com/parcel-bundler/parcel/issues/9473
 * - https://github.com/swagger-api/swagger-ui/issues/9466#issuecomment-1881053410
 * @public
 */ const fromFn = (data, namespace = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swagger$2d$api$2b$apidom$2d$core$40$1$2e$0$2e$0$2d$rc$2e$3$2f$node_modules$2f40$swagger$2d$api$2f$apidom$2d$core$2f$src$2f$namespace$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])=>{
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$ramda$2d$adjunct$40$5$2e$1$2e$0_ramda$40$0$2e$30$2e$1$2f$node_modules$2f$ramda$2d$adjunct$2f$es$2f$isString$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__isString$3e$__["isString"])(data)) {
        // JSON serialized refract
        try {
            return namespace.fromRefract(JSON.parse(data));
        } catch  {
        // noop
        }
    }
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$ramda$2d$adjunct$40$5$2e$1$2e$0_ramda$40$0$2e$30$2e$1$2f$node_modules$2f$ramda$2d$adjunct$2f$es$2f$isPlainObj$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__isPlainObject$3e$__["isPlainObject"])(data) && (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$ramda$40$0$2e$30$2e$1$2f$node_modules$2f$ramda$2f$es$2f$has$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__has$3e$__["has"])('element', data)) {
        // refract javascript structure
        return namespace.fromRefract(data);
    }
    return namespace.toElement(data);
};
const __TURBOPACK__default__export__ = fromFn;
}),
"[project]/node_modules/.pnpm/@swagger-api+apidom-core@1.0.0-rc.3/node_modules/@swagger-api/apidom-core/src/transformers/from.mjs [app-client] (ecmascript) <export default as from>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "from",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swagger$2d$api$2b$apidom$2d$core$40$1$2e$0$2e$0$2d$rc$2e$3$2f$node_modules$2f40$swagger$2d$api$2f$apidom$2d$core$2f$src$2f$transformers$2f$from$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swagger$2d$api$2b$apidom$2d$core$40$1$2e$0$2e$0$2d$rc$2e$3$2f$node_modules$2f40$swagger$2d$api$2f$apidom$2d$core$2f$src$2f$transformers$2f$from$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@swagger-api+apidom-core@1.0.0-rc.3/node_modules/@swagger-api/apidom-core/src/transformers/from.mjs [app-client] (ecmascript)");
}),
"[project]/node_modules/.pnpm/@swagger-api+apidom-core@1.0.0-rc.3/node_modules/@swagger-api/apidom-core/src/traversal/visitor.mjs [app-client] (ecmascript) <locals> <export keyMapDefault as keyMap>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "keyMap",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swagger$2d$api$2b$apidom$2d$core$40$1$2e$0$2e$0$2d$rc$2e$3$2f$node_modules$2f40$swagger$2d$api$2f$apidom$2d$core$2f$src$2f$traversal$2f$visitor$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["keyMapDefault"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swagger$2d$api$2b$apidom$2d$core$40$1$2e$0$2e$0$2d$rc$2e$3$2f$node_modules$2f40$swagger$2d$api$2f$apidom$2d$core$2f$src$2f$traversal$2f$visitor$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@swagger-api+apidom-core@1.0.0-rc.3/node_modules/@swagger-api/apidom-core/src/traversal/visitor.mjs [app-client] (ecmascript) <locals>");
}),
"[project]/node_modules/.pnpm/@swagger-api+apidom-core@1.0.0-rc.3/node_modules/@swagger-api/apidom-core/src/predicates/helpers.mjs [app-client] (ecmascript) <export default as createPredicate>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createPredicate",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swagger$2d$api$2b$apidom$2d$core$40$1$2e$0$2e$0$2d$rc$2e$3$2f$node_modules$2f40$swagger$2d$api$2f$apidom$2d$core$2f$src$2f$predicates$2f$helpers$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swagger$2d$api$2b$apidom$2d$core$40$1$2e$0$2e$0$2d$rc$2e$3$2f$node_modules$2f40$swagger$2d$api$2f$apidom$2d$core$2f$src$2f$predicates$2f$helpers$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@swagger-api+apidom-core@1.0.0-rc.3/node_modules/@swagger-api/apidom-core/src/predicates/helpers.mjs [app-client] (ecmascript)");
}),
"[project]/node_modules/.pnpm/@swagger-api+apidom-core@1.0.0-rc.3/node_modules/@swagger-api/apidom-core/src/identity/errors/ElementIdentityError.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swagger$2d$api$2b$apidom$2d$error$40$1$2e$0$2e$0$2d$rc$2e$3$2f$node_modules$2f40$swagger$2d$api$2f$apidom$2d$error$2f$src$2f$ApiDOMStructuredError$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ApiDOMStructuredError$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@swagger-api+apidom-error@1.0.0-rc.3/node_modules/@swagger-api/apidom-error/src/ApiDOMStructuredError.mjs [app-client] (ecmascript) <export default as ApiDOMStructuredError>");
;
/**
 * @public
 */ /**
 * @public
 */ class ElementIdentityError extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swagger$2d$api$2b$apidom$2d$error$40$1$2e$0$2e$0$2d$rc$2e$3$2f$node_modules$2f40$swagger$2d$api$2f$apidom$2d$error$2f$src$2f$ApiDOMStructuredError$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ApiDOMStructuredError$3e$__["ApiDOMStructuredError"] {
    value;
    constructor(message, structuredOptions){
        super(message, structuredOptions);
        if (typeof structuredOptions !== 'undefined') {
            this.value = structuredOptions.value;
        }
    }
}
const __TURBOPACK__default__export__ = ElementIdentityError;
}),
"[project]/node_modules/.pnpm/@swagger-api+apidom-core@1.0.0-rc.3/node_modules/@swagger-api/apidom-core/src/identity/index.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "IdentityManager",
    ()=>IdentityManager,
    "defaultIdentityManager",
    ()=>defaultIdentityManager
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$minim$40$0$2e$23$2e$8$2f$node_modules$2f$minim$2f$lib$2f$minim$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/minim@0.23.8/node_modules/minim/lib/minim.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$short$2d$unique$2d$id$40$5$2e$3$2e$2$2f$node_modules$2f$short$2d$unique$2d$id$2f$dist$2f$short$2d$unique$2d$id$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/short-unique-id@5.3.2/node_modules/short-unique-id/dist/short-unique-id.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swagger$2d$api$2b$apidom$2d$core$40$1$2e$0$2e$0$2d$rc$2e$3$2f$node_modules$2f40$swagger$2d$api$2f$apidom$2d$core$2f$src$2f$identity$2f$errors$2f$ElementIdentityError$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@swagger-api+apidom-core@1.0.0-rc.3/node_modules/@swagger-api/apidom-core/src/identity/errors/ElementIdentityError.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swagger$2d$api$2b$apidom$2d$core$40$1$2e$0$2e$0$2d$rc$2e$3$2f$node_modules$2f40$swagger$2d$api$2f$apidom$2d$core$2f$src$2f$predicates$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@swagger-api+apidom-core@1.0.0-rc.3/node_modules/@swagger-api/apidom-core/src/predicates/index.mjs [app-client] (ecmascript)");
;
;
;
;
class IdentityManager {
    uuid;
    identityMap;
    constructor({ length = 6 } = {}){
        this.uuid = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$short$2d$unique$2d$id$40$5$2e$3$2e$2$2f$node_modules$2f$short$2d$unique$2d$id$2f$dist$2f$short$2d$unique$2d$id$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]({
            length
        });
        this.identityMap = new WeakMap();
    }
    identify(element) {
        if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swagger$2d$api$2b$apidom$2d$core$40$1$2e$0$2e$0$2d$rc$2e$3$2f$node_modules$2f40$swagger$2d$api$2f$apidom$2d$core$2f$src$2f$predicates$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isElement"])(element)) {
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swagger$2d$api$2b$apidom$2d$core$40$1$2e$0$2e$0$2d$rc$2e$3$2f$node_modules$2f40$swagger$2d$api$2f$apidom$2d$core$2f$src$2f$identity$2f$errors$2f$ElementIdentityError$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]('Cannot not identify the element. `element` is neither structurally compatible nor a subclass of an Element class.', {
                value: element
            });
        }
        // use already assigned identity
        if (element.meta.hasKey('id') && (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swagger$2d$api$2b$apidom$2d$core$40$1$2e$0$2e$0$2d$rc$2e$3$2f$node_modules$2f40$swagger$2d$api$2f$apidom$2d$core$2f$src$2f$predicates$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isStringElement"])(element.meta.get('id')) && !element.meta.get('id').equals('')) {
            return element.id;
        }
        // assign identity in immutable way
        if (this.identityMap.has(element)) {
            return this.identityMap.get(element);
        }
        // return element identity
        const id = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$minim$40$0$2e$23$2e$8$2f$node_modules$2f$minim$2f$lib$2f$minim$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StringElement"](this.generateId());
        this.identityMap.set(element, id);
        return id;
    }
    forget(element) {
        if (this.identityMap.has(element)) {
            this.identityMap.delete(element);
            return true;
        }
        return false;
    }
    generateId() {
        return this.uuid.randomUUID();
    }
}
const defaultIdentityManager = new IdentityManager();
}),
"[project]/node_modules/.pnpm/@swagger-api+apidom-core@1.0.0-rc.3/node_modules/@swagger-api/apidom-core/src/traversal/find.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$ramda$40$0$2e$30$2e$1$2f$node_modules$2f$ramda$2f$es$2f$pathOr$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__pathOr$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/ramda@0.30.1/node_modules/ramda/es/pathOr.js [app-client] (ecmascript) <export default as pathOr>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swagger$2d$api$2b$apidom$2d$core$40$1$2e$0$2e$0$2d$rc$2e$3$2f$node_modules$2f40$swagger$2d$api$2f$apidom$2d$core$2f$src$2f$traversal$2f$visitor$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@swagger-api+apidom-core@1.0.0-rc.3/node_modules/@swagger-api/apidom-core/src/traversal/visitor.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swagger$2d$api$2b$apidom$2d$ast$40$1$2e$0$2e$0$2d$rc$2e$3$2f$node_modules$2f40$swagger$2d$api$2f$apidom$2d$ast$2f$src$2f$traversal$2f$visitor$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@swagger-api+apidom-ast@1.0.0-rc.3/node_modules/@swagger-api/apidom-ast/src/traversal/visitor.mjs [app-client] (ecmascript)");
;
;
/**
 * Find first element that satisfies the provided predicate.
 * @public
 */ const find = (predicate, element)=>{
    const visitor = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swagger$2d$api$2b$apidom$2d$core$40$1$2e$0$2e$0$2d$rc$2e$3$2f$node_modules$2f40$swagger$2d$api$2f$apidom$2d$core$2f$src$2f$traversal$2f$visitor$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["PredicateVisitor"]({
        predicate,
        returnOnTrue: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swagger$2d$api$2b$apidom$2d$ast$40$1$2e$0$2e$0$2d$rc$2e$3$2f$node_modules$2f40$swagger$2d$api$2f$apidom$2d$ast$2f$src$2f$traversal$2f$visitor$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BREAK"]
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swagger$2d$api$2b$apidom$2d$core$40$1$2e$0$2e$0$2d$rc$2e$3$2f$node_modules$2f40$swagger$2d$api$2f$apidom$2d$core$2f$src$2f$traversal$2f$visitor$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["visit"])(element, visitor);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$ramda$40$0$2e$30$2e$1$2f$node_modules$2f$ramda$2f$es$2f$pathOr$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__pathOr$3e$__["pathOr"])(undefined, [
        0
    ], visitor.result);
};
const __TURBOPACK__default__export__ = find;
}),
"[project]/node_modules/.pnpm/@swagger-api+apidom-core@1.0.0-rc.3/node_modules/@swagger-api/apidom-core/src/traversal/find.mjs [app-client] (ecmascript) <export default as find>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "find",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swagger$2d$api$2b$apidom$2d$core$40$1$2e$0$2e$0$2d$rc$2e$3$2f$node_modules$2f40$swagger$2d$api$2f$apidom$2d$core$2f$src$2f$traversal$2f$find$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swagger$2d$api$2b$apidom$2d$core$40$1$2e$0$2e$0$2d$rc$2e$3$2f$node_modules$2f40$swagger$2d$api$2f$apidom$2d$core$2f$src$2f$traversal$2f$find$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@swagger-api+apidom-core@1.0.0-rc.3/node_modules/@swagger-api/apidom-core/src/traversal/find.mjs [app-client] (ecmascript)");
}),
"[project]/node_modules/.pnpm/@swagger-api+apidom-core@1.0.0-rc.3/node_modules/@swagger-api/apidom-core/src/traversal/filter.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$minim$40$0$2e$23$2e$8$2f$node_modules$2f$minim$2f$lib$2f$minim$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/minim@0.23.8/node_modules/minim/lib/minim.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swagger$2d$api$2b$apidom$2d$core$40$1$2e$0$2e$0$2d$rc$2e$3$2f$node_modules$2f40$swagger$2d$api$2f$apidom$2d$core$2f$src$2f$traversal$2f$visitor$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@swagger-api+apidom-core@1.0.0-rc.3/node_modules/@swagger-api/apidom-core/src/traversal/visitor.mjs [app-client] (ecmascript) <locals>");
;
;
/**
 * Finds all elements matching the predicate.
 * @public
 */ const filter = (predicate, element)=>{
    const visitor = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swagger$2d$api$2b$apidom$2d$core$40$1$2e$0$2e$0$2d$rc$2e$3$2f$node_modules$2f40$swagger$2d$api$2f$apidom$2d$core$2f$src$2f$traversal$2f$visitor$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["PredicateVisitor"]({
        predicate
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swagger$2d$api$2b$apidom$2d$core$40$1$2e$0$2e$0$2d$rc$2e$3$2f$node_modules$2f40$swagger$2d$api$2f$apidom$2d$core$2f$src$2f$traversal$2f$visitor$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["visit"])(element, visitor);
    return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$minim$40$0$2e$23$2e$8$2f$node_modules$2f$minim$2f$lib$2f$minim$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ArraySlice"](visitor.result);
};
const __TURBOPACK__default__export__ = filter;
}),
"[project]/node_modules/.pnpm/@swagger-api+apidom-core@1.0.0-rc.3/node_modules/@swagger-api/apidom-core/src/traversal/filter.mjs [app-client] (ecmascript) <export default as filter>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "filter",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swagger$2d$api$2b$apidom$2d$core$40$1$2e$0$2e$0$2d$rc$2e$3$2f$node_modules$2f40$swagger$2d$api$2f$apidom$2d$core$2f$src$2f$traversal$2f$filter$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swagger$2d$api$2b$apidom$2d$core$40$1$2e$0$2e$0$2d$rc$2e$3$2f$node_modules$2f40$swagger$2d$api$2f$apidom$2d$core$2f$src$2f$traversal$2f$filter$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@swagger-api+apidom-core@1.0.0-rc.3/node_modules/@swagger-api/apidom-core/src/traversal/filter.mjs [app-client] (ecmascript)");
}),
"[project]/node_modules/.pnpm/@swagger-api+apidom-core@1.0.0-rc.3/node_modules/@swagger-api/apidom-core/src/merge/deepmerge.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__,
    "defaultOptions",
    ()=>defaultOptions,
    "emptyElement",
    ()=>emptyElement
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$minim$40$0$2e$23$2e$8$2f$node_modules$2f$minim$2f$lib$2f$minim$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/minim@0.23.8/node_modules/minim/lib/minim.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swagger$2d$api$2b$apidom$2d$core$40$1$2e$0$2e$0$2d$rc$2e$3$2f$node_modules$2f40$swagger$2d$api$2f$apidom$2d$core$2f$src$2f$predicates$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@swagger-api+apidom-core@1.0.0-rc.3/node_modules/@swagger-api/apidom-core/src/predicates/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swagger$2d$api$2b$apidom$2d$core$40$1$2e$0$2e$0$2d$rc$2e$3$2f$node_modules$2f40$swagger$2d$api$2f$apidom$2d$core$2f$src$2f$clone$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@swagger-api+apidom-core@1.0.0-rc.3/node_modules/@swagger-api/apidom-core/src/clone/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swagger$2d$api$2b$apidom$2d$core$40$1$2e$0$2e$0$2d$rc$2e$3$2f$node_modules$2f40$swagger$2d$api$2f$apidom$2d$core$2f$src$2f$transformers$2f$serializers$2f$value$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@swagger-api+apidom-core@1.0.0-rc.3/node_modules/@swagger-api/apidom-core/src/transformers/serializers/value/index.mjs [app-client] (ecmascript)");
;
;
;
;
const emptyElement = (element)=>{
    const meta = element.meta.length > 0 ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swagger$2d$api$2b$apidom$2d$core$40$1$2e$0$2e$0$2d$rc$2e$3$2f$node_modules$2f40$swagger$2d$api$2f$apidom$2d$core$2f$src$2f$clone$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cloneDeep"])(element.meta) : undefined;
    const attributes = element.attributes.length > 0 ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swagger$2d$api$2b$apidom$2d$core$40$1$2e$0$2e$0$2d$rc$2e$3$2f$node_modules$2f40$swagger$2d$api$2f$apidom$2d$core$2f$src$2f$clone$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cloneDeep"])(element.attributes) : undefined;
    // @ts-ignore
    return new element.constructor(undefined, meta, attributes);
};
const cloneUnlessOtherwiseSpecified = (element, options)=>options.clone && options.isMergeableElement(element) ? deepmerge(emptyElement(element), element, options) : element;
const getMergeFunction = (keyElement, options)=>{
    if (typeof options.customMerge !== 'function') {
        return deepmerge;
    }
    const customMerge = options.customMerge(keyElement, options);
    return typeof customMerge === 'function' ? customMerge : deepmerge;
};
const getMetaMergeFunction = (options)=>{
    if (typeof options.customMetaMerge !== 'function') {
        return (targetMeta)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swagger$2d$api$2b$apidom$2d$core$40$1$2e$0$2e$0$2d$rc$2e$3$2f$node_modules$2f40$swagger$2d$api$2f$apidom$2d$core$2f$src$2f$clone$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cloneDeep"])(targetMeta);
    }
    return options.customMetaMerge;
};
const getAttributesMergeFunction = (options)=>{
    if (typeof options.customAttributesMerge !== 'function') {
        return (targetAttributes)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swagger$2d$api$2b$apidom$2d$core$40$1$2e$0$2e$0$2d$rc$2e$3$2f$node_modules$2f40$swagger$2d$api$2f$apidom$2d$core$2f$src$2f$clone$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cloneDeep"])(targetAttributes);
    }
    return options.customAttributesMerge;
};
const mergeArrayElement = (targetElement, sourceElement, options)=>targetElement.concat(sourceElement)['fantasy-land/map']((item)=>cloneUnlessOtherwiseSpecified(item, options));
const mergeObjectElement = (targetElement, sourceElement, options)=>{
    const destination = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swagger$2d$api$2b$apidom$2d$core$40$1$2e$0$2e$0$2d$rc$2e$3$2f$node_modules$2f40$swagger$2d$api$2f$apidom$2d$core$2f$src$2f$predicates$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isObjectElement"])(targetElement) ? emptyElement(targetElement) : emptyElement(sourceElement);
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swagger$2d$api$2b$apidom$2d$core$40$1$2e$0$2e$0$2d$rc$2e$3$2f$node_modules$2f40$swagger$2d$api$2f$apidom$2d$core$2f$src$2f$predicates$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isObjectElement"])(targetElement)) {
        targetElement.forEach((value, key, member)=>{
            const clonedMember = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swagger$2d$api$2b$apidom$2d$core$40$1$2e$0$2e$0$2d$rc$2e$3$2f$node_modules$2f40$swagger$2d$api$2f$apidom$2d$core$2f$src$2f$clone$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cloneShallow"])(member);
            clonedMember.value = cloneUnlessOtherwiseSpecified(value, options);
            destination.content.push(clonedMember);
        });
    }
    sourceElement.forEach((value, key, member)=>{
        const keyValue = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swagger$2d$api$2b$apidom$2d$core$40$1$2e$0$2e$0$2d$rc$2e$3$2f$node_modules$2f40$swagger$2d$api$2f$apidom$2d$core$2f$src$2f$transformers$2f$serializers$2f$value$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(key);
        let clonedMember;
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swagger$2d$api$2b$apidom$2d$core$40$1$2e$0$2e$0$2d$rc$2e$3$2f$node_modules$2f40$swagger$2d$api$2f$apidom$2d$core$2f$src$2f$predicates$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isObjectElement"])(targetElement) && targetElement.hasKey(keyValue) && options.isMergeableElement(value)) {
            const targetValue = targetElement.get(keyValue);
            clonedMember = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swagger$2d$api$2b$apidom$2d$core$40$1$2e$0$2e$0$2d$rc$2e$3$2f$node_modules$2f40$swagger$2d$api$2f$apidom$2d$core$2f$src$2f$clone$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cloneShallow"])(member);
            clonedMember.value = getMergeFunction(key, options)(targetValue, value, options);
        } else {
            clonedMember = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swagger$2d$api$2b$apidom$2d$core$40$1$2e$0$2e$0$2d$rc$2e$3$2f$node_modules$2f40$swagger$2d$api$2f$apidom$2d$core$2f$src$2f$clone$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cloneShallow"])(member);
            clonedMember.value = cloneUnlessOtherwiseSpecified(value, options);
        }
        destination.remove(keyValue);
        destination.content.push(clonedMember);
    });
    return destination;
};
const defaultOptions = {
    clone: true,
    isMergeableElement: (element)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swagger$2d$api$2b$apidom$2d$core$40$1$2e$0$2e$0$2d$rc$2e$3$2f$node_modules$2f40$swagger$2d$api$2f$apidom$2d$core$2f$src$2f$predicates$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isObjectElement"])(element) || (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swagger$2d$api$2b$apidom$2d$core$40$1$2e$0$2e$0$2d$rc$2e$3$2f$node_modules$2f40$swagger$2d$api$2f$apidom$2d$core$2f$src$2f$predicates$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isArrayElement"])(element),
    arrayElementMerge: mergeArrayElement,
    objectElementMerge: mergeObjectElement,
    customMerge: undefined,
    customMetaMerge: undefined,
    customAttributesMerge: undefined
};
/**
 * @public
 */ const deepmerge = (targetElement, sourceElement, options)=>{
    var _mergedOptions$isMerg, _mergedOptions$arrayE, _mergedOptions$object;
    const mergedOptions = {
        ...defaultOptions,
        ...options
    };
    mergedOptions.isMergeableElement = (_mergedOptions$isMerg = mergedOptions.isMergeableElement) !== null && _mergedOptions$isMerg !== void 0 ? _mergedOptions$isMerg : defaultOptions.isMergeableElement;
    mergedOptions.arrayElementMerge = (_mergedOptions$arrayE = mergedOptions.arrayElementMerge) !== null && _mergedOptions$arrayE !== void 0 ? _mergedOptions$arrayE : defaultOptions.arrayElementMerge;
    mergedOptions.objectElementMerge = (_mergedOptions$object = mergedOptions.objectElementMerge) !== null && _mergedOptions$object !== void 0 ? _mergedOptions$object : defaultOptions.objectElementMerge;
    const sourceIsArrayElement = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swagger$2d$api$2b$apidom$2d$core$40$1$2e$0$2e$0$2d$rc$2e$3$2f$node_modules$2f40$swagger$2d$api$2f$apidom$2d$core$2f$src$2f$predicates$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isArrayElement"])(sourceElement);
    const targetIsArrayElement = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swagger$2d$api$2b$apidom$2d$core$40$1$2e$0$2e$0$2d$rc$2e$3$2f$node_modules$2f40$swagger$2d$api$2f$apidom$2d$core$2f$src$2f$predicates$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isArrayElement"])(targetElement);
    const sourceAndTargetTypesMatch = sourceIsArrayElement === targetIsArrayElement;
    if (!sourceAndTargetTypesMatch) {
        return cloneUnlessOtherwiseSpecified(sourceElement, mergedOptions);
    }
    // merging two elements
    const mergedElement = sourceIsArrayElement && typeof mergedOptions.arrayElementMerge === 'function' ? mergedOptions.arrayElementMerge(targetElement, sourceElement, mergedOptions) : mergedOptions.objectElementMerge(targetElement, sourceElement, mergedOptions);
    // merging meta & attributes
    mergedElement.meta = getMetaMergeFunction(mergedOptions)(targetElement.meta, sourceElement.meta);
    mergedElement.attributes = getAttributesMergeFunction(mergedOptions)(targetElement.attributes, sourceElement.attributes);
    return mergedElement;
};
deepmerge.all = (list, options)=>{
    if (!Array.isArray(list)) {
        throw new TypeError('First argument of deepmerge should be an array.');
    }
    if (list.length === 0) {
        return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$minim$40$0$2e$23$2e$8$2f$node_modules$2f$minim$2f$lib$2f$minim$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ObjectElement"]();
    }
    return list.reduce((target, source)=>{
        return deepmerge(target, source, options);
    }, emptyElement(list[0]));
};
const __TURBOPACK__default__export__ = deepmerge;
 /* eslint-enable @typescript-eslint/no-use-before-define */ }),
"[project]/node_modules/.pnpm/@swagger-api+apidom-core@1.0.0-rc.3/node_modules/@swagger-api/apidom-core/src/merge/deepmerge.mjs [app-client] (ecmascript) <export default as deepmerge>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "deepmerge",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swagger$2d$api$2b$apidom$2d$core$40$1$2e$0$2e$0$2d$rc$2e$3$2f$node_modules$2f40$swagger$2d$api$2f$apidom$2d$core$2f$src$2f$merge$2f$deepmerge$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swagger$2d$api$2b$apidom$2d$core$40$1$2e$0$2e$0$2d$rc$2e$3$2f$node_modules$2f40$swagger$2d$api$2f$apidom$2d$core$2f$src$2f$merge$2f$deepmerge$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@swagger-api+apidom-core@1.0.0-rc.3/node_modules/@swagger-api/apidom-core/src/merge/deepmerge.mjs [app-client] (ecmascript)");
}),
"[project]/node_modules/.pnpm/@swagger-api+apidom-core@1.0.0-rc.3/node_modules/@swagger-api/apidom-core/src/refractor/toolbox.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swagger$2d$api$2b$apidom$2d$core$40$1$2e$0$2e$0$2d$rc$2e$3$2f$node_modules$2f40$swagger$2d$api$2f$apidom$2d$core$2f$src$2f$predicates$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@swagger-api+apidom-core@1.0.0-rc.3/node_modules/@swagger-api/apidom-core/src/predicates/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swagger$2d$api$2b$apidom$2d$core$40$1$2e$0$2e$0$2d$rc$2e$3$2f$node_modules$2f40$swagger$2d$api$2f$apidom$2d$core$2f$src$2f$namespace$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@swagger-api+apidom-core@1.0.0-rc.3/node_modules/@swagger-api/apidom-core/src/namespace.mjs [app-client] (ecmascript)");
;
;
/**
 * @public
 */ /**
 * @public
 */ /**
 * @public
 */ const createToolbox = ()=>{
    const predicates = {
        ...__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swagger$2d$api$2b$apidom$2d$core$40$1$2e$0$2e$0$2d$rc$2e$3$2f$node_modules$2f40$swagger$2d$api$2f$apidom$2d$core$2f$src$2f$predicates$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__
    };
    return {
        predicates,
        namespace: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swagger$2d$api$2b$apidom$2d$core$40$1$2e$0$2e$0$2d$rc$2e$3$2f$node_modules$2f40$swagger$2d$api$2f$apidom$2d$core$2f$src$2f$namespace$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
    };
};
const __TURBOPACK__default__export__ = createToolbox;
}),
"[project]/node_modules/.pnpm/@swagger-api+apidom-core@1.0.0-rc.3/node_modules/@swagger-api/apidom-core/src/refractor/plugins/dispatcher/index.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "dispatchPluginsAsync",
    ()=>dispatchPluginsAsync,
    "dispatchPluginsSync",
    ()=>dispatchPluginsSync
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$ramda$40$0$2e$30$2e$1$2f$node_modules$2f$ramda$2f$es$2f$mergeDeepRight$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__mergeDeepRight$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/ramda@0.30.1/node_modules/ramda/es/mergeDeepRight.js [app-client] (ecmascript) <export default as mergeDeepRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$ramda$40$0$2e$30$2e$1$2f$node_modules$2f$ramda$2f$es$2f$propOr$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__propOr$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/ramda@0.30.1/node_modules/ramda/es/propOr.js [app-client] (ecmascript) <export default as propOr>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$ramda$2d$adjunct$40$5$2e$1$2e$0_ramda$40$0$2e$30$2e$1$2f$node_modules$2f$ramda$2d$adjunct$2f$es$2f$invokeArgs$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__invokeArgs$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/ramda-adjunct@5.1.0_ramda@0.30.1/node_modules/ramda-adjunct/es/invokeArgs.js [app-client] (ecmascript) <export default as invokeArgs>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swagger$2d$api$2b$apidom$2d$core$40$1$2e$0$2e$0$2d$rc$2e$3$2f$node_modules$2f40$swagger$2d$api$2f$apidom$2d$core$2f$src$2f$refractor$2f$toolbox$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@swagger-api+apidom-core@1.0.0-rc.3/node_modules/@swagger-api/apidom-core/src/refractor/toolbox.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swagger$2d$api$2b$apidom$2d$core$40$1$2e$0$2e$0$2d$rc$2e$3$2f$node_modules$2f40$swagger$2d$api$2f$apidom$2d$core$2f$src$2f$traversal$2f$visitor$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@swagger-api+apidom-core@1.0.0-rc.3/node_modules/@swagger-api/apidom-core/src/traversal/visitor.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swagger$2d$api$2b$apidom$2d$ast$40$1$2e$0$2e$0$2d$rc$2e$3$2f$node_modules$2f40$swagger$2d$api$2f$apidom$2d$ast$2f$src$2f$traversal$2f$visitor$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__mergeAll__as__mergeAllVisitors$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@swagger-api+apidom-ast@1.0.0-rc.3/node_modules/@swagger-api/apidom-ast/src/traversal/visitor.mjs [app-client] (ecmascript) <export mergeAll as mergeAllVisitors>");
;
;
;
;
/**
 * @public
 */ /**
 * @public
 */ /**
 * @public
 */ const defaultDispatchPluginsOptions = {
    toolboxCreator: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swagger$2d$api$2b$apidom$2d$core$40$1$2e$0$2e$0$2d$rc$2e$3$2f$node_modules$2f40$swagger$2d$api$2f$apidom$2d$core$2f$src$2f$refractor$2f$toolbox$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
    visitorOptions: {
        nodeTypeGetter: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swagger$2d$api$2b$apidom$2d$core$40$1$2e$0$2e$0$2d$rc$2e$3$2f$node_modules$2f40$swagger$2d$api$2f$apidom$2d$core$2f$src$2f$traversal$2f$visitor$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["getNodeType"],
        exposeEdits: true
    }
};
const dispatchPluginsSync = (element, plugins, options = {})=>{
    if (plugins.length === 0) return element;
    const mergedOptions = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$ramda$40$0$2e$30$2e$1$2f$node_modules$2f$ramda$2f$es$2f$mergeDeepRight$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__mergeDeepRight$3e$__["mergeDeepRight"])(defaultDispatchPluginsOptions, options);
    const { toolboxCreator, visitorOptions } = mergedOptions;
    const toolbox = toolboxCreator();
    const pluginsSpecs = plugins.map((plugin)=>plugin(toolbox));
    const mergedPluginsVisitor = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swagger$2d$api$2b$apidom$2d$ast$40$1$2e$0$2e$0$2d$rc$2e$3$2f$node_modules$2f40$swagger$2d$api$2f$apidom$2d$ast$2f$src$2f$traversal$2f$visitor$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__mergeAll__as__mergeAllVisitors$3e$__["mergeAllVisitors"])(pluginsSpecs.map((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$ramda$40$0$2e$30$2e$1$2f$node_modules$2f$ramda$2f$es$2f$propOr$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__propOr$3e$__["propOr"])({}, 'visitor')), {
        ...visitorOptions
    });
    pluginsSpecs.forEach((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$ramda$2d$adjunct$40$5$2e$1$2e$0_ramda$40$0$2e$30$2e$1$2f$node_modules$2f$ramda$2d$adjunct$2f$es$2f$invokeArgs$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__invokeArgs$3e$__["invokeArgs"])([
        'pre'
    ], []));
    const newElement = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swagger$2d$api$2b$apidom$2d$core$40$1$2e$0$2e$0$2d$rc$2e$3$2f$node_modules$2f40$swagger$2d$api$2f$apidom$2d$core$2f$src$2f$traversal$2f$visitor$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["visit"])(element, mergedPluginsVisitor, visitorOptions);
    pluginsSpecs.forEach((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$ramda$2d$adjunct$40$5$2e$1$2e$0_ramda$40$0$2e$30$2e$1$2f$node_modules$2f$ramda$2d$adjunct$2f$es$2f$invokeArgs$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__invokeArgs$3e$__["invokeArgs"])([
        'post'
    ], []));
    return newElement;
};
const dispatchPluginsAsync = async (element, plugins, options = {})=>{
    if (plugins.length === 0) return element;
    const mergedOptions = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$ramda$40$0$2e$30$2e$1$2f$node_modules$2f$ramda$2f$es$2f$mergeDeepRight$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__mergeDeepRight$3e$__["mergeDeepRight"])(defaultDispatchPluginsOptions, options);
    const { toolboxCreator, visitorOptions } = mergedOptions;
    const toolbox = toolboxCreator();
    const pluginsSpecs = plugins.map((plugin)=>plugin(toolbox));
    const mergeAllVisitorsAsync = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swagger$2d$api$2b$apidom$2d$ast$40$1$2e$0$2e$0$2d$rc$2e$3$2f$node_modules$2f40$swagger$2d$api$2f$apidom$2d$ast$2f$src$2f$traversal$2f$visitor$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__mergeAll__as__mergeAllVisitors$3e$__["mergeAllVisitors"][Symbol.for('nodejs.util.promisify.custom')];
    const visitAsync = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swagger$2d$api$2b$apidom$2d$core$40$1$2e$0$2e$0$2d$rc$2e$3$2f$node_modules$2f40$swagger$2d$api$2f$apidom$2d$core$2f$src$2f$traversal$2f$visitor$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["visit"][Symbol.for('nodejs.util.promisify.custom')];
    const mergedPluginsVisitor = mergeAllVisitorsAsync(pluginsSpecs.map((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$ramda$40$0$2e$30$2e$1$2f$node_modules$2f$ramda$2f$es$2f$propOr$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__propOr$3e$__["propOr"])({}, 'visitor')), {
        ...visitorOptions
    });
    await Promise.allSettled(pluginsSpecs.map((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$ramda$2d$adjunct$40$5$2e$1$2e$0_ramda$40$0$2e$30$2e$1$2f$node_modules$2f$ramda$2d$adjunct$2f$es$2f$invokeArgs$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__invokeArgs$3e$__["invokeArgs"])([
        'pre'
    ], [])));
    const newElement = await visitAsync(element, mergedPluginsVisitor, visitorOptions);
    await Promise.allSettled(pluginsSpecs.map((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$ramda$2d$adjunct$40$5$2e$1$2e$0_ramda$40$0$2e$30$2e$1$2f$node_modules$2f$ramda$2d$adjunct$2f$es$2f$invokeArgs$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__invokeArgs$3e$__["invokeArgs"])([
        'post'
    ], [])));
    return newElement;
};
dispatchPluginsSync[Symbol.for('nodejs.util.promisify.custom')] = dispatchPluginsAsync;
}),
"[project]/node_modules/.pnpm/@swagger-api+apidom-core@1.0.0-rc.3/node_modules/@swagger-api/apidom-core/src/refractor/plugins/dispatcher/index.mjs [app-client] (ecmascript) <export dispatchPluginsSync as dispatchRefractorPlugins>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "dispatchRefractorPlugins",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swagger$2d$api$2b$apidom$2d$core$40$1$2e$0$2e$0$2d$rc$2e$3$2f$node_modules$2f40$swagger$2d$api$2f$apidom$2d$core$2f$src$2f$refractor$2f$plugins$2f$dispatcher$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["dispatchPluginsSync"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swagger$2d$api$2b$apidom$2d$core$40$1$2e$0$2e$0$2d$rc$2e$3$2f$node_modules$2f40$swagger$2d$api$2f$apidom$2d$core$2f$src$2f$refractor$2f$plugins$2f$dispatcher$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@swagger-api+apidom-core@1.0.0-rc.3/node_modules/@swagger-api/apidom-core/src/refractor/plugins/dispatcher/index.mjs [app-client] (ecmascript)");
}),
]);

//# sourceMappingURL=82f16_%40swagger-api_apidom-core_src_39a8d9ea._.js.map