db = db.getSiblingDB("vikesplace"); // Replace 'mydatabase' with your database name

db.createCollection("user_activity"); // Create the 'users' collection

// db.user_activity.insertMany([
//   {
//     _id: 1,
//     search: [
//       { query: "Laptop", timestamp: ISODate("2024-06-14T00:00:00.000Z") }
//     ],
//     listings: [
//       { listing_id: 25, timestamp: ISODate("2024-06-14T01:00:00.000Z") },
//       { listing_id: 30, timestamp: ISODate("2024-06-14T01:00:00.000Z") },
//       { listing_id: 35, timestamp: ISODate("2024-06-14T01:00:00.000Z") }
//     ],
//     latest_update: ISODate("2024-06-14T03:00:00.000Z")
//   },
//   {
//     _id: 2,
//     search: [
//       { query: "Smartphone", timestamp: ISODate("2024-06-14T04:00:00.000Z") },
//       { query: "Smartwatch", timestamp: ISODate("2024-06-14T05:00:00.000Z") }
//     ],
//     listings: [
//       { listing_id: 31, timestamp: ISODate("2024-06-14T06:00:00.000Z") },
//       { listing_id: 58, timestamp: ISODate("2024-06-14T07:00:00.000Z") },
//       { listing_id: 43, timestamp: ISODate("2024-06-14T08:00:00.000Z") }
//     ],
//     latest_update: ISODate("2024-06-14T03:00:00.000Z")
//   },
//   {
//     _id: 3,
//     search: [
//       { query: "Headphones", timestamp: ISODate("2024-06-14T00:00:00.000Z") },
//       { query: "Speaker", timestamp: ISODate("2024-06-16T12:00:00.000Z") }
//     ],
//     listings: [
//       { listing_id: 4, timestamp: ISODate("2024-06-14T03:00:00.000Z") },
//       { listing_id: 28, timestamp: ISODate("2024-06-14T03:00:00.000Z") },
//       { listing_id: 19, timestamp: ISODate("2024-06-14T03:00:00.000Z") }
//     ],
//     latest_update: ISODate("2024-06-14T03:00:00.000Z")
//   },
//   {
//     _id: 4,
//     search: [
//       { query: "Keyboard", timestamp: ISODate("2024-06-14T00:00:00.000Z") },
//       { query: "Mouse", timestamp: ISODate("2024-06-17T13:00:00.000Z") }
//     ],
//     listings: [
//       { listing_id: 16, timestamp: ISODate("2024-06-14T04:00:00.000Z") },
//     ],
//     latest_update: ISODate("2024-06-14T03:00:00.000Z")
//   },
//   {
//     _id: 5,
//     search: [
//       { query: "Camera", timestamp: ISODate("2024-06-14T00:00:00.000Z") },
//       { query: "Lens", timestamp: ISODate("2024-06-18T14:00:00.000Z") }
//     ],
//     listings: [
//       { listing_id: 7, timestamp: ISODate("2024-06-14T05:00:00.000Z") },
//     ],
//     latest_update: ISODate("2024-06-14T03:00:00.000Z")
//   },
//   {
//     _id: 6,
//     search: [
//       { query: "Printer", timestamp: ISODate("2024-06-14T00:00:00.000Z") },
//       { query: "Scanner", timestamp: ISODate("2024-06-19T15:00:00.000Z") }
//     ],
//     listings: [
//       { listing_id: 21, timestamp: ISODate("2024-06-14T06:00:00.000Z") },
//     ],
//     latest_update: ISODate("2024-06-14T03:00:00.000Z")
//   },
//   {
//     _id: 7,
//     search: [
//       { query: "Chair", timestamp: ISODate("2024-06-14T00:00:00.000Z") },
//       { query: "Coffee", timestamp: ISODate("2024-06-14T00:00:00.000Z") }
//     ],
//     listings: [
//       { listing_id: 3, timestamp: ISODate("2024-06-14T07:00:00.000Z") },
//       { listing_id: 24, timestamp: ISODate("2024-06-14T07:00:00.000Z") },
//       { listing_id: 45, timestamp: ISODate("2024-06-14T07:00:00.000Z") },
//       { listing_id: 29, timestamp: ISODate("2024-06-14T10:00:00.000Z") },
//       { listing_id: 81, timestamp: ISODate("2024-06-14T10:00:00.000Z") }
//     ],
//     latest_update: ISODate("2024-06-14T03:00:00.000Z")
//   },
//   {
//     _id: 8,
//     search: [
//       { query: "Office Chair", timestamp: ISODate("2024-06-14T00:00:00.000Z") },
//       { query: "Coffee", timestamp: ISODate("2024-06-14T00:00:00.000Z") }
//     ],
//     listings: [
//       { listing_id: 24, timestamp: ISODate("2024-06-14T07:00:00.000Z") },
//       { listing_id: 29, timestamp: ISODate("2024-06-14T10:00:00.000Z") },
//       { listing_id: 81, timestamp: ISODate("2024-06-14T10:00:00.000Z") }
//     ],
//     latest_update: ISODate("2024-06-14T03:00:00.000Z")
//   },
//   {
//     _id: 9,
//     search: [
//       { query: "Lamp", timestamp: ISODate("2024-06-14T00:00:00.000Z") },
//       { query: "Coffee", timestamp: ISODate("2024-06-14T00:00:00.000Z") }
//     ],
//     listings: [
//       { listing_id: 65, timestamp: ISODate("2024-06-14T09:00:00.000Z") },
//       { listing_id: 75, timestamp: ISODate("2024-06-14T09:00:00.000Z") },
//       { listing_id: 29, timestamp: ISODate("2024-06-14T10:00:00.000Z") },
//       { listing_id: 81, timestamp: ISODate("2024-06-14T10:00:00.000Z") }
//     ],
//     latest_update: ISODate("2024-06-14T03:00:00.000Z")
//   },
//   {
//     _id: 10,
//     search: [
//       { query: "Coffee", timestamp: ISODate("2024-06-14T00:00:00.000Z") },
//     ],
//     listings: [
//       { listing_id: 29, timestamp: ISODate("2024-06-14T10:00:00.000Z") },
//       { listing_id: 81, timestamp: ISODate("2024-06-14T10:00:00.000Z") }
//     ],
//     latest_update: ISODate("2024-06-14T03:00:00.000Z")
//   }
// ]);

//db = db.getSiblingDB("admin");
db.createUser({
  user: "mongoadmin",
  pwd: "secret",
  roles: [
    { role: "userAdminAnyDatabase", db: "admin" },
    { role: "readWriteAnyDatabase", db: "admin" }
  ]
});
