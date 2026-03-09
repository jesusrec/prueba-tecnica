# Prueba Técnica: Fullstack App con Docker Swarm 

Esta solución es una plataforma integral diseñada bajo una arquitectura de microservicios, utilizando Spring Boot 3 para el backend, React para el frontend (servido por Nginx) y PostgreSQL como motor de persistencia. El despliegue está orquestado mediante Docker Swarm, garantizando resiliencia y escalabilidad mediante el uso de réplicas y balanceo de carga nativo.
# Arquitectura del Proyecto

La arquitectura se divide en capas desacopladas que se comunican a través de una red virtual interna (overlay):

    Frontend (SPA): Aplicación de página única construida en React, optimizada para una navegación fluida y servida a través de un servidor Nginx.

    Backend: API REST desarrollada en Java 17 con Spring Boot.

    Seguridad y JWT: Se implementó un módulo de autenticación (Login) basado en JSON Web Tokens (JWT). El sistema genera un token seguro tras la validación de credenciales, el cual es requerido para acceder a los recursos protegidos del API.

    Encriptación de Contraseñas: Se utiliza BCrypt para asegurar que las contraseñas nunca se almacenen en texto plano en la base de datos.

    Orquestación: Uso de Docker Swarm para el manejo de clústeres y alta disponibilidad de los servicios.

# Documentación de la API (Swagger)

El proyecto cuenta con documentación interactiva generada con OpenAPI/Swagger. Puede probar los endpoints de autenticación y los recursos protegidos directamente desde aquí:

    URL de Swagger UI: http://localhost:8080/swagger-ui/index.html

# Instrucciones de Ejecución (Stack Completo)

    Inicializar el Clúster:
    Bash

    docker swarm init

    Construir las Imágenes:
    Bash

    docker build -t prueba-tecnica-backend:latest ./backend
    docker build -t prueba-tecnica-frontend:latest ./frontend

    Desplegar el Stack:
    Bash

    docker stack deploy -c docker-compose.yml app_stack

# Ejecución por Separado y Pruebas
Registro y Login (Flujo JWT)

Para probar el flujo de seguridad, puede usar los siguientes comandos curl:

1. Registro de usuario:
Bash

curl -X POST http://localhost:8080/auth/register \
     -H "Content-Type: application/json" \
     -d '{"username": "ramiro_admin", "password": "password123", "email": "ramiro@ejemplo.com"}'

2. Login y obtención de Token:
Bash

curl -X POST http://localhost:8080/auth/login \
     -H "Content-Type: application/json" \
     -d '{"username": "ramiro_admin", "password": "password123"}'

El API responderá con un token JWT que deberá incluir en las cabeceras de las peticiones protegidas.

# Comandos de Gestión en Swarm

    Estado de servicios: docker stack services app_stack

    Escalar backend: docker service scale app_stack_backend=3

    Logs en tiempo real: docker service logs -f app_stack_backend

    Remover stack: docker stack rm app_stack