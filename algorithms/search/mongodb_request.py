import datetime
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


def search_history(user_id):
    # Create a connection to the MongoDB server
    client = MongoClient(MONGO_URI)
    # mongodb://mongoadmin:secret@mongodb:27017/vikesplace?replicaSet=rs0

    # Access the database
    db = client[MONGO_DB]

    # Access a collection
    collection = db["user_activity"]  # Replace with your collection name

    # Query the database based on user ID
    user_document = collection.find_one({"_id": int(user_id)})
    print(user_document)
    if user_document:
        return user_document["search"]
    else:
        return None


def write_search_activity(user_id, query):
    # Create a connection to the MongoDB server
    client = MongoClient(MONGO_URI)

    # Access the database
    db = client[MONGO_DB]

    # Access a collection
    collection = db["user_activity"]

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


def delete_search_document(user_id):
    # Create a connection to the MongoDB server
    client = MongoClient(MONGO_URI)

    # Access the database
    db = client[MONGO_DB]

    # Access a collection
    collection = db["user_activity"]

    # Using 'upsert', updates doc if it exits, otherwise create a new doc.
    query = {"_id": user_id}

    # Delete a single document that matches the query
    result = collection.delete_one(query)

    return result.deleted_count


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


def write_user_activity(user_id, listing_id):
    # Create a connection to the MongoDB server
    client = MongoClient(MONGO_URI)

    # Access the database
    db = client[MONGO_DB]

    # Access a collection
    collection = db["user_activity"]

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


def delete_user_activity(user_id, listing_id):
    # Create a connection to the MongoDB server
    client = MongoClient(MONGO_URI)

    # Access the database
    db = client[MONGO_DB]

    # Access a collection
    collection = db["user_activity"]

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
