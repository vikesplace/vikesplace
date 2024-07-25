import axios from "axios";
import { updateListing } from "../controller/update_listing";

jest.mock("axios");

describe("Update Listing Tests", () => {
  it("should update a listing", async () => {
    axios.patch.mockImplementation(() => Promise.resolve({ data: 1 }));
    let responseObject = {};
    const mockRes = {
      body: {},
      json: jest.fn().mockImplementation((result) => {
        responseObject = result;
      }),
      status: jest.fn(),
    };
    await updateListing(
      {
        body: {
          title: "test",
          price: 1.01,
          status: "AVAILABLE",
          location: "V9A6P4",
          category: "ELECTRONICS",
        },
        params: {
          listing_id: "1",
        },
      },
      mockRes
    );
    expect(responseObject).toEqual(1);
  });

  it("it should fail to update", async () => {
    axios.patch.mockImplementation(() =>
      Promise.resolve({
        data: { message: "Unable to update listing with id: 1" },
      })
    );
    let responseObject = {};
    const mockRes = {
      body: {},
      json: jest.fn().mockImplementation((result) => {
        responseObject = result;
      }),
      status: jest.fn(),
    };
    await updateListing(
      {
        body: {
          title: "test",
          price: 0,
          status: "AVAILABLE",
          location: "V9A6P4",
          category: null,
        },
        params: {
          listing_id: "1",
        },
      },
      mockRes
    );
    expect(responseObject).toEqual({
      message: "Unable to update listing with id: 1",
    });
  });
});
