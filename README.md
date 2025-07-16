# Microservicio de usuarios.

## Este microserivicio se encarga de manejar la información relacionada con los usuarios, esto incluye operaciones como creación, lectura, actualización y eliminación de los mismos.

## El desarrollo del servicio sigue los principios de arquitectura limpia (Clean Architecture), separando responsabilidades en capas como domain, application, infrastructure e interfaces, lo que facilita el mantenimiento, la escalabilidad y la capacidad de testing.

- Lenguaje de programación:
  - `TypeScript`: para garantizar tipado estático y mayor mantenibilidad del código.
- Frameworks:
  - `Express`: para construir las rutas HTTP y manejar las solicitudes de login, registro y validación de tokens.
- Bases de datos:
  - `PostgreSQL`: para la persistencia de datos de los usuarios.
  - `Redis`: para cachear el manejo de cacheo de usuarios.
- ORM:
  - `Sequelize`: para simplificar la comunicación con la base de datos.
- Testing:
  - `Jest`: para pruebas unitarias de funciones críticas como validación y generación de tokens.
  - `Supertest`: para pruebas de integración sobre los endpoints expuestos (e.g. /login, /me).
- Librerias:
  - `JWT`: (jsonwebtoken): para la generación y validación de tokens de acceso.
  - `Zod`: para la verificación de objetos en los endpoints.
  - `Swagger`: para documentar las rutas y facilitar pruebas manuales del servicio.
  - `Winston`: para el logging estructurado y centralizado de errores, advertencias y eventos del sistema.
  - `Bcrypt`: para el hash y la comparación segura de contraseñas.
  - `ESlint`: para el monitoreo y correcion de errores en el codigo.
- Contenerización:
  - `Docker`: Para contenerizar la aplicación.
- CI/CD
  - `GitHub Actions`: para la ejecución de testing, versionado, buildeo y pusheo de imagenes de docker a dockerhub.

# Tabla de contenidos:

