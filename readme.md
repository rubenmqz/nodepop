
# Nodepop API

API para la aplicación Nodepop, realizada con node.js, para la práctica del curso de MEAN de Keepcoding

## Requisitos e instalación

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

## Uso

Pendiente de documentar:
- Endpoints de la API
