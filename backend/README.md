## 🚀 Prueba Técnica: API de Gestión de Usuarios

Este proyecto es una API REST robusta construida con **Spring Boot 3**, diseñada para la gestión segura de usuarios. Implementa estándares de arquitectura limpia, seguridad con JWT y documentación interactiva.

## 🛠️ Tecnologías Utilizadas

* **Java 17** & **Spring Boot 3.2.2**
* **Spring Security** con **JWT** (JSON Web Tokens)
* **Spring Data JPA** & **PostgreSQL**
* **Docker** (para la base de datos)
* **Maven** (gestor de dependencias)
* **Swagger / OpenAPI 3** (documentación de API)

## 🏗️ Requisitos Previos

* Docker y Docker Compose.
* Java 17 instalado (o uso de Codespaces).
* Maven 3.x.

## 🚀 Instalación y Despliegue

### 1. Levantar la Base de Datos
Desde la raíz del proyecto, ejecuta:
```bash
docker-compose up -d

2. Compilar y Ejecutar el Backend

Entra a la carpeta del backend y arranca el servicio:
Bash

cd backend
mvn clean spring-boot:run

La API estará disponible en: http://localhost:8080
📚 Documentación Interactiva (Swagger)

Una vez que el servicio esté corriendo, puedes acceder a la interfaz de Swagger para probar los endpoints:

🔗 URL: http://localhost:8080/swagger-ui/index.html

    Nota: Para probar los endpoints protegidos (GET, PUT, DELETE), primero debes registrar un usuario, hacer login para obtener el Token y usar el botón "Authorize" en Swagger.

🔒 Características Principales

    *Autenticación y Seguridad (JWT)

    La API utiliza JSON Web Tokens (JWT) para proteger los recursos. El flujo de autenticación es el siguiente:

    Registro: Crea un usuario en POST /users.

    Login: Envía tus credenciales a POST /auth/login.

    Token: Recibirás un JSON con un accessToken.

    Uso: Incluye este token en el encabezado de todas tus peticiones protegidas:

    Authorization: Bearer <tu_token_aquí>

    Seguridad: Contraseñas encriptadas con BCrypt.

    Validación de Negocio: El sistema impide el registro de correos electrónicos duplicados.

    Protección de Datos: Implementación de DTOs (Data Transfer Objects) para evitar la exposición de hashes de contraseñas en las respuestas JSON.

    CORS Configurado: Listo para conectar con aplicaciones Frontend (React/Angular).

Desarrollado por Jesús Ramiro Espada