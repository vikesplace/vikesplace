import axios from "axios";
import { createListing } from "../controller/create_listing";
// const axios = require('axios');
jest.mock("axios");

describe("Create Listing Tests", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should create a listing", async () => {
    axios.post.mockImplementation(() =>
      Promise.resolve({ data: 1, status: 200 })
    );
    let postResponse = {};
    const mockPostRes = {
      body: {},
      json: jest.fn().mockImplementation((result) => {
        postResponse = result;
      }),
      status: jest.fn().mockReturnThis(),
      locals: { decodedToken: { userId: 1 } },
    };

    axios.get.mockImplementation(() =>
      Promise.resolve({ data: { type: "Point", coordinates: [1, -1] } })
    );

    const mockReq = {
      body: {
        title: "test",
        price: 0,
        location: "V9A1Y2",
        category: "ELECTRONICS",
      },
    };

    await createListing(mockReq, mockPostRes);
    expect(postResponse).toEqual(1);
  });

  it("should fail to create due to missing userId", async () => {
    let postResponse = {};
    const mockPostRes = {
      body: {},
      json: jest.fn().mockImplementation((result) => {
        postResponse = result;
      }),
      status: jest.fn().mockReturnThis(),
      locals: {}, // No decodedToken here to act as missing userId
    };

    axios.get.mockImplementation(() =>
      Promise.resolve({ data: { type: "Point", coordinates: [1, -1] } })
    );

    const mockReq = {
      body: {
        title: "test",
        price: 0,
        location: "V9A1Y2",
        category: "ELECTRONICS",
      },
    };
    
    const spyConsoleError = jest.spyOn(console, "error").mockImplementation(() => {});
    await createListing(mockReq, mockPostRes);
    expect(spyConsoleError).toHaveBeenCalled();
    spyConsoleError.mockRestore();
  });

  it("should fail due to missing location", async () => {
    let postResponse = {};
    const mockPostRes = {
      body: {},
      json: jest.fn().mockImplementation((result) => {
        postResponse = result;
      }),
      status: jest.fn().mockReturnThis(),
      locals: { decodedToken: { userId: 1 } },
    };

    axios.get.mockImplementation(() =>
      Promise.reject({
        response: { status: 400, data: { message: "Location not found" } },
      })
    );

    const mockReq = {
      body: {
        title: "test",
        price: 0,
        category: "ELECTRONICS",
      },
    };

    await createListing(mockReq, mockPostRes);
    expect(mockPostRes.status).toHaveBeenCalledWith(400);
    expect(mockPostRes.json).toHaveBeenCalledWith({ message: "Location not found" });
  });
});
