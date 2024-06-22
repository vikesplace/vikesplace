import { createListing } from "../controllers/listing_controller";

jest.mock("../models/listing_models", () => () => {
  const SequelizeMock = require("sequelize-mock");
  const dbMock = new SequelizeMock();
  return dbMock.define("Listing", {
    id: 1,
    title: "test",
    seller_id: "1",
    price: 0,
    location: { type: "Point", coordinates: [1, -1] },
    category: null,
  });
});

describe("Test Sequelize Mocking", () => {
  it("Should get value from mock", async () => {
    let mockRes;
    const test = await createListing({
      body: {
        title: "test",
        seller_id: "1",
        price: 0,
        location: { type: "Point", coordinates: [1, -1] },
        category: null,
      },
    },mockRes);
    console.log(test);
    expect(test).toEqual("good");
  });
});

// // jest.mock("../models/listing_models", () => {
// //   const SequelizeMock = require("sequelize-mock");
// //   const dbMock = new SequelizeMock();
// //   return dbMock.define("Listings", {
// //     id: 1,
// //     title: "test",
// //     seller_id: "1",
// //     price: 0,
// //     location: { type: "Point", coordinates: [1, -1] },
// //     category: null,
// //   });
// // });

// describe("Data Layer Listing Routes", () => {
//   describe("Create Listing", () => {
//     const SequelizeMock = require("sequelize-mock");
//     const dbMock = new SequelizeMock();
//     var ListingMock = dbMock.define(
//       "listings",
//       {
//         id: 1,
//         title: "test",
//         seller_id: "1",
//         price: 0,
//         location: { type: "Point", coordinates: [1, -1] },
//         category: null,
//       }
//     );
//     let mockRes;
//     let mockTest;
//     let mockReq;
//     beforeEach(() => {
//       mockRes = {
//         status: jest.fn().mockReturnThis(),
//         json: jest.fn((test) => {
//           mockTest = test;
//         }),
//       };
//       jest
//         .spyOn(Listings, "create")
//         .mockResolvedValue({ message: "Create Listing" });
//     });
//     it("should create a listing", async () => {
//     //   const test = createListing(
//     //     {
//     //       body: {
//     //         title: "test",
//     //         seller_id: "1",
//     //         price: 0,
//     //         location: { type: "Point", coordinates: [1, -1] },
//     //         category: null,
//     //       },
//     //     },
//     //     mockRes
//     //   );
//         await ListingMock.findOne(   { where: {
//             title: 'title',
//         }}).then(function (listing) {
//             // `user` is a Sequelize Model-like object
//             console.log(listing.get('title'));         // Auto-Incrementing ID available on all Models
//             user.get('email');      // 'email@example.com'; Pulled from default values
//             user.get('username');   // 'my-user'; Pulled from the `where` in the query

//             user.myTestFunc();      // Will return 'Test User' as defined above

//             user.getGroup();        // Will return a `GroupMock` object
//         });
//       console.log(mockTest);
//       console.log(mockTest);
//       expect(mockRes.status).toBeCalledWith(200);
//       //   expect(mockRes.json()).toEqual({ message: "Create Listing" });
//     });

//     // it("it should fail to create", async () => {
//     //   axios.post.mockImplementation(() =>
//     //     Promise.resolve({ data: { message: "Unable to create listing" } })
//     //   );
//     //   let responseObject = {};
//     //   const mockRes = {
//     //     body: {},
//     //     json: jest.fn().mockImplementation((result) => {
//     //       responseObject = result;
//     //     }),
//     //     status: jest.fn(),
//     //   };
//     //   await createListing(
//     //     {
//     //       body: {
//     //         title: "test",
//     //         seller_id: "1",
//     //         price: 0,
//     //         location: { type: "Point", coordinates: [1, -1] },
//     //         category: null,
//     //       },
//     //     },
//     //     mockRes
//     //   );
//     //   expect(responseObject).toEqual({ message: "Unable to create listing" });
//     // });
//   });
// });
