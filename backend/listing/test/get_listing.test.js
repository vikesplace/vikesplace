import axios from "axios";
import { getListingInfo } from "../controller/get_listing";
import redisClient from "../helper/redis_client"; // Import the redis client

jest.mock("axios");
jest.mock("../helper/redis_client", () => {
  return {
    get: jest.fn(),
    set: jest.fn(),
  };
});

describe("Get Listing Tests", () => {
  it("should get a listing", async () => {
    // Mock Redis get method to return null (no cache)
    redisClient.get.mockResolvedValue(null);
    // Mock Redis set method
    redisClient.set.mockResolvedValue("OK");

    axios.post = jest.fn(() => Promise.resolve());
    axios.get.mockImplementation(() =>
      Promise.resolve({
        data: {
          seller_id: "245242",
          listing_id: "1",
          title: "test",
          price: 0,
          location: { type: "Point", coordinates: [1, -1] },
          status: "AVAILABLE",
          listed_at: "2021-09-01",
          lastupdated_at: "2021-09-01",
        },
      })
    );

    let responseObject = {};
    const mockRes = {
      body: {},
      json: jest.fn().mockImplementation((result) => {
        responseObject = result;
      }),
      status: jest.fn().mockReturnThis(),
      locals: { decodedToken: { userId: 1 } }
    };

    await getListingInfo(
      {
        params: {
          listingId: "1",
        },
      },
      mockRes
    );

    expect(responseObject).toEqual({
      seller_id: "245242",
      listing_id: "1",
      title: "test",
      price: 0,
      location: { type: "Point", coordinates: [1, -1] },
      status: "AVAILABLE",
      listed_at: "2021-09-01",
      lastupdated_at: "2021-09-01",
    });
  });

  it("should get a listing from cache", async () => {
    // Mock Redis get method to return cached data
    redisClient.get.mockResolvedValue(JSON.stringify({
      seller_id: "245242",
      listing_id: "1",
      title: "test",
      price: 0,
      location: { type: "Point", coordinates: [1, -1] },
      status: "AVAILABLE",
      listed_at: "2021-09-01",
      lastupdated_at: "2021-09-01",
    }));

    let responseObject = {};
    const mockRes = {
      body: {},
      json: jest.fn().mockImplementation((result) => {
        responseObject = result;
      }),
      status: jest.fn().mockReturnThis(),
      locals: { decodedToken: { userId: 1 } }
    };

    await getListingInfo(
      {
        params: {
          listingId: "1",
        },
      },
      mockRes
    );

    expect(responseObject).toEqual({
      seller_id: "245242",
      listing_id: "1",
      title: "test",
      price: 0,
      location: { type: "Point", coordinates: [1, -1] },
      status: "AVAILABLE",
      listed_at: "2021-09-01",
      lastupdated_at: "2021-09-01",
    });
  });

  it("should fail to get a listing", async () => {
    // Mock Redis get method to return null (no cache)
    redisClient.get.mockResolvedValue(null);
    // Mock Redis set method
    redisClient.set.mockResolvedValue("OK");

    axios.get.mockImplementation(() =>
      Promise.resolve({ data: { message: "Failed to get listing" } })
    );

    let responseObject = {};
    const mockRes = {
      body: {},
      json: jest.fn().mockImplementation((result) => {
        responseObject = result;
      }),
      status: jest.fn().mockReturnThis(),
      locals: { decodedToken: { userId: 1 } }
    };

    await getListingInfo(
      {
        params: {
          listingId: "1",
        },
      },
      mockRes
    );

    expect(responseObject).toEqual({
      message: "Failed to get listing",
    });
  });
});
