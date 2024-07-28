import os
from dotenv import load_dotenv
from neo4j import GraphDatabase

load_dotenv()

NEO4J_USER = os.getenv("NEO4J_USER")
NEO4J_PASSWORD = os.getenv("NEO4J_PASSWORD")

URI = "neo4j://neo4j:7687"
AUTH = (NEO4J_USER, NEO4J_PASSWORD)

with GraphDatabase.driver(URI, auth=AUTH) as driver:
    print("Creating User constraint...")
    driver.execute_query(
        "CREATE CONSTRAINT ON (u:User) ASSERT u.id IS UNIQUE;",
        database_="neo4j",
    )

    print("Creating Listing constraint...")
    driver.execute_query(
        "CREATE CONSTRAINT ON (l:Listing) ASSERT l.id IS UNIQUE;",
        database_="neo4j",
    )

    print("Loading Postal Codes...")
    driver.execute_query(
        "LOAD CSV WITH HEADERS FROM 'file:///var/lib/neo4j/import/postcodes.csv' AS row MERGE (p:PostalCode {id: row.POSTAL_CODE}) SET p.latitude = toFloat(row.LATITUDE), p.longitude = toFloat(row.LONGITUDE);",
        database_="neo4j",
    )

    print("Creating Postal Code Index...")
    driver.execute_query(
        "CREATE INDEX postal_code_location FOR (p:PostalCode) ON (p.latitude, p.longitude);",
        database_="neo4j",
    )

    print("Creating Postal Code constraint...")
    driver.execute_query(
        "CREATE CONSTRAINT ON (p:PostalCode) ASSERT p.code IS UNIQUE;",
        database_="neo4j",
    )

    print("Exiting...")
    exit()