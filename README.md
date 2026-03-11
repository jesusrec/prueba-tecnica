# Prueba Técnica: Fullstack App con Docker Swarm
​Esta solución representa una arquitectura de microservicios diseñada para entornos de producción, utilizando Spring Boot 3 en el backend, React en el frontend (servido por Nginx) y PostgreSQL para la persistencia de datos. El despliegue está orquestado mediante Docker Swarm, garantizando resiliencia, escalabilidad y balanceo de carga nativo.

​# Arquitectura del Sistema
​La solución se basa en un diseño desacoplado que utiliza una red virtual de tipo overlay para la comunicación segura entre servicios:

• ​Capa de Presentación (Frontend): Aplicación SPA (Single Page Application) desarrollada en React. Se utiliza Nginx como servidor web de alto rendimiento para servir los activos estáticos y gestionar el enrutamiento interno.
• ​Capa de Negocio (Backend): API REST robusta construida con Java 17 y Spring Boot 3. Implementa seguridad avanzada mediante JSON Web Tokens (JWT).
• ​Seguridad: Las credenciales de usuario están protegidas mediante el algoritmo de hashing BCrypt, asegurando que la información sensible nunca se almacene en texto plano.
• ​Persistencia: Instancia de PostgreSQL 15 optimizada, configurada con volúmenes de Docker para garantizar la integridad de los datos ante reinicios de los contenedores.
• ​Orquestación: Despliegue gestionado por Docker Swarm, lo que permite definir réplicas de los servicios para asegurar la alta disponibilidad.


​# Documentación de la API (Swagger)
​Para facilitar la revisión técnica, se ha integrado OpenAPI/Swagger. Esta interfaz permite visualizar y probar todos los endpoints disponibles de forma interactiva.
• ​Swagger UI: http://localhost:8080/swagger-ui/index.html

​# Guía de Despliegue (Docker Swarm)
​Para ejecutar el ecosistema completo bajo orquestación, siga estos pasos desde la raíz del proyecto: 

1.- Inicializar el Clúster (si no está activo):
  
docker swarm init

2.- Construir las Imágenes de los Microservicios:

docker build -t prueba-tecnica-backend:latest ./backend
docker build -t prueba-tecnica-frontend:latest ./frontend

3.- Desplegar el Stack Completo:

docker stack deploy -c docker-compose.yml app_stack

# Pruebas en Entorno de Desarrollo (Local)
​Si desea ejecutar o depurar los servicios de forma individual fuera de Swarm:
​Requisitos Previos
• ​Java 17+
• ​Node.js 18+
• ​Docker (para la base de datos)
​Pasos para Ejecución Local:

1.- Levantar Base de Datos (Docker):

docker run --name pg-local -e POSTGRES_PASSWORD=password -p 5432:5432 -d postgres:15-alpine

2.- Ejecutar Backend:

cd backend
./mvnw spring-boot:run

3.- Ejecutar Frontend:

cd frontend
npm install && npm run dev


# Flujo de Pruebas de Autenticación (CURL)
​Una vez que el sistema esté en línea, puede validar la seguridad y el registro con los siguientes comandos:
​1. Registro de Nuevo Usuario:

curl -X POST http://localhost:8080/users \
     -H "Content-Type: application/json" \
     -d '{
           "username": "ramiro_dev",
           "password": "password123",
           "email": "ramiro@ejemplo.com"
         }'

2. Inicio de Sesión (Obtención de JWT):

curl -X POST http://localhost:8080/auth/login \
     -H "Content-Type: application/json" \
     -d '{
           "username": "ramiro_dev",
           "password": "password123"
         }'

# Comandos Útiles de Administración
• ​Estado de réplicas y servicios: docker stack services app_stack
• ​Escalar el backend (Alta Disponibilidad): docker service scale app_stack_backend=3
• ​Logs en tiempo real: docker service logs -f app_stack_backend
• ​Detener y remover el stack: docker stack rm app_stack