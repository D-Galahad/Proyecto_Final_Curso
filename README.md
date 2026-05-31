# TechStore — E-Commerce Full Stack

Tienda online de productos tecnológicos desarrollada como proyecto final de curso. Arquitectura Full Stack con frontend en React + Vite y backend en Spring Boot 4 con autenticación JWT y base de datos MySQL.

---

## Índice

- [Tecnologías](#tecnologías)
- [Estructura del proyecto](#estructura-del-proyecto)
- [Requisitos previos](#requisitos-previos)
- [Instalación y arranque](#instalación-y-arranque)
- [Variables de entorno](#variables-de-entorno)
- [API REST — Endpoints](#api-rest--endpoints)
- [Funcionalidades](#funcionalidades)
- [Modelo de datos](#modelo-de-datos)
- [Autenticación](#autenticación)
- [Carrito de compra](#carrito-de-compra)
- [Método de pago](#método-de-pago)

---

## Tecnologías

### Frontend
| Tecnología | Versión | Uso |
|---|---|---|
| React | 18.2 | Framework UI |
| React Router DOM | 6.14 | Navegación SPA |
| Vite | 5.0 | Bundler y servidor de desarrollo |
| React Icons | 5.6 | Iconografía |

### Backend
| Tecnología | Versión | Uso |
|---|---|---|
| Java | 21 | Lenguaje |
| Spring Boot | 4.0.3 | Framework principal |
| Spring Security | — | Autenticación y autorización |
| Spring Data JPA | — | ORM y acceso a datos |
| MySQL Connector | — | Driver de base de datos |
| JJWT | 0.12.6 | Generación y validación de tokens JWT |
| Lombok | — | Reducción de boilerplate |
| Jackson Databind | 2.15.2 | Serialización JSON |

### Base de datos
- **MySQL** — base de datos relacional, esquema `techstore`, puerto `3306`

---

## Estructura del proyecto

```
Proyecto_Final_Curso/
├── Proyecto React - copia (2)/      # Frontend React
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx           # Barra de navegación con badge carrito
│   │   │   ├── Footer.jsx
│   │   │   ├── ProductCard.jsx      # Tarjeta de producto con botón añadir
│   │   │   └── FilterSidebar.jsx    # Filtros laterales (categoría, precio)
│   │   ├── pages/
│   │   │   ├── Home.jsx             # Página principal con hero y destacados
│   │   │   ├── Products.jsx         # Catálogo con filtros
│   │   │   ├── ProductDetail.jsx    # Detalle de producto
│   │   │   ├── Cart.jsx             # Carrito de compra
│   │   │   ├── Checkout.jsx         # Formulario de pago (tarjeta/PayPal/Bizum)
│   │   │   ├── CheckoutSuccess.jsx  # Confirmación de pedido
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Profile.jsx
│   │   │   └── NotFound.jsx
│   │   ├── contexts/
│   │   │   ├── AuthContext.jsx      # Estado global de sesión
│   │   │   └── CartContext.jsx      # Estado global del carrito
│   │   ├── hooks/
│   │   │   └── useProducts.js       # Hook para carga de productos
│   │   ├── data/
│   │   │   └── products.js          # Datos locales de fallback
│   │   ├── api.js                   # Todas las llamadas al backend
│   │   ├── firebase.js
│   │   ├── App.jsx                  # Rutas principales
│   │   ├── main.jsx
│   │   └── styles.css               # Estilos globales con variables CSS
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
└── Tienda-Backend/                  # Backend Spring Boot
    ├── src/main/java/com/tiendaback/tiendaback/
    │   ├── TiendaBackApplication.java
    │   ├── auth/
    │   │   ├── SpringSecurityConfig.java
    │   │   ├── CustomUserDetailsService.java
    │   │   ├── TokenJwtConfig.java
    │   │   └── filter/
    │   │       ├── JwtAuthenticationFilter.java
    │   │       └── JwtValidationFilter.java
    │   ├── controllers/
    │   │   ├── AuthController.java
    │   │   ├── ProductoRestController.java
    │   │   ├── CartRestController.java
    │   │   ├── UserRestController.java
    │   │   └── AdminController.java
    │   ├── model/models/
    │   │   ├── User.java
    │   │   ├── Producto.java
    │   │   ├── Cart.java
    │   │   ├── CartItem.java
    │   │   ├── Role.java
    │   │   └── enums/Roles.java
    │   ├── repository/
    │   │   ├── UserRepository.java
    │   │   ├── ProductoRepository.java
    │   │   ├── CartRepository.java
    │   │   ├── CartItemRepository.java
    │   │   └── RoleRepository.java
    │   ├── service/
    │   │   ├── ProductoServiceImpl.java
    │   │   ├── CartServiceImpl.java
    │   │   ├── UserServiceImpl.java
    │   │   └── JwtService.java
    │   └── exception/
    │       ├── GlobalExceptionHandler.java
    │       ├── ResourceNotFoundException.java
    │       └── ApiError.java
    ├── src/main/resources/
    │   └── application.properties
    └── pom.xml
```

---

## Requisitos previos

- **Node.js** v18 o superior
- **Java JDK 21**
- **Maven** 3.8+
- **MySQL** 8.0+

---

## Instalación y arranque

### 1. Base de datos

Abre MySQL y crea el esquema:

```sql
CREATE DATABASE techstore CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

El backend está configurado con `ddl-auto=create-drop`, lo que significa que **crea las tablas automáticamente** al arrancar y las borra al parar. Para que los datos persistan entre reinicios, cambia en `application.properties`:

```properties
spring.jpa.hibernate.ddl-auto=update
```

### 2. Backend (Spring Boot)

```bash
cd "Tienda-Backend"

# Compilar y arrancar
./mvnw spring-boot:run

# O en Windows
mvnw.cmd spring-boot:run
```

El servidor arranca en `http://localhost:8080`.

### 3. Frontend (React)

```bash
cd "Proyecto React - copia (2)"

# Instalar dependencias
npm install

# Arrancar en modo desarrollo
npm run dev
```

La app estará disponible en `http://localhost:5173`.

---

## Variables de entorno

### Backend — `src/main/resources/application.properties`

```properties
# Base de datos
spring.datasource.url=jdbc:mysql://localhost:3306/techstore
spring.datasource.username=root
spring.datasource.password=           # ← pon tu contraseña aquí

# JWT
jwt.secret=<clave_secreta_larga>      # ← cambia en producción
jwt.expiration=3600000                # 1 hora en milisegundos

# Puerto
server.port=8080
```

### Frontend — `.env` (crear en la raíz del proyecto React)

```env
VITE_API_URL=http://localhost:8080
```

Si no existe el archivo `.env`, la app usa `http://localhost:8080` por defecto.

---

## API REST — Endpoints

### Autenticación

| Método | Endpoint | Descripción | Auth |
|---|---|---|---|
| `POST` | `/api/auth/login` | Login, devuelve token JWT | No |
| `POST` | `/api/auth/register` | Registro de nuevo usuario | No |

**Body login:**
```json
{ "username": "usuario", "password": "contraseña" }
```

**Respuesta:**
```json
{ "token": "eyJ...", "username": "usuario", "roles": ["ROLE_USER"] }
```

---

### Productos

| Método | Endpoint | Descripción | Auth |
|---|---|---|---|
| `GET` | `/api/productos` | Listar todos los productos | No |
| `GET` | `/api/productos/{id}` | Obtener un producto | No |
| `POST` | `/api/productos` | Crear producto | ADMIN |
| `PUT` | `/api/productos/{id}` | Actualizar producto | ADMIN |
| `DELETE` | `/api/productos/{id}` | Eliminar producto | ADMIN |

---

### Carrito

Todos los endpoints de carrito requieren token JWT en el header:
`Authorization: Bearer <token>`

| Método | Endpoint | Descripción |
|---|---|---|
| `GET` | `/api/cart/my` | Ver mi carrito |
| `POST` | `/api/cart/my/items?productId={id}&quantity={n}` | Añadir producto |
| `PUT` | `/api/cart/my/items?productId={id}&quantity={n}` | Actualizar cantidad |
| `DELETE` | `/api/cart/my/items?productId={id}` | Eliminar producto |
| `DELETE` | `/api/cart/my` | Vaciar carrito |

---

### Usuarios

| Método | Endpoint | Descripción | Auth |
|---|---|---|---|
| `GET` | `/api/users` | Listar usuarios | ADMIN |
| `GET` | `/api/users/{id}` | Ver usuario | ADMIN |
| `PUT` | `/api/users/{id}` | Actualizar usuario | ADMIN |
| `DELETE` | `/api/users/{id}` | Eliminar usuario | ADMIN |

---

## Funcionalidades

- Catálogo de productos con filtros por categoría y precio
- Búsqueda de productos
- Vista de detalle de producto con especificaciones y stock
- Carrito de compra persistente:
  - Sin login: guardado en `localStorage`
  - Con login: sincronizado con el backend (con fallback local si el servidor no responde)
- Registro e inicio de sesión con JWT
- Sesión persistente entre recargas de página
- Checkout con selección de método de pago (tarjeta, PayPal, Bizum)
- Validación de formulario de pago en cliente
- Detección automática del tipo de tarjeta (Visa, Mastercard, Amex)
- Panel de administración (rol `ROLE_ADMIN`)
- Diseño responsive para móvil, tablet y escritorio

---

## Modelo de datos

```
User
├── id (PK)
├── name
├── lastname
├── email (único)
├── username (único, 4–12 caracteres)
├── password (hash bcrypt, oculto en respuestas)
├── admin (boolean)
└── rolesName → [Role]

Role
├── id (PK)
└── name (ROLE_USER / ROLE_ADMIN)

Producto
├── id_producto (PK)
├── name
├── precio
├── marca
├── modelo
└── imageUrl (LONGTEXT)

Cart
├── id (PK)
├── username
└── items → [CartItem]

CartItem
├── id (PK)
├── productId
├── productName
├── unitPrice
└── quantity
```

---

## Autenticación

El sistema usa **JWT (JSON Web Token)**:

1. El usuario envía usuario y contraseña a `/api/auth/login`
2. Spring Security valida las credenciales contra la base de datos
3. Si son correctas, `JwtService` genera un token firmado con la clave secreta
4. El frontend guarda el token en `localStorage`
5. Cada petición posterior incluye el token en el header `Authorization: Bearer <token>`
6. `JwtValidationFilter` intercepta cada petición y valida el token antes de llegar al controlador

El token expira en **1 hora** (configurable en `jwt.expiration`).

---

## Carrito de compra

El carrito tiene un sistema de **doble modo**:

**Usuario no autenticado:**
Los productos se guardan en `localStorage` bajo la clave `guest_cart`. Al hacer login, el carrito guest se sincroniza automáticamente con el servidor y se elimina del almacenamiento local.

**Usuario autenticado:**
Las operaciones van contra la API REST. Si el backend no está disponible, el carrito sigue funcionando localmente como fallback, evitando que el usuario pierda su sesión de compra.

---

## Método de pago

La pasarela de pago actual es una **simulación** sin procesamiento real. Incluye:

- Formulario de tarjeta con detección automática de tipo (Visa/Mastercard/Amex)
- Formateo automático del número (grupos de 4) y fecha (MM/AA)
- Validación completa de campos antes de enviar
- Opción PayPal y Bizum (UI preparada para integración real)
- Pantalla de confirmación con número de pedido

Para integrar un procesador real se recomienda **Stripe**: instalar `@stripe/stripe-js`, tokenizar la tarjeta en el frontend y procesar el cobro desde el backend con la API de Stripe.