- [Instalación](#instalación)
- [Referencia de API](#referencia-de-api)
- [Autor](#autor)

# Instalación

Clona el repositorio en tu entorno local con el siguiente comando

```
   git clone https://github.com/LeandroFlorentin/ms-users.git
```

Una vez clonado, navega dentro del repositorio e instala las dependencias con el comando install de npm o yarn respectivamente.

Puedes buscar el dialec correspondiente a la base de datos que desees utilizar en la [documentación de Sequelize.](https://sequelize.org/docs/v6/getting-started/)

Una vez tengas tu dialect crea el archivo .env en la raiz del proyecto y ponle tus credenciales.

```env
    DB_USER=<YOUR_DB_USER>
    DB_PASSWORD=<YOUR_DB_PASSWORD>
    DB_HOST=<YOUR_DB_HOST>
    DB_NAME=<YOUR_DB_NAME>
    DB_PORT=<YOUR_DB_PORT>
    DB_DIALECT=<YOUR_DB_DIALECT>

    RD_PASSWORD=<YOUR_REDIS_PASSWORD>
    RD_PORT=<YOUR_REDIS_PORT>
    RD_HOST=<YOUR_REDIS_HOST>

    PORT=<YOUR_PORT>

    JWT_SECRET=<YOUR_JWT_SECRET>

    URL_BASE=<YOUR_URL_BASE> //example: http://localhost:
```

# Referencia de API

## Tener en cuenta que en este microservicio se crea un usuario de prueba en Postgres al iniciar el proyecto, el cual tiene las siguientes credenciales.

```
    username: user_prueba
    password: password123$
```

## Para poder obtener un token e ingresar a los demas endpoints puede hacerlo desde este [microservicio de autenticación.](https://github.com/LeandroFlorentin/ms-auth)

```diff
- Color rojo es que no requiere autenticación
+ Color azul es que requiere autenticación
```

### Los endpoints que requieran autenticación deberán enviar su token a través de los headers, utilizando el esquema Bearer Token.

## Endpoints:

- [Crear usuario](#crear-usuario)
- [Traer usuario](#traer-usuario)
- [Traer usuarios](#traer-usuarios)
- [Modificar usuario](#modificar-usuario)
- [Eliminar usuario](#eliminar-usuario)

## Crear usuario

```http
  POST /users/create
```

```diff
- No requiere autenticación.
```

Parametros del body:

| Parametro  | Tipo     | Descripción                                                 |
| :--------- | :------- | :---------------------------------------------------------- |
| `username` | `string` | **Requerido**. Usuario con el que se registrara al usuario. |
| `email`    | `string` | **Requerido**. Email con el que se registrara al usuario.   |
| `password` | `string` | **Requerido**. Contraseña del usuario.                      |

Ejemplo de respuesta exitosa:

```json
{
  "id": 1,
  "username": "user_prueba",
  "email": "prueba@gmail.com",
  "role": ["ADMIN"],
  "createdAt": "2025-06-26T13:20:28.020Z",
  "updatedAt": null
}
```

Ejemplo de respuesta fallida:

```json
{
  "errors": ["Formato de email inválido.", "La contraseña debe contener al menos una mayúscula, una minúscula, un número y un carácter especial."]
}
```

## Traer usuario

```http
  GET /users/get_user_by_id
```

```diff
+ Autenticación requerida.
```

## Aclaración: Los usuario que no son administradores solo podran traer información de su propio usuario.

Parametros del query:

| Parametro | Tipo     | Descripcion                                       |
| :-------- | :------- | :------------------------------------------------ |
| `id`      | `string` | **Requerido**. Id del usuario del usuario a traer |

Ejemplo de respuesta exitosa:

```json
{
  "role": ["USER"],
  "createdAt": "2025-07-12T12:59:56.332Z",
  "updatedAt": null,
  "id": 1,
  "email": "leandro.florentin@gmail.com",
  "username": "leandro5466"
}
```

Ejemplo de respuesta fallida:

```json
{
  "errors": ["No se envio id en el query."]
}
```

## Traer usuarios

```http
  GET /users/get_users
```

```diff
+ Autenticación requerida.
```

## Aclaración: Este endpoint es solo para administradores

Parametros del query:

| Parametro  | Tipo     | Descripcion                                         |
| :--------- | :------- | :-------------------------------------------------- |
| `username` | `string` | **Requerido**. parametro paara filtrar por usuario. |
| `email`    | `string` | **Requerido**. parametro paara filtrar por email.   |

Ejemplo de respuesta exitosa:

```json
[
  {
    "role": ["USER"],
    "createdAt": "2025-07-12T12:59:56.332Z",
    "updatedAt": null,
    "id": 1,
    "email": "leandro.florentin@gmail.com",
    "username": "leandro5466"
  }
]
```

Ejemplo de respuesta fallida:

```json
{
  "errors": ["Token no enviado."]
}
```

## Modificar usuario

```http
  PATCH /users/update
```

```diff
+ Autenticación requerida.
```

## Aclaración: Los usuario que no son administradores solo podran modificar su propio usuario.

Parametros del query:

| Parametro | Tipo     | Descripcion                                         |
| :-------- | :------- | :-------------------------------------------------- |
| `id`      | `string` | **Requerido**. Id del usuario del usuario modificar |

Parametros del body:

| Parametro  | Tipo       | Descripción                                  | Ejemplo  |
| :--------- | :--------- | :------------------------------------------- | :------- |
| `username` | `string`   | Usuario con el que se registrara al usuario. |          |
| `email`    | `string`   | Email con el que se registrara al usuario.   |          |
| `password` | `string`   | Contraseña del usuario.                      |          |
| `role`     | `string[]` | Array con permisos del usuario.              | ["USER"] |

Ejemplo de respuesta exitosa:

```json
{
  "message": "Usuario modificado con éxito."
}
```

Ejemplo de respuesta fallida:

```json
{
  "errors": ["Formato de email inválido.", "La contraseña debe contener al menos una mayúscula, una minúscula, un número y un carácter especial."]
}
```

## Eliminar usuario

```http
  DELETE /users/delete
```

```diff
+ Autenticación requerida.
```

## Aclaración: Los usuario que no son administradores solo podran eliminar su usuario.

Parametros del query:

| Parametro | Tipo     | Descripcion                                         |
| :-------- | :------- | :-------------------------------------------------- |
| `id`      | `string` | **Requerido**. Id del usuario del usuario modificar |

Ejemplo de respuesta exitosa:

```json
{
  "message": "Usuario eliminado con éxito."
}
```

Ejemplo de respuesta fallida:

```json
{
  "errors": ["No se envio id en el query."]
}
```

# Autor

**Leandro Florentín**  
🔗 [Perfil de LinkedIn](https://www.linkedin.com/in/leandro-florentin/)  
📧 leandro.florentin@hotmail.com
