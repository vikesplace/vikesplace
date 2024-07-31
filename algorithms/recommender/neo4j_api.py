import os
from dotenv import load_dotenv
from neo4j import AsyncGraphDatabase, RoutingControl
import similarity as similarity

class Neo4jDBRequest:
    def __init__(self):
        load_dotenv()
        self.NEO4J_USER = os.getenv("NEO4J_USER")
        self.NEO4J_PASSWORD = os.getenv("NEO4J_PASSWORD")
        self.URI = os.getenv("NEO4J_URI")
        self.AUTH = (self.NEO4J_USER, self.NEO4J_PASSWORD)
        self.GD_driver = AsyncGraphDatabase.driver(self.URI, auth=self.AUTH)

    async def get_items_visited_by_other_users(self, user_id_raw):
        user_id = "user_"+str(user_id_raw)
        async with self.GD_driver as driver:
            results = await driver.execute_query(
            f"""
            MATCH (u:User {{id: "{user_id}"}})-[:HISTORY]->(l:Listing)<-[:HISTORY]-(otherUser:User)-[:HISTORY]->(otherListing:Listing)
            WHERE NOT (u)-[:HISTORY]->(otherListing)
            RETURN DISTINCT otherListing.listing_id AS id, otherListing.title AS title, COUNT(otherListing) AS freq
            ORDER BY freq DESC
            LIMIT 25
            """,
            user_id=user_id, database_="neo4j",
        )
        if len(results.records) < 25:
            additional_results_records = await self.get_top_items_within_same_postal_code(user_id_raw)
            #print(results.records)
            results.records.extend(additional_results_records)
        return results.records

    async def get_top_items_within_same_postal_code(self, user_id_raw):
        user_id = "user_"+str(user_id_raw)
        async with self.GD_driver as driver:
            results = await driver.execute_query(
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
            RETURN DISTINCT l.listing_id as id, l.title AS title, COUNT(h) AS freq
            ORDER BY freq ASC
            LIMIT 25
            """,
            user_id=user_id, database="neo4j",
        )
        return results.records

# Sent_Model = similarity.Sent_Model()

# neo4jOBJ = Neo4jDBRequest()

# results = neo4jOBJ.get_items_visited_by_other_users(18)

# results = list(results)

# results = [dict(item) for item in results]

# ignored_listings = []

# full_results = Sent_Model.remove_from_recommendations_sorted(ignored_listings, results)

# print(full_results)