#!/bin/sh

# Wait for certificate to be generated.
while [ ! -f /usr/share/search/ca/ca.crt ]; do
    echo "Waiting for certificate..."
    sleep 3
done

echo "Copying certificate..."
cp /usr/share/search/ca/ca.crt /search/ca.crt

echo "Using certificate..."
cat /search/ca.crt
