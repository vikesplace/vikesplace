import axios from "axios";
import { deleteListing } from "../controller/delete_listing";

jest.mock("axios");

describe("Delete Listing Tets", () => {
  it("should delete a listing", async () => {
    axios.delete.mockImplementation(() => Promise.resolve({ data: 1 }));
    let responseObject = {};
    const mockRes = {
      body: {},
      json: jest.fn().mockImplementation((result) => {
        responseObject = result;
      }),
      status: jest.fn(),
    };
    await deleteListing(
      {
        params: {
          listing_id: "1",
        },
        params: {
          listingId: "1",
        },
      },
      mockRes
    );
    expect(responseObject).toEqual(1);
  });

  it("it should fail to delete", async () => {
    axios.delete.mockImplementation(() =>
      Promise.resolve({
        data: { message: "Unable to delete listing with id: 1" },
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
    await deleteListing(
      {
        params: {
          listing_id: "1",
        },
      },
      mockRes
    );
    expect(responseObject).toEqual({
      message: "Unable to delete listing with id: 1",
    });
  });
});
