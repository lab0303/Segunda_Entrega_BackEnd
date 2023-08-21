# Proyecto Final eCommerce

Este proyecto es una aplicación de backend para un sistema de comercio electrónico. Permite a los usuarios registrarse, iniciar sesión, explorar productos, agregar productos a un carrito de compra y realizar compras.

# Proyecto Final eCommerce

Este proyecto es una aplicación de backend para un sistema de comercio electrónico. Permite a los usuarios registrarse, iniciar sesión, explorar productos, agregar productos a un carrito de compra y realizar compras.

## Instalación

Siga estos pasos para configurar y ejecutar la aplicación de backend:

**1. Clonar el repositorio**

```
git clone https://github.com/lab0303/Segunda_Entrega_BackEnd.git
```

**2. Navegar al directorio del proyecto**
```
cd Segunda_Entrega_BackEnd
```
**3. Instalar dependencias**

```
npm install
```

**4. Iniciar aplicacion**

```
npm run start
```
La aplicación estará disponible en http://localhost:8080 una vez que se inicie.

## Estructura de Carpetas

La aplicación sigue una estructura de carpetas organizada de la siguiente manera:

- `db`: Contiene archivos relacionados con la configuración de la base de datos.
- `src`: El código fuente principal de la aplicación se encuentra en esta carpeta.
  - `controllers`: Controladores de rutas que manejan las solicitudes HTTP.
  - `dao`: Acceso a datos y lógica de base de datos.
  - `models`: Definiciones de modelos de datos utilizados en la aplicación.
  - `middlewares`: Middlewares personalizados utilizados en las rutas.
  - `router`: Configuración de rutas y controladores.
  - `utils`: Utilidades y funciones auxiliares.
  - `views`: Contiene las plantillas Handlebars utilizadas para generar vistas HTML.

## Configuración

La aplicación utiliza variables de entorno para su configuración. Sigue estos pasos para configurar tus propias variables de entorno en un archivo `.env`:

1. Crea un archivo `.env` en la raíz del proyecto.

2. Configura las siguientes variables de entorno en tu archivo `.env` con tus propios valores:

   - `PORT`: El puerto en el que deseas que la aplicación se ejecute (por ejemplo, 8080).
   - `DB_USERNAME`: Tu nombre de usuario de la base de datos.
   - `DB_PASSWORD`: Tu contraseña de la base de datos.
   - `JWT_PRIVATE_KEY`: Tu clave privada JWT.
   - `USER_EMAIL`: Tu dirección de correo electrónico.
   - `USER_PASS`: Tu contraseña de usuario.

Asegúrate de mantener este archivo `.env` seguro y no lo compartas públicamente.

**Importante**: No compartas información confidencial, como contraseñas o claves privadas, en repositorios públicos. Utiliza un archivo `.gitignore` para evitar que el archivo `.env` se incluya en tus commits.
## Uso

Para explorar y probar la API de esta aplicación, hemos integrado Swagger, una herramienta de documentación y prueba de API. Siga estos pasos:

1. Inicie la aplicación siguiendo las instrucciones en la sección de Instalación.

2. Abra su navegador web y acceda a la siguiente URL (reemplaza `localhost` y `8080` con la configuración de tu entorno):
   http://localhost:8080/apidocs/

3. Se abrirá la interfaz de Swagger, donde podrá ver y probar los endpoints de la API.

4. Explore la documentación de la API para obtener detalles sobre las rutas, los métodos HTTP admitidos y los parámetros necesarios.

5. Utilice Swagger para realizar solicitudes a la API y ver las respuestas.

Swagger facilita la interacción con la API y le permite probar rápidamente las diversas funciones que ofrece la aplicación.

También puede encontrar más detalles sobre cómo utilizar Swagger en la documentación oficial de Swagger.

## Autenticación y Seguridad

La aplicación utiliza Passport con JWT para la autenticación y el manejo de sesiones de usuario. A continuación, se describen los detalles clave:

- **Estrategia de Autenticación**: Se ha configurado una estrategia de autenticación llamada "current" utilizando Passport y JWT. Esta estrategia verifica el token JWT incluido en las cookies de la solicitud
- **Extracción del Token**: El token JWT se extrae de las cookies de la solicitud utilizando un extractor personalizado llamado `cookieExtractor`.
