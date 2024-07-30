import datetime
import os

from dotenv import load_dotenv
from pymongo import MongoClient

class MongoDBRequest:
    def __init__(self):
        load_dotenv()

        # MongoDB connection details
        self.MONGO_HOST = os.getenv("MONGO_HOST")
        self.MONGO_PORT = int(os.getenv("MONGO_PORT"))  # Convert to int if necessary
        self.MONGO_USER = os.getenv("MONGO_INITDB_ROOT_USERNAME")
        self.MONGO_PASS = os.getenv("MONGO_INITDB_ROOT_PASSWORD")
        self.MONGO_DB = os.getenv("MONGO_INITDB_DATABASE")

        self.MONGO_URI = f"mongodb://{self.MONGO_USER}:{self.MONGO_PASS}@{self.MONGO_HOST}:{self.MONGO_PORT}/{self.MONGO_DB}?replicaSet=rs0"
        # Create a connection to the MongoDB server
        self.client = MongoClient(self.MONGO_URI)

        # Access the database
        self.db = self.client[self.MONGO_DB]

        
    def user_activity(self, user_id):
        # Access a collection
        collection = self.db["user_activity"]  # Replace with your collection name

        # Query the database based on user ID
        user_document = list(collection.find(
            filter={"_id": int(user_id)}, sort={"timestamp": -1}))

        if len(user_document) > 0:
            try:
                return user_document[0]["listings"]
            except:
                return None
        else:
            return None

    def latest_user_activity(self, user_id):
        # Access a collection
        collection = self.db["user_activity"]

        # Query the database based on user ID
        user_document = collection.find_one(
            filter={"_id": int(user_id)}, sort={"timestamp": -1})

        if len(user_document) > 0:
            return user_document[0]["listings"]
        else:
            return None


    def get_top_popular(self, num_items=None):
        collection = self.db["user_activity"]

        if num_items is None:
            num_items = 20

        pipeline = [
            {"$unwind": "$listings"},
            {"$group": {
                "_id": "$listings.listing_id",
                "count": {"$sum": 1}
            }},
            {"$sort": {"count": -1}},
            {"$limit": num_items}
        ]

        results = list(collection.aggregate(pipeline))
        # rename _id to listing_id
        for i in results:
            i["listing_id"] = i.pop("_id")

        return results


    def ignored_listings(self, user_id, num_items=None):
        # Access a collection
        collection = self.db["user_activity"]  # Replace with your collection name

        # Query the database based on user ID
        user_document = collection.find_one({"_id": int(user_id)})

        if user_document:
            try:
                if num_items:
                    # return last x items.
                    return user_document["ignored"][-num_items:]
                return user_document["ignored"]
            except:
                return None
        else:
            return []


    def write_ignored(self, user_id, listing_id):
        # Access a collection
        collection = self.db["user_activity"]

        # Using 'upsert', updates doc if it exits, otherwise create a new doc.
        result = collection.update_one(
            filter={"_id": user_id},
            update={"$push": {
                "ignored": {
                    "listing_id": listing_id,
                    "timestamp": datetime.datetime.now()
                }
            }},
            upsert=True
        )

        return result.modified_count


    def delete_ignored(self, user_id, listing_id):
        # Access a collection
        collection = self.db["user_activity"]

        # Get user doc, find listing_id, get latest listing_id
        user = collection.find_one({"_id": int(user_id)})
        listings = [x for x in user["ignored"] if x["listing_id"] == listing_id]
        latest_listing = max(listings, key=lambda item: item["timestamp"])

        # Delete latest_listing_id from document
        result = collection.update_one(
            filter={"_id": int(user_id)},
            update={"$pull": {"ignored": {
                "listing_id": latest_listing["listing_id"],
                "timestamp": latest_listing["timestamp"]
            }}})

        return result.modified_count
