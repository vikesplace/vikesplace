import axios from "axios";
import { createListing } from "../controller/create_listing";
import { deleteListing } from "../controller/delete_listing";
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

  it("should delete a listing", async () => {
    axios.delete.mockImplementation(() => Promise.resolve({ data: 1 }));
    let responseObject = {};
    const mockRes = {
      body:{},
      json: jest.fn().mockImplementation((result)=>{
        responseObject = result;
      }),
      status: jest.fn()
    };
    await deleteListing(
      {
        params: {
          listing_id: "1",
        },
      },
      mockRes
    );
    expect(responseObject).toEqual(1);
  });

  it("it should fail to delete", async () => {
    axios.delete.mockImplementation(() => Promise.resolve({ data: {message: "Invalid input data" } }));
    let responseObject = {};
    const mockRes = {
      body:{},
      json: jest.fn().mockImplementation((result)=>{
        responseObject = result;
      }),
      status: jest.fn()
    };
    await deleteListing(
      {
        params: {
          listing_id: "1",
        },
      },
      mockRes
    );
    expect(responseObject).toEqual({ message: "Invalid input data" });
  });
});
