module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[project]/lib/api/openapi-spec.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "generateOpenAPISpec",
    ()=>generateOpenAPISpec
]);
function generateOpenAPISpec() {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    return {
        openapi: '3.0.0',
        info: {
            title: 'WECO Issue Tracker API',
            version: '1.0.0',
            description: `
# WECO Issue Tracker REST API

A comprehensive REST API for managing projects, issues, comments, and users in the WECO Issue Tracker.

## Authentication

All API endpoints require authentication using an API key. Include your API key in the \`Authorization\` header:

\`\`\`
Authorization: Bearer weco_live_your_api_key_here
\`\`\`

You can generate API keys from the Admin Dashboard at \`/admin/api-keys\`.

## Rate Limiting

Each API key has a monthly request limit (default: 10,000 requests/month). The current usage is tracked and returned in response headers.

## Base URL

\`${baseUrl}\`
      `.trim(),
            contact: {
                name: 'API Support',
                email: 'support@colibria.com'
            }
        },
        servers: baseUrl === 'http://localhost:3000' ? [
            {
                url: 'http://localhost:3000',
                description: 'Development server'
            }
        ] : [
            {
                url: baseUrl,
                description: 'Production server'
            },
            {
                url: 'http://localhost:3000',
                description: 'Development server'
            }
        ],
        components: {
            securitySchemes: {
                ApiKeyAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'API Key',
                    description: 'API key authentication. Format: `Bearer weco_live_...`'
                }
            },
            schemas: {
                Project: {
                    type: 'object',
                    properties: {
                        id: {
                            type: 'string',
                            format: 'uuid',
                            description: 'Project ID'
                        },
                        name: {
                            type: 'string',
                            description: 'Project name'
                        },
                        description: {
                            type: 'string',
                            nullable: true,
                            description: 'Project description'
                        },
                        owner_id: {
                            type: 'string',
                            format: 'uuid',
                            nullable: true,
                            description: 'Project owner user ID'
                        },
                        created_at: {
                            type: 'string',
                            format: 'date-time',
                            description: 'Creation timestamp'
                        },
                        updated_at: {
                            type: 'string',
                            format: 'date-time',
                            nullable: true,
                            description: 'Last update timestamp'
                        }
                    },
                    required: [
                        'id',
                        'name',
                        'created_at'
                    ]
                },
                Issue: {
                    type: 'object',
                    properties: {
                        id: {
                            type: 'string',
                            format: 'uuid',
                            description: 'Issue ID'
                        },
                        project_id: {
                            type: 'string',
                            format: 'uuid',
                            description: 'Parent project ID'
                        },
                        title: {
                            type: 'string',
                            description: 'Issue title'
                        },
                        description: {
                            type: 'string',
                            nullable: true,
                            description: 'Issue description'
                        },
                        status: {
                            type: 'string',
                            enum: [
                                'open',
                                'in_progress',
                                'closed'
                            ],
                            description: 'Issue status'
                        },
                        priority: {
                            type: 'string',
                            enum: [
                                'low',
                                'medium',
                                'high',
                                'critical'
                            ],
                            description: 'Issue priority'
                        },
                        screenshot_url: {
                            type: 'string',
                            nullable: true,
                            description: 'URL to screenshot'
                        },
                        created_at: {
                            type: 'string',
                            format: 'date-time',
                            description: 'Creation timestamp'
                        },
                        updated_at: {
                            type: 'string',
                            format: 'date-time',
                            nullable: true,
                            description: 'Last update timestamp'
                        }
                    },
                    required: [
                        'id',
                        'project_id',
                        'title',
                        'status',
                        'priority',
                        'created_at'
                    ]
                },
                Comment: {
                    type: 'object',
                    properties: {
                        id: {
                            type: 'string',
                            format: 'uuid',
                            description: 'Comment ID'
                        },
                        issue_id: {
                            type: 'string',
                            format: 'uuid',
                            description: 'Parent issue ID'
                        },
                        user_id: {
                            type: 'string',
                            format: 'uuid',
                            description: 'Author user ID'
                        },
                        content: {
                            type: 'string',
                            description: 'Comment content'
                        },
                        attachment_url: {
                            type: 'string',
                            nullable: true,
                            description: 'URL to attachment'
                        },
                        attachment_type: {
                            type: 'string',
                            nullable: true,
                            description: 'Attachment MIME type'
                        },
                        created_at: {
                            type: 'string',
                            format: 'date-time',
                            description: 'Creation timestamp'
                        }
                    },
                    required: [
                        'id',
                        'issue_id',
                        'user_id',
                        'content',
                        'created_at'
                    ]
                },
                User: {
                    type: 'object',
                    properties: {
                        id: {
                            type: 'string',
                            format: 'uuid',
                            description: 'User ID'
                        },
                        email: {
                            type: 'string',
                            format: 'email',
                            description: 'User email'
                        },
                        full_name: {
                            type: 'string',
                            nullable: true,
                            description: 'Full name'
                        },
                        role: {
                            type: 'string',
                            enum: [
                                'user',
                                'support',
                                'admin'
                            ],
                            description: 'User role'
                        },
                        is_active: {
                            type: 'boolean',
                            description: 'Account active status'
                        },
                        avatar_url: {
                            type: 'string',
                            nullable: true,
                            description: 'Profile picture URL'
                        },
                        created_at: {
                            type: 'string',
                            format: 'date-time',
                            description: 'Creation timestamp'
                        }
                    },
                    required: [
                        'id',
                        'email',
                        'role',
                        'is_active',
                        'created_at'
                    ]
                },
                Error: {
                    type: 'object',
                    properties: {
                        error: {
                            type: 'string',
                            description: 'Error message'
                        },
                        message: {
                            type: 'string',
                            description: 'Detailed error description'
                        }
                    },
                    required: [
                        'error'
                    ]
                },
                Pagination: {
                    type: 'object',
                    properties: {
                        page: {
                            type: 'integer',
                            description: 'Current page number'
                        },
                        limit: {
                            type: 'integer',
                            description: 'Items per page'
                        },
                        total: {
                            type: 'integer',
                            description: 'Total number of items'
                        },
                        totalPages: {
                            type: 'integer',
                            description: 'Total number of pages'
                        }
                    }
                }
            }
        },
        security: [
            {
                ApiKeyAuth: []
            }
        ],
        paths: {
            '/api/projects': {
                get: {
                    summary: 'List all projects',
                    description: 'Retrieve a paginated list of all projects',
                    tags: [
                        'Projects'
                    ],
                    parameters: [
                        {
                            name: 'page',
                            in: 'query',
                            description: 'Page number (default: 1)',
                            schema: {
                                type: 'integer',
                                minimum: 1,
                                default: 1
                            }
                        },
                        {
                            name: 'limit',
                            in: 'query',
                            description: 'Items per page (default: 50, max: 100)',
                            schema: {
                                type: 'integer',
                                minimum: 1,
                                maximum: 100,
                                default: 50
                            }
                        }
                    ],
                    responses: {
                        '200': {
                            description: 'Successful response',
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'object',
                                        properties: {
                                            data: {
                                                type: 'array',
                                                items: {
                                                    $ref: '#/components/schemas/Project'
                                                }
                                            },
                                            pagination: {
                                                $ref: '#/components/schemas/Pagination'
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        '401': {
                            description: 'Unauthorized - Invalid or missing API key',
                            content: {
                                'application/json': {
                                    schema: {
                                        $ref: '#/components/schemas/Error'
                                    }
                                }
                            }
                        }
                    }
                },
                post: {
                    summary: 'Create a new project',
                    description: 'Create a new project with the provided details',
                    tags: [
                        'Projects'
                    ],
                    requestBody: {
                        required: true,
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        name: {
                                            type: 'string',
                                            description: 'Project name'
                                        },
                                        description: {
                                            type: 'string',
                                            description: 'Project description'
                                        }
                                    },
                                    required: [
                                        'name'
                                    ]
                                },
                                example: {
                                    name: 'Mobile App',
                                    description: 'Bug tracking for mobile application'
                                }
                            }
                        }
                    },
                    responses: {
                        '201': {
                            description: 'Project created successfully',
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'object',
                                        properties: {
                                            data: {
                                                $ref: '#/components/schemas/Project'
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        '400': {
                            description: 'Bad request - Invalid input',
                            content: {
                                'application/json': {
                                    schema: {
                                        $ref: '#/components/schemas/Error'
                                    }
                                }
                            }
                        },
                        '401': {
                            description: 'Unauthorized',
                            content: {
                                'application/json': {
                                    schema: {
                                        $ref: '#/components/schemas/Error'
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        tags: [
            {
                name: 'Projects',
                description: 'Project management endpoints'
            },
            {
                name: 'Issues',
                description: 'Issue tracking endpoints'
            },
            {
                name: 'Comments',
                description: 'Comment management endpoints'
            },
            {
                name: 'Users',
                description: 'User management endpoints (admin only)'
            }
        ]
    };
}
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[project]/app/api/openapi.json/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$openapi$2d$spec$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/api/openapi-spec.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.3_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/server.js [app-route] (ecmascript)");
;
;
async function GET() {
    const spec = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$openapi$2d$spec$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["generateOpenAPISpec"])();
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(spec, {
        headers: {
            'Content-Type': 'application/json',
            'Content-Disposition': 'attachment; filename="openapi.json"'
        }
    });
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__7f2688fc._.js.map