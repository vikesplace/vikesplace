import os

from dotenv import load_dotenv
from pymongo import MongoClient

# Load environment variables from .env file
load_dotenv()

# MongoDB connection details
MONGO_HOST = os.getenv("MONGO_HOST")
MONGO_PORT = int(os.getenv("MONGO_PORT"))  # Convert to int if necessary
MONGO_USER = os.getenv("MONGO_INITDB_ROOT_USERNAME")
MONGO_PASS = os.getenv("MONGO_INITDB_ROOT_PASSWORD")
MONGO_DB = os.getenv("MONGO_INITDB_DATABASE")

MONGO_URI = f"mongodb://{MONGO_USER}:{MONGO_PASS}@{MONGO_HOST}:{MONGO_PORT}/{MONGO_DB}?replicaSet=rs0"

def user_activity(user_id):
    # Create a connection to the MongoDB server
    client = MongoClient(MONGO_URI)

    # Access the database
    db = client[MONGO_DB]

    # Access a collection
    collection = db["user_activity"]  # Replace with your collection name

    # Query the database based on user ID
    user_document = list(collection.find(
        filter={"_id": int(user_id)}, sort={"timestamp": -1}))

    if len(user_document) > 0:
        return user_document[0]["listings"]
    else:
        return None


def latest_user_activity(user_id):
    # Create a connection to the MongoDB server
    client = MongoClient(MONGO_URI)
    db = client[MONGO_DB]
    collection = db["user_activity"]

    # Query the database based on user ID
    user_document = collection.find_one(
        filter={"_id": int(user_id)}, sort={"timestamp": -1})

    if len(user_document) > 0:
        return user_document[0]["listings"]
    else:
        return None


def get_top_10_popular():
    # Create a connection to the MongoDB server
    client = MongoClient(MONGO_URI)
    db = client[MONGO_DB]
    collection = db["user_activity"]

    pipeline = [
        {"$unwind": "$listings"},
        {"$group": {
            "_id": "$listings.listing_id",
            "count": {"$sum": 1}
        }},
        {"$sort": {"count": -1}},
        {"$limit": 10}
    ]

    results = list(collection.aggregate(pipeline))
    # rename _id to listing_id 
    for i in results:
        i["listing_id"] = i.pop("_id")

    return results
