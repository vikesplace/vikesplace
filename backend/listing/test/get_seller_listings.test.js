import axios from "axios";
import { getSellerListings } from "../controller/get_seller_listings";

jest.mock("axios");

describe("Get Seller Listings Tests", () => {
  it("should return all listings for seller", async () => {
    const mockOutput = [
      {
        listing_id: 1,
        seller_id: 1,
        buyer_username: null,
        title: "test2",
        price: "50.00",
        location: {
          crs: {
            type: "name",
            properties: {
              name: "EPSG:4326",
            },
          },
          type: "Point",
          coordinates: [1, -1],
        },
        status: "AVAILABLE",
        listed_at: "2024-06-17T06:25:41.995Z",
        last_updated_at: "2024-06-17T06:25:41.995Z",
        category: null,
      },
      {
        listing_id: 2,
        seller_id: 1,
        buyer_username: null,
        title: "test2",
        price: "50.00",
        location: {
          crs: {
            type: "name",
            properties: {
              name: "EPSG:4326",
            },
          },
          type: "Point",
          coordinates: [1, -1],
        },
      },
    ];
    axios.get.mockImplementation(() =>
      Promise.resolve({ data: mockOutput, status: 200 })
    );
    let responseObject = {};
    const mockGetRes = {
      body: {},
      json: jest.fn().mockImplementation((result) => {
        responseObject = result;
      }),
      status: 200,
      locals: { decodedToken: { userId: 1 } },
    };

    await getSellerListings({}, mockGetRes);
    expect(responseObject).toEqual(mockOutput);
  });

  it("fail to return all listings because seller not found", async () => {
    axios.get.mockImplementation(() =>
      Promise.resolve({ data: { message: "Seller not found" } })
    );
    let responseObject = {};
    const mockGetRes = {
      body: {},
      json: jest.fn().mockImplementation((result) => {
        responseObject = result;
      }),
      status: 200,
      locals: { decodedToken: { userId: 1 } },
    };
    await getSellerListings({}, mockGetRes);
    expect(responseObject).toEqual({ message: "Seller not found" });
  });

  it("fail to return all listings because seller not found", async () => {
    let responseObject = {};
    const mockGetRes = {
      body: {},
      json: jest.fn().mockImplementation((result) => {
        responseObject = result;
      }),
      status: 200,
    };

    const spyConsoleLog = jest.spyOn(console, "log");
    await getSellerListings({}, mockGetRes);

    expect(spyConsoleLog).toHaveBeenCalled();
  });
});
