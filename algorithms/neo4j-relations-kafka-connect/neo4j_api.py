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


def print_friends(name):
    with GraphDatabase.driver(URI, auth=AUTH) as driver:
        records, _, _ = driver.execute_query(
            "MATCH (a:Person)-[:KNOWS]->(friend) WHERE a.name = $name "
            "RETURN friend.name ORDER BY friend.name",
            name=name, database_="neo4j", routing_=RoutingControl.READ,
        )
        for record in records:
            print(record["friend.name"])