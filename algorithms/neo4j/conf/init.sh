#!/bin/bash

# Wait for Neo4j to be ready
until cypher-shell -u neo4j -p neo4j_$3ng499 "RETURN 1" > /dev/null 2>&1; do
  echo "Waiting for Neo4j to start..."
  sleep 5
done

echo "Applying constraints to Neo4j..."

# Apply constraints
cypher-shell -u neo4j -p neo4j_$3ng499 <<EOF
CREATE CONSTRAINT ON (u:User) ASSERT u.id IS UNIQUE;
CREATE CONSTRAINT ON (l:Listing) ASSERT l.id IS UNIQUE;
EOF

echo "Constraints applied."
