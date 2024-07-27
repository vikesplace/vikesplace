import os
from dotenv import load_dotenv
from neo4j import GraphDatabase, RoutingControl

class Neo4jDBRequest:
    def __init__(self):
        load_dotenv()
        self.NEO4J_USER = os.getenv("NEO4J_USER")
        self.NEO4J_PASSWORD = os.getenv("NEO4J_PASSWORD")
        self.URI = os.getenv("NEO4J_URI")
        self.AUTH = (self.NEO4J_USER, self.NEO4J_PASSWORD)
        self.GD_driver = GraphDatabase.driver(self.URI, auth=self.AUTH)

    def get_items_visited_by_other_users(self, user_id_raw):
        user_id = "user_"+str(user_id_raw)
        with self.GD_driver as driver:
            results = driver.execute_query(
            "MATCH (u:User {id: $user_id})-[:HISTORY]->(l:Listing)<-[:HISTORY]-(otherUser:User)-[:HISTORY]->(otherListing:Listing)"
            "WHERE NOT (u)-[:HISTORY]->(otherListing)"
            "RETURN DISTINCT otherListing.listing_id AS id, COUNT(otherListing) AS freq",

            user_id=user_id, database_="neo4j",
        )
        return results.records

    def get_top_items_within_same_postal_code(self, user_id_raw):
        user_id = "user_"+str(user_id_raw)
        with self.GD_driver as driver:
            results = driver.execute_query(
            f"""
            MATCH (u:User {{id: "{user_id}"}})
            WITH u.lat_long_lat AS lat, u.lat_long_lon AS lon, 5 AS radius
            MATCH (p:PostalCode)
            WITH p, lat, lon, radius, 
                 point({{latitude: p.latitude, longitude: p.longitude}}) AS nodePoint,
                 point({{latitude: lat, longitude: lon}}) AS searchPoint
            WHERE point.distance(nodePoint, searchPoint) <= radius * 1000
            MATCH (l:Listing)-[:LOCATED_IN]->(p)
            OPTIONAL MATCH (l)<-[h:HISTORY]-()
            RETURN DISTINCT l.listing_id as id, COUNT(h) AS freq
            ORDER BY freq ASC
            LIMIT 10
            """,
            user_id=user_id, database="neo4j",
        )
        return results.records
    