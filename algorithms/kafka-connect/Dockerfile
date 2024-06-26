FROM confluentinc/cp-kafka-connect:latest

# Set environment variables for Kafka Connect
ENV CONNECT_BOOTSTRAP_SERVERS=kafka:9092 \
    CONNECT_REST_ADVERTISED_HOST_NAME=kafka-connect \
    CONNECT_GROUP_ID=kafka-connect-group \
    CONNECT_CONFIG_STORAGE_TOPIC=connect-configs \
    CONNECT_OFFSET_STORAGE_TOPIC=connect-offsets \
    CONNECT_STATUS_STORAGE_TOPIC=connect-status \
    CONNECT_KEY_CONVERTER=org.apache.kafka.connect.json.JsonConverter \
    CONNECT_VALUE_CONVERTER=org.apache.kafka.connect.json.JsonConverter \
    CONNECT_KEY_CONVERTER_SCHEMAS_ENABLE=false \
    CONNECT_VALUE_CONVERTER_SCHEMAS_ENABLE=false \
    CONNECT_PLUGIN_PATH=/usr/share/java\
    CONNECT_CONFIG_STORAGE_REPLICATION_FACTOR=1\
    CONNECT_OFFSET_STORAGE_REPLICATION_FACTOR=1\
    CONNECT_STATUS_STORAGE_REPLICATION_FACTOR=1

# Set environment variables for PostgreSQL credentials
ENV POSTGRES_USER=${POSTGRES_USER}
ENV POSTGRES_PASSWORD=${POSTGRES_PASSWORD}
ENV NEO4J_PASSWORD=${NEO4J_PASSWORD}
ENV NEO4J_USER==${NEO4J_USER}

# Copy connectors to the plugin path
COPY ./confluentinc-kafka-connect-jdbc-10.7.6 /usr/share/java
COPY ./neo4j-kafka-connect-neo4j-5.0.5 /usr/share/java

# Copy the connector configuration files
COPY ./jdbc-postgres-users-source.json /etc/kafka-connect/
COPY ./jdbc-postgres-listings-source.json /etc/kafka-connect/
COPY ./neo4j-sink.json /etc/kafka-connect/

# Copy the startup script
COPY start-kafka-connect.sh /etc/kafka-connect/start-kafka-connect.sh

# Temporarily switch to root user to set permissions
USER root

# Make the script executable
RUN chmod +x /etc/kafka-connect/start-kafka-connect.sh

# Switch back to appuser
USER appuser

# Use the startup script as the CMD
CMD ["/etc/kafka-connect/start-kafka-connect.sh"]
