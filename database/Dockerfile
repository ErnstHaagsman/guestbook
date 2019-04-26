FROM postgres:9.6

COPY schema.sql /docker-entrypoint-initdb.d/00-schema.sql
COPY grant.sql /docker-entrypoint-initdb.d/01-grant.sql
