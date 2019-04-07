Guestbook backend
=================

This Spring boot application provides a backend for a 
simple backend application.

It provides one route:

    [url]/entries
    
If you GET from that route, you get the last 10 entries
recorded in the guestbook. POST to that route to add an
entry.


Building the application
------------------------

    gradlew bootJar
    docker --build-arg JAR_FILE=build/libs/*.jar build -t [TAG] .

Configuring the application
---------------------------

The application can either store guestbook entries in memory,
or in a PostgreSQL database.

Any Spring boot style configuration can be used. I'll provide
examples with environment variables.

To run in memory, set:

    export SPRING_PROFILES_ACTIVE=memory
    
To run with PostgreSQL, set:

    export SPRING_PROFILES_ACTIVE=postgres
    export DATABASE_URL=jdbc:postgresql://[hostname]:5432/[dbname]
    export DATABASE_USERNAME=your_name_here
    export DATABASE_PASSWORD=hunter2
