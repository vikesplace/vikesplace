import axios from "axios";
import { createListing } from "../controller/create_listing";
// const axios = require('axios');
jest.mock("axios");

describe("Create Listing Tests", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should create a listing", async () => {
    const mockOutput = {
      data:{
        listingId: 1,
        title: "test",
        price: 1,
        location: "V8T1B4",
        status: "AVAILABLE",
      }
    };

    axios.post.mockImplementation(() =>
      Promise.resolve({ 
        data: mockOutput, 
        status: 200 })
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
        price: 1,
        location: "V8T1B4",
        category: "ELECTRONICS",
      },
    };

    await createListing(mockReq, mockPostRes);
    expect(postResponse).toEqual(mockOutput);
  });

  it("should fail to create listing", async () => {
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

    axios.post.mockImplementation(() =>
      Promise.reject({status: 500})
    );

    const mockReq = {
      body: {
        title: "test",
        price: 0,
        location: "V8T1B4",
        category: "ELECTRONICS",
      },
    };
    
    await createListing(mockReq, mockPostRes);
    expect(postResponse).toEqual({"message": "Error creating listing"});
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

  it("should fail due to negative listing price", async () => {
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
        price: -1,
        location: "",
        category: "ELECTRONICS",
      },
    };

    await createListing(mockReq, mockPostRes);
    expect(mockPostRes.status).toHaveBeenCalledWith(400);
    expect(mockPostRes.json).toHaveBeenCalledWith({ message: "Listing price cannot be negative" });
  });
});
