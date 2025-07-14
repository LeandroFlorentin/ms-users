export default [
  {
    path: '/users/create',
    object: {
      post: {
        tags: ['Usuarios'],
        description: 'Endpoint encargado de la creación de usuarios.',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  username: {
                    type: 'string',
                    example: 'Leandro5622',
                  },
                  email: {
                    type: 'string',
                    example: 'leandro.flr@gmail.com',
                  },
                  password: {
                    type: 'string',
                    example: 'Afuera123$',
                  },
                },
              },
              required: ['username', 'email', 'password'],
              example: {
                username: 'Leandro5622',
                email: 'leandro.flr@gmail.com',
                password: 'Afuera123$',
              },
            },
          },
        },
        responses: {
          200: {
            description: 'Success',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    id: {
                      type: 'number',
                    },
                    username: {
                      type: 'string',
                    },
                    email: {
                      type: 'string',
                    },
                    role: {
                      type: 'string',
                    },
                    createdAt: {
                      type: 'string',
                    },
                    updatedAt: {
                      oneOf: [{ type: 'string' }, { type: 'null' }],
                    },
                  },
                  example: {
                    id: 1,
                    username: 'user_prueba',
                    email: 'prueba@gmail.com',
                    role: ['ADMIN'],
                    createdAt: '2025-06-26T13:20:28.020Z',
                    updatedAt: null,
                  },
                },
              },
            },
          },
          400: {
            description: 'Bad request',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    errors: {
                      type: 'array',
                      items: {
                        type: 'string',
                      },
                    },
                  },
                },
                example: {
                  errors: ['Formato de email inválido.', 'La contraseña debe contener al menos una mayúscula, una minúscula, un número y un carácter especial.'],
                },
              },
            },
          },
        },
      },
    },
  },
  {
    path: '/users/update',
    object: {
      patch: {
        tags: ['Usuarios'],
        parameters: [
          {
            name: 'id',
            in: 'query',
            required: true,
            schema: { type: 'integer' },
            example: 1,
          },
        ],
        security: [
          {
            bearerAuth: [],
          },
        ],
        description: 'Endpoint para la modificación de usuarios.',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  username: {
                    type: 'string',
                  },
                  email: {
                    type: 'string',
                  },
                  password: {
                    type: 'string',
                  },
                  role: {
                    type: 'array',
                    items: {
                      type: 'string',
                    },
                  },
                  createdAt: { type: 'string' },
                  updatedAt: { oneOf: [{ type: 'string' }, { type: 'null' }] },
                },
              },
              example: {
                username: 'Leandro2040',
              },
            },
          },
        },
        responses: {
          200: {
            description: 'Success',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    message: {
                      type: 'string',
                    },
                  },
                },
                example: {
                  message: 'Usuario modificado con éxito.',
                },
              },
            },
          },
          400: {
            description: 'Bad request',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    errors: {
                      type: 'array',
                      items: {
                        type: 'string',
                      },
                    },
                  },
                  example: {
                    errors: ['Formato de email inválido.', 'La contraseña debe contener al menos una mayúscula, una minúscula, un número y un carácter especial.'],
                  },
                },
              },
            },
          },
          401: {
            description: 'Unauthorized',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    errors: {
                      type: 'array',
                      items: {
                        type: 'string',
                      },
                    },
                  },
                  example: {
                    errors: ['Token no enviado.'],
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  {
    path: '/users/get_user_by_id',
    object: {
      get: {
        tags: ['Usuarios'],
        description: 'Endpoint encargado de traer datos de un usuario especifico. Solo usuarios administradores podran traer informacion de usuarios diferentes al suyo.',
        parameters: [
          {
            name: 'id',
            in: 'query',
            required: true,
            schema: { type: 'integer' },
            example: 1,
          },
        ],
        security: [
          {
            bearerAuth: [],
          },
        ],
        responses: {
          200: {
            description: 'Success',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    role: {
                      type: 'array',
                      items: {
                        type: 'string',
                      },
                    },
                    createdAt: {
                      type: 'string',
                    },
                    updatedAt: {
                      oneOf: [{ type: 'string' }, { type: 'null' }],
                    },
                    id: {
                      type: 'number',
                    },
                    email: { type: 'string' },
                    username: { type: 'string' },
                  },
                  example: {
                    role: ['USER'],
                    createdAt: '2025-07-12T12:59:56.332Z',
                    updatedAt: null,
                    id: 1,
                    email: 'leandro.florentin@gmail.com',
                    username: 'leandro5466',
                  },
                },
              },
            },
          },
          400: {
            description: 'Bad request',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    errros: {
                      type: 'array',
                      items: {
                        type: 'string',
                      },
                    },
                  },
                  example: {
                    errors: ['No se envio id en el query.'],
                  },
                },
              },
            },
          },
          401: {
            description: 'Unauthorized',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    errors: {
                      type: 'array',
                      items: {
                        type: 'string',
                      },
                    },
                  },
                  example: {
                    errors: ['Token no enviado.'],
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  {
    path: '/users/get_users',
    object: {
      get: {
        tags: ['Usuarios'],
        description: 'Endpoint encargado de traer un listado de usuarios, solo puede utilizarlo usuarios administradores.',
        parameters: [
          {
            in: 'query',
            name: 'username',
            required: false,
            schema: { type: 'string' },
          },
          {
            in: 'query',
            name: 'email',
            required: false,
            schema: { type: 'string' },
          },
        ],
        security: [
          {
            bearerAuth: [],
          },
        ],
        responses: {
          200: {
            description: 'Success',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    role: {
                      type: 'array',
                      items: {
                        type: 'string',
                      },
                    },
                    createdAt: {
                      type: 'string',
                    },
                    updatedAt: {
                      oneOf: [{ type: 'string' }, { type: 'null' }],
                    },
                    id: {
                      type: 'number',
                    },
                    email: { type: 'string' },
                    username: { type: 'string' },
                  },
                  example: [
                    {
                      role: ['USER'],
                      createdAt: '2025-07-12T12:59:56.332Z',
                      updatedAt: null,
                      id: 1,
                      email: 'leandro.florentin@gmail.com',
                      username: 'leandro5466',
                    },
                  ],
                },
              },
            },
          },
          401: {
            description: 'Unauthorized',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    errors: {
                      type: 'array',
                      items: {
                        type: 'string',
                      },
                    },
                  },
                  example: {
                    errors: ['Token no enviado.'],
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  {
    path: '/users/delete',
    object: {
      delete: {
        tags: ['Usuarios'],
        description: 'Endpoint encargado de la eliminacion de usuarios. Solo el usuario admin podra eliminar usuarios que no sean el suyo.',
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            in: 'query',
            name: 'id',
            schema: { type: 'number' },
            required: true,
            example: 1,
          },
        ],
        responses: {
          200: {
            type: 'ojbect',
            content: {
              'application/json': {
                schema: {
                  properties: {
                    message: { type: 'string' },
                  },
                  example: {
                    message: 'Usuario eliminado con éxito.',
                  },
                },
              },
            },
          },
          400: {
            type: 'object',
            content: {
              'application/json': {
                schema: {
                  properties: {
                    errors: {
                      type: 'array',
                      items: {
                        type: 'string',
                      },
                    },
                  },
                  example: {
                    errors: ['No se envio id en el query.'],
                  },
                },
              },
            },
          },
          401: {
            type: 'object',
            content: {
              'application/json': {
                schema: {
                  properties: {
                    erros: {
                      type: 'array',
                      items: {
                        type: 'string',
                      },
                    },
                  },
                  example: {
                    erros: ['Token no enviado.'],
                  },
                },
              },
            },
          },
        },
      },
    },
  },
];
