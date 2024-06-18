import axios from "axios";
import { createListing } from "../controller/create_listing";
jest.mock("axios");

describe("Listing Routes", () => {
  it("should create a listing", async () => {
    axios.post.mockImplementation(() => Promise.resolve({ data: {message: "Create Listing"} }));
    let responseObject = {};
    const mockRes = {
      body:{},
      json: jest.fn().mockImplementation((result)=>{
        responseObject = result;
      }),
      status: jest.fn()
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
    expect(responseObject).toEqual({ message: "Create Listing" });
  });

  it("it should fail to create", async () => {
    axios.post.mockImplementation(() => Promise.resolve({ data: {message: "Unable to create listing"} }));
    let responseObject = {};
    const mockRes = {
      body:{},
      json: jest.fn().mockImplementation((result)=>{
        responseObject = result;
      }),
      status: jest.fn()
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
    expect(responseObject).toEqual({ message: "Unable to create listing" });
  });

  it("should update a listing", async () => {
    axios.patch.mockImplementation(() => Promise.resolve({ data: {message: "Update Listing"} }));
    let responseObject = {};
    const mockRes = {
      body:{},
      json: jest.fn().mockImplementation((result)=>{
        responseObject = result;
      }),
      status: jest.fn()
    };
    await updateListing(
      {
        body: {
          title: "test",
          price: 0,
          location: { type: "Point", coordinates: [1, -1] },
          category: null,
        },
      },
      mockRes
    );
    expect(responseObject).toEqual({ message: "Update Listing" });
  });

  it("it should fail to update", async () => {
    axios.patch.mockImplementation(() => Promise.resolve({ data: {message: "Unable to update listing"} }));
    let responseObject = {};
    const mockRes = {
      body:{},
      json: jest.fn().mockImplementation((result)=>{
        responseObject = result;
      }),
      status: jest.fn()
    };
    await updateListing(
      {
        body: {
          title: "test",
          price: 0,
          location: { type: "Point", coordinates: [1, -1] },
          category: null,
        },
      },
      mockRes
    );
    expect(responseObject).toEqual({ message: "Unable to update listing" });
  });
});
