import axios from "axios";
import { createListing } from "../controller/create_listing";
import { getSellerListings } from "../controller/get_seller_listings";
jest.mock("axios");

describe("Listing Routes", () => {
  it("should create a listing", async () => {
    axios.post.mockImplementationOnce(() => Promise.resolve({ data: 1 }));
    let responseObject = {};
    const mockRes = {
      body: {},
      json: jest.fn().mockImplementationOnce((result) => {
        responseObject = result;
      }),
      status: jest.fn(),
    };
    await createListing(
      {
        body: {
          title: "test",
          seller_id: "1",
          price: 0,
          location: { type: "Point", coordinates: [1, -1] },
          category: null,
        },
      },
      mockRes
    );
    expect(responseObject).toEqual(1);
  });

  it("it should fail to create", async () => {
    axios.post.mockImplementationOnce(() =>
      Promise.resolve({ data: { message: "Invalid input data" } })
    );
    let responseObject = {};
    const mockRes = {
      body: {},
      json: jest.fn().mockImplementationOnce((result) => {
        responseObject = result;
      }),
      status: jest.fn(),
    };
    await createListing(
      {
        body: {
          title: "test",
          seller_id: "1",
          price: 0,
          location: { type: "Point", coordinates: [1, -1] },
          category: null,
        },
      },
      mockRes
    );
    expect(responseObject).toEqual({ message: "Invalid input data" });
  });

  it("should return all listingIds", async () => {
    const mockOutput = [
      {
        listing_id: 1,
      },
      {
        listing_id: 2,
      },
      {
        listing_id: 3,
      },
    ];
    const mockControllerOutput = [1, 2, 3];
    axios.post.mockImplementationOnce(() =>
      Promise.resolve({ data: mockOutput, status: 200 })
    );
    let responseObject = [];
    const mockRes = {
      body: {},
      json: jest.fn().mockImplementationOnce((result) => {
        console.log(result);
        responseObject = result;
      }),
      status: jest.fn(),
    };
    await getSellerListings({}, mockRes);
    expect(responseObject).toEqual(mockControllerOutput);
  });

  it("fail to return all listingIds", async () => {
    axios.post.mockImplementationOnce(() =>
      Promise.resolve({ data: { message: "Seller not found" } })
    );
    let responseObject = {};
    const mockRes = {
      body: {},
      json: jest.fn().mockImplementationOnce((result) => {
        responseObject = result;
      }),
      status: jest.fn(),
    };
    await getSellerListings(
      {
        body: {
          seller_id: "1",
        },
      },
      mockRes
    );
    expect(responseObject).toEqual({ message: "Seller not found" });
  });
});
