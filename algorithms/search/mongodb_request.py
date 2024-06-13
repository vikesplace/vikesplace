from pymongo import MongoClient
from dotenv import load_dotenv
import os

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
    collection = db["users"]  # Replace with your collection name

    # Query the database based on user ID
    user_document = collection.find_one({"_id": user_id})

    if user_document:
        return user_document["history"]
    else:
        return None


# Example usage
#print(search_history("userId123"))
