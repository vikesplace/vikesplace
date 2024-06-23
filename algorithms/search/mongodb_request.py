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


def search_history(user_id):
    # Create a connection to the MongoDB server
    client = MongoClient(f"mongodb://{MONGO_USER}:{MONGO_PASS}@{MONGO_HOST}:{MONGO_PORT}/")

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
    client = MongoClient(f"mongodb://{MONGO_USER}:{MONGO_PASS}@{MONGO_HOST}:{MONGO_PORT}/")

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
        upsert= True
    )

    if result.upserted_id:
        return result.upserted_id
    else:
        return result.matched_count
