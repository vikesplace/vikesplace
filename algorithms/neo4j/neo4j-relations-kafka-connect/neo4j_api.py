import os
from dotenv import load_dotenv
from neo4j import GraphDatabase, RoutingControl

load_dotenv()

# ES connection details
NEO4J_USER = os.getenv("NEO4J_USER")
NEO4J_PASSWORD = os.getenv("NEO4J_PASSWORD")

URI = "neo4j://neo4j:7687"
AUTH = (NEO4J_USER, NEO4J_PASSWORD)


def add_relation(user_id_raw, listing_id_raw):
    user_id = "user_"+str(user_id_raw)
    listing_id = "listing_"+str(listing_id_raw)
    with GraphDatabase.driver(URI, auth=AUTH) as driver:
        driver.execute_query(
            "MERGE (u:User {id: $user_id})"
            "MERGE (l:Listing {id: $listing_id})"
            "MERGE (u)-[:HISTORY {rating: 3}]->(l)" , # "CREATE (a)-[:HISTORY {since: 2023}]->(b)"
            user_id=user_id, listing_id=listing_id, database_="neo4j",
        )

def add_postal_code_relation_user(user_id_raw, postal_code):
    user_id = "user_"+str(user_id_raw)
    
    with GraphDatabase.driver(URI, auth=AUTH) as driver:
        driver.execute_query(
            "MERGE (u:User {id: $user_id})"
            "MERGE (p:PostalCode {id: $postal_code})"
            "MERGE (u)-[:nearby {rating: 3}]->(p)" , 
            user_id=user_id, postal_code=postal_code, database_="neo4j",
        )

def add_postal_code_relation_listing(listing_id_raw, postal_code):
    listing_id = "listing_"+str(listing_id_raw)

    with GraphDatabase.driver(URI, auth=AUTH) as driver:
        driver.execute_query(
            "MERGE (u:Listing {id: $listing_id})"
            "MERGE (p:PostalCode {id: $postal_code})"
            "MERGE (u)-[:nearby {rating: 3}]->(p)" , 
            listing_id=listing_id, postal_code=postal_code, database_="neo4j",
        )

def add_postal_codes():
    with GraphDatabase.driver(URI, auth=AUTH) as driver:
        driver.execute_query(
            #"LOAD CSV WITH HEADERS FROM 'file:///var/lib/neo4j/import/postcodes.csv' AS row MERGE (p:PostalCode {id: row.POSTAL_CODE, latitude: row.LATITUDE, longitude: row.LONGITUDE});",
            "LOAD CSV WITH HEADERS FROM 'file:///var/lib/neo4j/import/postcodes.csv' AS row MERGE (p:PostalCode {id: row.POSTAL_CODE}) SET p.latitude = toFloat(row.LATITUDE), p.longitude = toFloat(row.LONGITUDE);",
            database_="neo4j",
        )
        driver.execute_query(
            "CREATE INDEX postal_code_location FOR (p:PostalCode) ON (p.latitude, p.longitude);",
            database_="neo4j",
        )
