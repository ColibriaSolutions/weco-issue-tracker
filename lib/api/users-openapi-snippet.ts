'/api/users': {
    get: {
        summary: 'List all users',
            description: 'Retrieve a paginated list of all users (admin only)',
                tags: ['Users'],
                    parameters: [
                        {
                            name: 'page',
                            in: 'query',
                            description: 'Page number (default: 1)',
                            schema: { type: 'integer', minimum: 1, default: 1 }
                        },
                        {
                            name: 'limit',
                            in: 'query',
                            description: 'Items per page (default: 50, max: 100)',
                            schema: { type: 'integer', minimum: 1, maximum: 100, default: 50 }
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
                                        items: { $ref: '#/components/schemas/User' }
                                },
                                pagination: { $ref: '#/components/schemas/Pagination' }
                            }
                        }
                    }
                }
            },
            '403': {
                description: 'Forbidden - Admin access required',
                    content: {
                    'application/json': {
                        schema: { $ref: '#/components/schemas/Error' }
                    }
                }
            }
        }
    },
    post: {
        summary: 'Create a new user',
            description: 'Create a new user account (admin only)',
                tags: ['Users'],
                    requestBody: {
            required: true,
                content: {
                'application/json': {
                    schema: {
                        type: 'object',
                            properties: {
                            email: { type: 'string', format: 'email' },
                            password: { type: 'string', minLength: 6 },
                            full_name: { type: 'string' },
                            role: { type: 'string', enum: ['user', 'support', 'admin'], default: 'user' },
                            department: { type: 'string', description: 'Required for non-admin users' },
                            region: { type: 'string', description: 'Required for non-admin users. One of: CA, TN, CN-SZ, HK, MX, BR' }
                        },
                        required: ['email', 'password']
                    }
                }
            }
        },
        responses: {
            '201': {
                description: 'User created successfully',
                    content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                                properties: {
                                data: { $ref: '#/components/schemas/User' }
                            }
                        }
                    }
                }
            },
            '400': {
                description: 'Bad request - validation error',
                    content: {
                    'application/json': {
                        schema: { $ref: '#/components/schemas/Error' }
                    }
                }
            },
            '403': {
                description: 'Forbidden - Admin access required',
                    content: {
                    'application/json': {
                        schema: { $ref: '#/components/schemas/Error' }
                    }
                }
            }
        }
    }
},
'/api/users/{userId}': {
    get: {
        summary: 'Get user by ID',
            description: 'Retrieve a single user by ID (admin only)',
                tags: ['Users'],
                    parameters: [
                        {
                            name: 'userId',
                            in: 'path',
                            required: true,
                            description: 'User ID',
                            schema: { type: 'string', format: 'uuid' }
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
                                data: { $ref: '#/components/schemas/User' }
                            }
                        }
                    }
                }
            },
            '404': {
                description: 'User not found',
                    content: {
                    'application/json': {
                        schema: { $ref: '#/components/schemas/Error' }
                    }
                }
            },
            '403': {
                description: 'Forbidden - Admin access required',
                    content: {
                    'application/json': {
                        schema: { $ref: '#/components/schemas/Error' }
                    }
                }
            }
        }
    },
    patch: {
        summary: 'Update user',
            description: 'Update user details (admin only)',
                tags: ['Users'],
                    parameters: [
                        {
                            name: 'userId',
                            in: 'path',
                            required: true,
                            description: 'User ID',
                            schema: { type: 'string', format: 'uuid' }
                        }
                    ],
                        requestBody: {
            required: true,
                content: {
                'application/json': {
                    schema: {
                        type: 'object',
                            properties: {
                            full_name: { type: 'string' },
                            role: { type: 'string', enum: ['user', 'support', 'admin'] },
                            is_active: { type: 'boolean' },
                            avatar_url: { type: 'string' },
                            department: { type: 'string' },
                            region: { type: 'string' }
                        }
                    }
                }
            }
        },
        responses: {
            '200': {
                description: 'User updated successfully',
                    content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                                properties: {
                                data: { $ref: '#/components/schemas/User' }
                            }
                        }
                    }
                }
            },
            '400': {
                description: 'Bad request - validation error',
                    content: {
                    'application/json': {
                        schema: { $ref: '#/components/schemas/Error' }
                    }
                }
            },
            '404': {
                description: 'User not found',
                    content: {
                    'application/json': {
                        schema: { $ref: '#/components/schemas/Error' }
                    }
                }
            },
            '403': {
                description: 'Forbidden - Admin access required',
                    content: {
                    'application/json': {
                        schema: { $ref: '#/components/schemas/Error' }
                    }
                }
            }
        }
    },
    delete: {
        summary: 'Delete user',
            description: 'Delete a user account (admin only)',
                tags: ['Users'],
                    parameters: [
                        {
                            name: 'userId',
                            in: 'path',
                            required: true,
                            description: 'User ID',
                            schema: { type: 'string', format: 'uuid' }
                        }
                    ],
                        responses: {
            '200': {
                description: 'User deleted successfully',
                    content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                                properties: {
                                message: { type: 'string' },
                                data: {
                                    type: 'object',
                                        properties: {
                                        id: { type: 'string', format: 'uuid' }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            '404': {
                description: 'User not found',
                    content: {
                    'application/json': {
                        schema: { $ref: '#/components/schemas/Error' }
                    }
                }
            },
            '403': {
                description: 'Forbidden - Admin access required',
                    content: {
                    'application/json': {
                        schema: { $ref: '#/components/schemas/Error' }
                    }
                }
            }
        }
    }
},
