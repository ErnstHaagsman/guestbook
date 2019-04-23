FROM openjdk:8-jdk-alpine

EXPOSE 8080

ARG JAR_FILE
WORKDIR /app
COPY ${JAR_FILE} /app/app.jar

ENV SPRING_PROFILES_ACTIVE=memory

CMD ["java", "-jar", "/app/app.jar"]
