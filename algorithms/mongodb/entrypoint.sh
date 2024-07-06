#!/bin/bash
set -e

# Start MongoDB in the background
#mongod --replSet rs0 --bind_ip_all --port 27017 &
mongod --replSet rs0 --bind_ip_all --port 27017&
# Wait for MongoDB to start
until mongosh --eval 'print("waited for connection")'
do
    sleep 2
done

# Run the replica set initiation script
mongosh /docker-entrypoint-initdb.d/init-replica-set.js

mongosh /docker-entrypoint-initdb.d/init-mongo.js
# Bring MongoDB to the foreground
wait
