
# Nodepop API

API para la aplicación Nodepop, realizada con node.js, para la práctica del curso de MEAN de Keepcoding

## ACTUALIZACIÓN: Práctica desplegada

Desde el 05/03/2017 puede verse y probarse un despliegue de la practica en la url **node.oncetios.es
(cambiando "once" por el número "11")**. Los distintos endpoints funcionan tal como se define en los siguientes puntos.

## REQUISITOS E INSTALACIÓN

- node.js >=6.9.4 (no probado en versiones anteriores)
- npm >= 3.10.10 (no probado em versiones anteriores)
- mongoDB >=3.4 (no probado en versiones anteriores)

### Clonar e instalar dependencias

```bash
# clonar el repositorio
git clone https://github.com/rubenmqz/nodepop.git nombre_proyecto

# ir al directorio
cd nombre_proyecto

# instalar dependencias con npm
npm install
```

### Opciones de arranque
**¡Asegurarse antes de tener mongoDB en funcionamiento!**
```bash
# arrancar el servidor
npm start

# arrancar en modo debug, con nodemon para hacer watch de los cambios durante el desarrollo
npm run debug
```

### Validar código fuente
Se ha incluido la opcion de validar la calidad del código javascript usando la utilidad JSHint. Para ello, se podrá ejecutar el siguiente comando:
```bash
# Validar codigo con JSHint
npm run lint
```
La configuración de JSHint puede verse en el archivo *.jshintrc*.

### Cargar datos de prueba
Si quieres cargar datos de prueba, usa el siguiente script, que borrará los datos actuales de "Anuncios" y "Usuarios" de la base de datos, y en su lugar pondrá los que haya definidos en **initialData/data.json**:
```bash
# cargar datos de prueba
npm run installDB
```

El formato del archivo data.json deberá ser:
```bash
{
  "anuncios": [
    {
      "nombre": "Bicicleta",
      "venta": true,
      "precio": 230.15,
      "foto": "bici.jpg",
      "tags": [ "lifestyle", "motor"]
    }
  ],
  "usuarios": [
    {
      "nombre": "admin",
      "email": "admin@admin.com",
      "clave": "admin"
    }
  ]
}
```

## USO

La API dispone de los siguientes **endpoints**:

- **Usuarios** (/apiv1/usuarios)
- **Anuncios** (/apiv1/anuncios): 
- **Tags** (/apiv1/tags)

Cada uno de ellos tiene sus particularidades, que se detallan posteriormente, pero también comparten una serie características, detalladas a continuación:
 
- **URL:** Si se ejecutan en desarrollo, la configuración inicial publicará la API en http://localhost:3000/apiv1
- **IDIOMA:** A cualquiera de las llamadas realizadas, se le puede especificar en la querystring el idioma en el que deseamos recibir los posibles mensajes de error que se produczan. Por ejemplo: http://localhost:3000/apiv1/anuncios?**lang=en**. Si no se especifica, los errores se mostrarán en español.
- **ERRORES**: Si hay cualquier error al procesar la llamada, se devolverá un json con el formato:
```bash
{
    success: false,
    error: "Detalle del error"
}
```
- **AUTENTICACIÓN**: Es obligatorio estar autenticado para consumir estos recursos (excepto el de "Usuarios"). Para ello, se deberá pasar el token de usuario como un parámetro más, que podrá ir en la querystring como **token=xxxxxxx**, o también en el body, o en una cabecera **x-access-token**. La obtención del token se describe en el apartado "USUARIOS".


### Usuarios

#### Registrar 
Registra un nuevo usuario en la aplicación. Se deben pasar en el body los campos 'nombre', 'email' y 'password'.
```bash
POST /apiv1/usuarios/
```

#### Autenticar 
Obtiene un token para un usuario registrado, que le será necesario para realizar cualquier llamada a otros endpoints. Se deben pasar en el body los campos 'email' y 'password'.
```bash
POST /apiv1/usuarios/authenticate
 
# Se pueden utilizar los datos del usuario de prueba:
# email: admin@admin.com
# password: admin
```

### Anuncios

#### Obtener Anuncios 
Obtiene un listado de anuncios, que se puede personalizar indicando parámetros extra en la querystring.
```bash
GET /apiv1/anuncios
```
Parámetros opcionales:

- **nombre=[xxx]**: Devuelve los anuncios cuyo nombre empiece por "xxx"
- **precio=[x]**: Devuelve los anuncios cuyo precio sea "x"
- **precio=[x]-**: Devuelve los anuncios cuyo precio sea "x" o mayor
- **precio=-[x]**: Devuelve los anuncios cuyo precio sea "x" o menor
- **precio=[x]-[y]**: Devuelve los anuncios cuyo precio se encuentre entre "x" e "y" (ambos incluidos)
- **venta=[true|false]**: Devuelve los anuncios que estén en venta (true), o que sean buscados (false)
- **tag=[xxx]**: Devuelve los anuncios que contengan el tag "xxx"
- **limit=[x]**: Devuelve sólo los "x" primeros elementos encontrados
- **skip=[x]**: Se salta los "x" primeros elementos, devolviendo únicamente los siguientes
- **sort=[nombre|precio|venta|tag]**: Ordena los resultados por el campo indicado. Si se quiere invertir el orden, se debe incluir un menos ("-") delante, por ejemplo: *sort=-nombre*
- **includeTotal=true**: Devuelve un campo extra, con el número total de anuncios devueltos

### Tags

#### Obtener tags 
Obtiene el listado de tags existentes.
```bash
GET /apiv1/tags
```

