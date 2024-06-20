#!/bin/sh

listings=$(curl -k --silent --write-out "%{http_code}" --cacert ca.crt --user "${ES_USER}:${ELASTIC_PASSWORD}" -XGET "https://${ES_HOST}:${ES_PORT}/listings/_stats" --output /dev/null)
users=$(curl -k --silent --write-out "%{http_code}" --cacert ca.crt --user "${ES_USER}:${ELASTIC_PASSWORD}" -XGET "https://${ES_HOST}:${ES_PORT}/users/_stats" --output /dev/null)

# Wait for certificate to be generated.
while [ "$listings" -ne 200 ] && [ "$users" -ne 200 ]; do
    
    echo "Waiting for data to be loaded into ElasticSearch..."
    
    sleep 15
    
    listings=$(curl -k --silent --write-out "%{http_code}" --cacert ca.crt --user "${ES_USER}:${ELASTIC_PASSWORD}" -XGET "https://${ES_HOST}:${ES_PORT}/listings/_stats" --output /dev/null)
    users=$(curl -k --silent --write-out "%{http_code}" --cacert ca.crt --user "${ES_USER}:${ELASTIC_PASSWORD}" -XGET "https://${ES_HOST}:${ES_PORT}/users/_stats" --output /dev/null)

done

sleep 10

echo "Loading complete..."

echo "Starting API..."