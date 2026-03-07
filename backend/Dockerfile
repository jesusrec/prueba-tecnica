# Etapa 1: Construcción (Build)
# Cambiamos a eclipse-temurin para asegurar disponibilidad
FROM maven:3.8.5-eclipse-temurin-17 AS build
WORKDIR /app

COPY pom.xml .
RUN mvn dependency:go-offline

COPY src ./src
RUN mvn clean package -DskipTests

# Etapa 2: Ejecución (Runtime)
# Cambiamos openjdk:17-jdk-slim por eclipse-temurin:17-jre-alpine (más ligera y segura)
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app

COPY --from=build /app/target/*.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]