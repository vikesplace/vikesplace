from pymongo import MongoClient

# MongoDB connection details
MONGO_HOST = "localhost"
MONGO_PORT = 27017
MONGO_USER = "mongoadmin"
MONGO_PASS = "secret"
MONGO_DB = "mydatabase"  # Replace with your database name

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
