#!/bin/sh

listings=$( curl -k --silent --cacert ca.crt --user "${ES_USER}:${ELASTIC_PASSWORD}" -XGET "https://${ES_HOST}:${ES_PORT}/listings/_count" | jq -r '.count' )
users=$( curl -k --silent --cacert ca.crt --user "${ES_USER}:${ELASTIC_PASSWORD}" -XGET "https://${ES_HOST}:${ES_PORT}/users/_count" | jq -r '.count' )

# Wait for ES to be loaded, listings and users should have 100 and 20 records, respectively.
while [ "$listings" = "null" ] || [ "$users" = "null" ] || [ "$listings" -lt 100 ] || [ "$users" -lt 20 ]; do
    
    echo "Waiting for data to be loaded into ElasticSearch..."
    
    sleep 5
    
    listings=$( curl -k --silent --cacert ca.crt --user "${ES_USER}:${ELASTIC_PASSWORD}" -XGET "https://${ES_HOST}:${ES_PORT}/listings/_count" | jq -r '.count' )
    users=$( curl -k --silent --cacert ca.crt --user "${ES_USER}:${ELASTIC_PASSWORD}" -XGET "https://${ES_HOST}:${ES_PORT}/users/_count" | jq -r '.count' )

done

sleep 5

echo "Loading complete..."

echo "Starting API..."