# DAW E‑commerce (React + Firebase)

Proyecto ejemplo para DAW: e‑commerce básico en React con autenticación y persistencia de carrito en Firebase.

Requisitos:
- Node.js instalado
- Crear proyecto Firebase (Auth + Firestore)

Instrucciones rápidas:

1. Instalar dependencias

```bash
npm install
```

2. Configurar Firebase
 - Crea un proyecto en console.firebase.google.com con Authentication (Email/Password) y Firestore.
 - Copia `.env.example` a `.env` o `.env.local` y rellena las variables `VITE_FIREBASE_...` con tus credenciales.
 - `src/firebase.js` ya está preparado para leer las variables de entorno.

3. Ejecutar en modo desarrollo

```bash
npm install
npm run dev
```

Notas sobre entornos: Vite expone variables que empiezan por `VITE_` a `import.meta.env`. No subas tu `.env` a repositorios públicos.

Seed (poblar Firestore):

1. Crea una clave de servicio en Firebase Console → Project Settings → Service accounts → Generate new private key. Guarda el JSON en tu equipo.
2. Exporta la variable de entorno `GOOGLE_APPLICATION_CREDENTIALS` apuntando al JSON (PowerShell):

```powershell
set GOOGLE_APPLICATION_CREDENTIALS=C:\path\to\serviceAccountKey.json
```

3. (Opcional) define un usuario de prueba mediante variables de entorno:

```powershell
set SEED_TEST_USER_EMAIL=test@example.com
set SEED_TEST_USER_PASSWORD=miPassword123
```

4. Ejecuta el seed:

```bash
npm run seed
```

Esto insertará los productos en la colección `products` y, si se proporcionó el usuario de prueba, creará ese usuario y su carrito en la colección `carts`.

Usar servidor local en lugar de Firebase
-------------------------------------

He incluido un servidor Express simple en `server/` que expone una API en `http://localhost:4000` con endpoints para autenticar, listar productos y manejar el carrito.

Pasos para usar la API local:

1. Desde la raíz del proyecto, instala dependencias del servidor:

```bash
cd server
npm install
```

2. Ejecuta el servidor:

```bash
node index.js
# o en desarrollo con nodemon:
npm run dev
```

3. En el frontend, define en `.env`:

```dotenv
VITE_API_URL=http://localhost:4000
```

4. Levanta el frontend en otra terminal (`npm run dev` desde la raíz).

Con esto la app usará tu servidor local para autenticar usuarios y persistir el carrito en `server/db.json`.

Qué incluye:
- Registro y login (validaciones + comprobación de mayoría de edad)
- Carrito vinculado al usuario (guardado en Firestore en la colección `carts`)
- Páginas: inicio, listado, detalle, carrito, login, registro
- Diseño responsive básico y estructura defendible para DAW

Notas para la evaluación:
- El proyecto usa Firebase Authentication y Firestore para persistencia. Ideal para ampliar (añadir pedidos, administrador, etc.).
