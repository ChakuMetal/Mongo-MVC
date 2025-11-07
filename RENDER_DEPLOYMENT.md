# Mongo-MVC API

API REST construida con Node.js, Express y MongoDB siguiendo el patrón MVC (Modelo-Vista-Controlador).

## 🚀 Características

- Autenticación con JWT
- CRUD completo de usuarios
- Registro y login de usuarios
- Rutas protegidas con middleware de autenticación
- Conexión a MongoDB con Mongoose
- CORS habilitado para peticiones desde cualquier origen

## 📋 Requisitos previos

- Node.js (v14 o superior)
- MongoDB Atlas o instancia de MongoDB
- Postman (para probar la API)

## 🔧 Instalación local

1. Clonar el repositorio:
```bash
git clone <url-del-repositorio>
cd Mongo-MVC
```

2. Instalar dependencias:
```bash
npm install
```

3. Configurar variables de entorno:
   - Copiar el archivo `.env.example` a `.env`
   - Configurar las variables de entorno:

```env
MONGO_URI=tu_connection_string_de_mongodb
JWT_SECRET=tu_clave_secreta_jwt
BCRYPT_SALT=10
PORT=5000
```

4. Iniciar el servidor:
```bash
npm start
```

El servidor estará disponible en `http://localhost:5000`

## 🌐 Despliegue en Render

### Pasos para desplegar:

1. **Crear cuenta en Render**: https://render.com

2. **Crear nuevo Web Service**:
   - Conectar tu repositorio de GitHub
   - Configurar el servicio:
     - **Build Command**: `npm install`
     - **Start Command**: `npm start`
     - **Environment**: Node

3. **Configurar Variables de Entorno** en Render:
   - `MONGO_URI`: Tu connection string de MongoDB Atlas
   - `JWT_SECRET`: Una clave secreta segura para JWT
   - `BCRYPT_SALT`: 10
   - `PORT`: Render lo asigna automáticamente, pero puedes usar 5000 por defecto

4. **Desplegar**: Render automáticamente desplegará tu aplicación

### URL de la API desplegada:
Una vez desplegado, tu API estará disponible en:
```
https://tu-app-name.onrender.com
```

### Verificar que la API funciona:
Hacer una petición GET a la ruta raíz:
```
GET https://tu-app-name.onrender.com/
```

Deberías recibir:
```json
{
  "message": "API funcionando correctamente ✅",
  "endpoints": {
    "users": "/api/users",
    "auth": "/api/auth"
  }
}
```

## 📡 Endpoints

### Autenticación (`/api/auth`)

#### Registro de usuario
```http
POST /api/auth/register
Content-Type: application/json

{
  "nombre": "Juan Pérez",
  "email": "juan@ejemplo.com",
  "edad": 25,
  "password": "contraseña123"
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "juan@ejemplo.com",
  "password": "contraseña123"
}
```

#### Obtener perfil (ruta protegida)
```http
GET /api/auth/profile
Authorization: Bearer tu_token_jwt
```

### Usuarios (`/api/users`)

#### Obtener todos los usuarios
```http
GET /api/users
```

#### Obtener un usuario por ID
```http
GET /api/users/:id
```

#### Crear un usuario
```http
POST /api/users
Content-Type: application/json

{
  "nombre": "María López",
  "email": "maria@ejemplo.com",
  "edad": 30,
  "password": "contraseña456"
}
```

#### Actualizar un usuario
```http
PUT /api/users/:id
Content-Type: application/json

{
  "nombre": "María López Actualizada",
  "edad": 31
}
```

#### Eliminar un usuario
```http
DELETE /api/users/:id
```

## 🔐 Autenticación

Las rutas protegidas requieren un token JWT en el header:
```
Authorization: Bearer tu_token_jwt
```

El token se obtiene al hacer login o registro exitoso.

## 🐛 Solución de problemas con Render

### Error: No se puede conectar con Postman

**Problema**: La aplicación no responde a las peticiones desde Postman cuando está desplegada en Render.

**Soluciones**:

1. **Verificar que el servidor escucha en 0.0.0.0**: 
   - El código ya está configurado para escuchar en `0.0.0.0` (todas las interfaces de red)
   - Esto es necesario para que Render pueda enrutar el tráfico correctamente

2. **Verificar variables de entorno**:
   - Asegúrate de que todas las variables de entorno estén configuradas en Render
   - Especialmente `MONGO_URI`, `JWT_SECRET`, y `BCRYPT_SALT`

3. **Verificar la URL**:
   - Usa la URL completa de Render: `https://tu-app-name.onrender.com`
   - NO uses `http://localhost:5000`

4. **Probar el health check**:
   - Primero prueba `GET https://tu-app-name.onrender.com/`
   - Si esto funciona, el servidor está corriendo correctamente

5. **Revisar los logs de Render**:
   - En el dashboard de Render, ve a "Logs" para ver errores
   - Busca errores de conexión a MongoDB o variables de entorno faltantes

6. **Tiempo de inicio**:
   - Los servicios gratuitos de Render pueden tardar 30-60 segundos en iniciarse
   - La primera petición después de inactividad puede ser lenta

## 🛠️ Tecnologías utilizadas

- **Node.js** - Entorno de ejecución
- **Express** - Framework web
- **MongoDB** - Base de datos NoSQL
- **Mongoose** - ODM para MongoDB
- **JWT** - Autenticación con tokens
- **Bcrypt** - Hash de contraseñas
- **CORS** - Manejo de peticiones cross-origin
- **Dotenv** - Variables de entorno

## 📝 Licencia

ISC
