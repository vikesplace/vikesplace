#!/bin/sh

# Start Kafka Connect in the background
/etc/confluent/docker/run &

# Wait for Kafka Connect to be ready
while ! nc -z localhost 8083; do
  echo "Waiting for Kafka Connect to start..."
  sleep 5
done

# Function to register connectors
register_connectors() {
  curl -X POST -H 'Content-Type: application/json' --data @/etc/kafka-connect/jdbc-postgres-users-source.json http://localhost:8083/connectors
  curl -X POST -H 'Content-Type: application/json' --data @/etc/kafka-connect/jdbc-postgres-listings-source.json http://localhost:8083/connectors
  curl -X POST -H 'Content-Type: application/json' --data @/etc/kafka-connect/neo4j-sink.json http://localhost:8083/connectors
}

# Initial registration of connectors
register_connectors

# Periodic synchronization every 5 minutes (300 seconds)
while true; do
  echo "Synchronizing connectors..."
  register_connectors
  sleep 300
done

# Wait for Kafka Connect to terminate (forwarding signals)
wait
