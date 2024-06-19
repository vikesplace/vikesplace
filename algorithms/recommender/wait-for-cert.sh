#!/bin/sh

# Wait for certificate to be generated.
while [ ! -f /usr/share/recommender/ca/ca.crt ]; do
    echo "Waiting for certificate..."
    sleep 3
done

echo "Copying certificate..."
cp /usr/share/recommender/ca/ca.crt /recommender/ca.crt

echo "Using certificate..."
cat /recommender/ca.crt
