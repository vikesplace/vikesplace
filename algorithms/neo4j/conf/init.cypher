CREATE CONSTRAINT ON (u:User) ASSERT u.id IS UNIQUE;
CREATE CONSTRAINT ON (l:Listing) ASSERT l.id IS UNIQUE;

// Load postcodes
//LOAD CSV WITH HEADERS FROM 'file:///var/lib/neo4j/import/postcodes.csv' AS row
//CREATE (p:PostalCode {id: row.POSTAL_CODE, latitude: row.LATITUDE, longitude: row.LONGITUDE});

CREATE INDEX postal_code_location FOR (p:PostalCode) ON (p.latitude, p.longitude);
CREATE CONSTRAINT ON (p:PostalCode) ASSERT p.code IS UNIQUE;
