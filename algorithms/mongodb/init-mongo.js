db = db.getSiblingDB("vikesplace"); // Replace 'mydatabase' with your database name

db.createCollection("user_activity"); // Create the 'users' collection

db.user_activity.insertMany([
  {
    _id: 1,
    search: [
      {
        query: "Laptop",
        timestamp: ISODate("2024-06-14T00:00:00.000Z"),
      },
    ],
    listings: [
      {
        listing_id: 25,
        seller_id: 5,
        title: "Laptop",
        price: 500.0,
        timestamp: ISODate("2024-06-14T01:00:00.000Z"),
      },
      {
        listing_id: 30,
        seller_id: 6,
        title: "Laptop",
        price: 500.0,
        timestamp: ISODate("2024-06-14T02:00:00.000Z"),
      },
      {
        listing_id: 35,
        seller_id: 7,
        title: "Laptop",
        price: 500.0,
        timestamp: ISODate("2024-06-14T03:00:00.000Z"),
      },
    ],
  },
  {
    _id: 2,
    search: [
      {
        query: "Smartphone",
        timestamp: ISODate("2024-06-14T04:00:00.000Z"),
      },
      {
        query: "Smartwatch",
        timestamp: ISODate("2024-06-14T05:00:00.000Z"),
      },
    ],
    listings: [
      {
        listing_id: 31,
        seller_id: 7,
        title: "Smartphone",
        price: 400.0,
        timestamp: ISODate("2024-06-14T06:00:00.000Z"),
      },
      {
        listing_id: 58,
        seller_id: 12,
        title: "Smartwatch",
        price: 250.00,
        timestamp: ISODate("2024-06-14T07:00:00.000Z"),
      },
      {
        listing_id: 43,
        seller_id: 9,
        title: "Smartwatch",
        price: 250.00,
        timestamp: ISODate("2024-06-14T08:00:00.000Z"),
      },
    ],
  },
  {
    _id: 3,
    search: [],
    listings: [],
  },
]);
