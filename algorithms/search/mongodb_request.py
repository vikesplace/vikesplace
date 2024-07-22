import datetime
import os
from dotenv import load_dotenv
from pymongo import MongoClient


class MongoDBRequest:
    def __init__(self):
        load_dotenv()
        self.MONGO_HOST = os.getenv("MONGO_HOST")
        self.MONGO_PORT = int(os.getenv("MONGO_PORT"))
        self.MONGO_USER = os.getenv("MONGO_INITDB_ROOT_USERNAME")
        self.MONGO_PASS = os.getenv("MONGO_INITDB_ROOT_PASSWORD")
        self.MONGO_DB = os.getenv("MONGO_INITDB_DATABASE")
        self.MONGO_URI = f"mongodb://{self.MONGO_USER}:{self.MONGO_PASS}@{self.MONGO_HOST}:{self.MONGO_PORT}/{self.MONGO_DB}?replicaSet=rs0"

        # Create a connection to the MongoDB server
        # mongodb://mongoadmin:secret@mongodb:27017/vikesplace?replicaSet=rs0
        self.client = MongoClient(self.MONGO_URI)
        self.db = self.client[self.MONGO_DB]

    def search_history(self, user_id):
        # Access a collection
        # Replace with your collection name
        collection = self.db["user_activity"]

        # Query the database based on user ID
        user_document = collection.find_one({"_id": int(user_id)})
        print(user_document)
        if user_document:
            return user_document["search"]
        else:
            return None

    def write_search_activity(self, user_id, query):
        # Access a collection
        collection = self.db["user_activity"]

        # Using 'upsert', updates doc if it exits, otherwise create a new doc.
        result = collection.update_one(
            filter={"_id": user_id},
            update={"$push": {
                "search": {
                    "query": query,
                    "timestamp": datetime.datetime.now()
                }
            }},
            upsert=True
        )

        if result.upserted_id:
            return result.upserted_id
        else:
            return result.matched_count

    def delete_search_document(self, user_id):
        # Access a collection
        collection = self.db["user_activity"]

        # Using 'upsert', updates doc if it exits, otherwise create a new doc.
        query = {"_id": user_id}

        # Delete a single document that matches the query
        result = collection.delete_one(query)

        return result.deleted_count

    def user_activity(self, user_id):
        # Access a collection
        collection = self.db["user_activity"]

        # Query the database based on user ID
        user_document = list(collection.find(
            filter={"_id": int(user_id)}, sort={"timestamp": -1}))

        if len(user_document) > 0:
            return user_document[0]["listings"]
        else:
            return None

    def write_user_activity(self, user_id, listing_id):
        # Access a collection
        collection = self.db["user_activity"]

        # Using 'upsert', updates doc if it exits, otherwise create a new doc.
        result = collection.update_one(
            filter={"_id": user_id},
            update={"$push": {
                "listings": {
                    "listing_id": listing_id,
                    "timestamp": datetime.datetime.now()
                }
            }},
            upsert=True
        )

        if result.upserted_id:
            return result.upserted_id
        else:
            return result.matched_count

    def delete_user_activity(self, user_id, listing_id):
        # Access a collection
        collection = self.db["user_activity"]

        # Get user doc, find listing_id, get latest listing_id
        user = collection.find_one({"_id": int(user_id)})
        listings = [x for x in user["listings"] if x["listing_id"] == listing_id]
        latest_listing = max(listings, key=lambda item: item["timestamp"])

        # Delete latest_listing_id from document
        result = collection.update_one(
            filter={"_id": int(user_id)},
            update={"$pull": {"listings": {
                "listing_id": latest_listing["listing_id"],
                "timestamp": latest_listing["timestamp"]
            }}})

        return result.modified_count
