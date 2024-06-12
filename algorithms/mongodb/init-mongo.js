db = db.getSiblingDB('mydatabase');  // Replace 'mydatabase' with your database name

db.createCollection('users');  // Create the 'users' collection

db.users.insertMany([
  {
    "_id": "userId123",
    "history": [
        "action 1",
        "action 2",
        "action 3",
    ]
  },
  {
    "_id": "userId124",
    "history": [
        "action 4",
    ]
  },
  {
    "_id": "userId125",
    "history": [
      
    ]
  }
]);
