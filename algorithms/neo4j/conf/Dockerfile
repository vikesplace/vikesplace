FROM neo4j:4.4.35-enterprise

#ENV NEO4JLABS_PLUGINS__ENABLED__PLUGIN__INSTALL=false

# Copy the CSV file into the container
COPY postcodes.csv /var/lib/neo4j/import/postcodes.csv

# Set the appropriate permissions
RUN chmod 644 /var/lib/neo4j/import/postcodes.csv && \
    chown neo4j:neo4j /var/lib/neo4j/import/postcodes.csv

# Copy the APOC configuration if needed
COPY apoc.conf /var/lib/neo4j/conf/apoc.conf
