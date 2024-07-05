#!/bin/bash

# Generate the keyfile
echo "Generating MongoDB keyfile..."
openssl rand -base64 756 > /data/keyfile
chmod 600 /data/keyfile
chown mongodb:mongodb /data/keyfile

# Wait for MongoDB to start
echo "Waiting for MongoDB to start..."
until mongo --eval "print(\"waited for connection\")"
do
    sleep 2
done

# Initialize the replica set
echo "Setting up MongoDB replica set..."
mongo --eval "
rs.initiate();
rs.status();
"
