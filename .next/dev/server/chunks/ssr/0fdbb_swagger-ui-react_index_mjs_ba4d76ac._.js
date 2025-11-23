module.exports = [
"[project]/node_modules/.pnpm/swagger-ui-react@5.30.2_@ty_8a3e577a169eea83f0fe5a32c2575030/node_modules/swagger-ui-react/index.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @prettier
 */ __turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.3_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$swagger$2d$ui$2d$react$40$5$2e$30$2e$2_$40$ty_8a3e577a169eea83f0fe5a32c2575030$2f$node_modules$2f$swagger$2d$ui$2d$react$2f$swagger$2d$ui$2d$bundle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/swagger-ui-react@5.30.2_@ty_8a3e577a169eea83f0fe5a32c2575030/node_modules/swagger-ui-react/swagger-ui-bundle.js [app-ssr] (ecmascript)");
"use client";
;
;
;
const { config } = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$swagger$2d$ui$2d$react$40$5$2e$30$2e$2_$40$ty_8a3e577a169eea83f0fe5a32c2575030$2f$node_modules$2f$swagger$2d$ui$2d$react$2f$swagger$2d$ui$2d$bundle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"];
const usePrevious = (value)=>{
    const ref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        ref.current = value;
    }, [
        value
    ]);
    return ref.current;
};
const SwaggerUI = ({ spec = config.defaults.spec, url = config.defaults.url, layout = config.defaults.layout, requestInterceptor = config.defaults.requestInterceptor, responseInterceptor = config.defaults.responseInterceptor, supportedSubmitMethods = config.defaults.supportedSubmitMethods, queryConfigEnabled = config.defaults.queryConfigEnabled, plugins = config.defaults.plugins, displayOperationId = config.defaults.displayOperationId, showMutatedRequest = config.defaults.showMutatedRequest, docExpansion = config.defaults.docExpansion, defaultModelExpandDepth = config.defaults.defaultModelExpandDepth, defaultModelsExpandDepth = config.defaults.defaultModelsExpandDepth, defaultModelRendering = config.defaults.defaultModelRendering, presets = config.defaults.presets, deepLinking = config.defaults.deepLinking, showExtensions = config.defaults.showExtensions, showCommonExtensions = config.defaults.showCommonExtensions, filter = config.defaults.filter, requestSnippetsEnabled = config.defaults.requestSnippetsEnabled, requestSnippets = config.defaults.requestSnippets, tryItOutEnabled = config.defaults.tryItOutEnabled, displayRequestDuration = config.defaults.displayRequestDuration, withCredentials = config.defaults.withCredentials, persistAuthorization = config.defaults.persistAuthorization, oauth2RedirectUrl = config.defaults.oauth2RedirectUrl, onComplete = null, initialState = config.defaults.initialState, uncaughtExceptionHandler = config.defaults.uncaughtExceptionHandler })=>{
    const [system, setSystem] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const SwaggerUIComponent = system?.getComponent("App", "root");
    const prevSpec = usePrevious(spec);
    const prevUrl = usePrevious(url);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const systemInstance = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$swagger$2d$ui$2d$react$40$5$2e$30$2e$2_$40$ty_8a3e577a169eea83f0fe5a32c2575030$2f$node_modules$2f$swagger$2d$ui$2d$react$2f$swagger$2d$ui$2d$bundle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])({
            plugins,
            spec,
            url,
            layout,
            defaultModelsExpandDepth,
            defaultModelRendering,
            presets: [
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$swagger$2d$ui$2d$react$40$5$2e$30$2e$2_$40$ty_8a3e577a169eea83f0fe5a32c2575030$2f$node_modules$2f$swagger$2d$ui$2d$react$2f$swagger$2d$ui$2d$bundle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].presets.apis,
                ...presets
            ],
            requestInterceptor,
            responseInterceptor,
            onComplete: ()=>{
                if (typeof onComplete === "function") {
                    onComplete(systemInstance);
                }
            },
            docExpansion,
            supportedSubmitMethods,
            queryConfigEnabled,
            defaultModelExpandDepth,
            displayOperationId,
            tryItOutEnabled,
            displayRequestDuration,
            requestSnippetsEnabled,
            requestSnippets,
            showMutatedRequest,
            deepLinking,
            showExtensions,
            showCommonExtensions,
            filter,
            persistAuthorization,
            withCredentials,
            initialState,
            uncaughtExceptionHandler,
            ...typeof oauth2RedirectUrl === "string" ? {
                oauth2RedirectUrl: oauth2RedirectUrl
            } : {}
        });
        setSystem(systemInstance);
    }, []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (system) {
            const prevStateUrl = system.specSelectors.url();
            if (url !== prevStateUrl || url !== prevUrl) {
                system.specActions.updateSpec("");
                if (url) {
                    system.specActions.updateUrl(url);
                    system.specActions.download(url);
                }
            }
        }
    }, [
        system,
        url
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (system) {
            const prevStateSpec = system.specSelectors.specStr();
            if (spec && spec !== __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$swagger$2d$ui$2d$react$40$5$2e$30$2e$2_$40$ty_8a3e577a169eea83f0fe5a32c2575030$2f$node_modules$2f$swagger$2d$ui$2d$react$2f$swagger$2d$ui$2d$bundle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].config.defaults.spec && (spec !== prevStateSpec || spec !== prevSpec)) {
                const updatedSpec = typeof spec === "object" ? JSON.stringify(spec) : spec;
                system.specActions.updateSpec(updatedSpec);
            }
        }
    }, [
        system,
        spec
    ]);
    return SwaggerUIComponent ? /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createElement(SwaggerUIComponent, null) : null;
};
SwaggerUI.System = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$swagger$2d$ui$2d$react$40$5$2e$30$2e$2_$40$ty_8a3e577a169eea83f0fe5a32c2575030$2f$node_modules$2f$swagger$2d$ui$2d$react$2f$swagger$2d$ui$2d$bundle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].System;
SwaggerUI.presets = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$swagger$2d$ui$2d$react$40$5$2e$30$2e$2_$40$ty_8a3e577a169eea83f0fe5a32c2575030$2f$node_modules$2f$swagger$2d$ui$2d$react$2f$swagger$2d$ui$2d$bundle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].presets;
SwaggerUI.plugins = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$swagger$2d$ui$2d$react$40$5$2e$30$2e$2_$40$ty_8a3e577a169eea83f0fe5a32c2575030$2f$node_modules$2f$swagger$2d$ui$2d$react$2f$swagger$2d$ui$2d$bundle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].plugins;
SwaggerUI.config = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$swagger$2d$ui$2d$react$40$5$2e$30$2e$2_$40$ty_8a3e577a169eea83f0fe5a32c2575030$2f$node_modules$2f$swagger$2d$ui$2d$react$2f$swagger$2d$ui$2d$bundle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].config;
const __TURBOPACK__default__export__ = SwaggerUI;
}),
];

//# sourceMappingURL=0fdbb_swagger-ui-react_index_mjs_ba4d76ac._.js.map