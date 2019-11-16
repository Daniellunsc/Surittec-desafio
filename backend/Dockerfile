FROM maven:3.5.2-jdk-8-alpine AS MAVEN_BUILD
COPY pom.xml /build/
COPY src /build/src/
WORKDIR /build/
RUN mvn package -DskipTests
RUN ls /build/target
FROM openjdk:8-jre-alpine
WORKDIR /app
COPY --from=0 /build/target/* /app/
RUN ls
ENTRYPOINT ["java", "-jar", "surittec-backend.jar"]
