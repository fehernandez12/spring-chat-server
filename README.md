# Chat Server
Servidor de chat simple, construido utilizando Spring Websocket y Spring Messaging.

Para la interfaz de la aplicación, se utilizaron las librerías STOMP y SockJS.

## Ejecutar el proyecto
Al ejecutar el proyecto, ingresar en un navegador a `https://localhost:8080/`.

## Arquitectura del proyecto
El proyecto ha sido construido siguiendo las bases de la arquitectura hexagonal, también conocida como patrón de puertos y adaptadores. Por tanto, el proyecto se divide en tres paquetes:

### Application:
Contiene los puertos de entrada y salida (Casos de uso), y los servicios de la aplicación.

### Domain:
Contiene las entidades de negocio y las clases que realizan la lógica de negocio, también conocidas como Aggregate (en contraste con los Delegate de la arquitectura de capas).

### Infrastructure:
Contiene las clases de configuración y los controladores de la aplicación.

## Frontend
Debido a que la aplicación contiene un frontend básico, este se encuentra en un directorio separado denominado webapp. Consiste de:

>* Archivo `index.html`
>* Carpeta resources: Contiene los archivos de estilos y Javascript del proyecto.

La conexión al Websocket y el envío de peticiones se realizan en el archivo `resources/script.js`.