import os
from dotenv import load_dotenv
from neo4j import GraphDatabase, RoutingControl

load_dotenv()

# ES connection details
NEO4J_USER = os.getenv("NEO4J_USER")
NEO4J_PASSWORD = os.getenv("NEO4J_PASSWORD")

URI = os.getenv("NEO4J_URI")
AUTH = (NEO4J_USER, NEO4J_PASSWORD)


def get_items_visited_by_other_users(user_id_raw):
    user_id = "user_"+str(user_id_raw)
    with GraphDatabase.driver(URI, auth=AUTH) as driver:
        results = driver.execute_query(
            "MATCH (u:User {id: $user_id})-[:HISTORY]->(l:Listing)<-[:HISTORY]-(otherUser:User)-[:HISTORY]->(otherListing:Listing)"
            "WHERE NOT (u)-[:HISTORY]->(otherListing)"
            "RETURN DISTINCT otherListing.id AS id, COUNT(otherListing) AS freq",

            user_id=user_id, database_="neo4j",
        )
    return results.records
