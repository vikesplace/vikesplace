import axios from "axios";
import { getListingInfo } from "../controller/get_listing";

jest.mock("axios");

describe("Get Listing Tests", () => {
  it("should get a listing", async () => {
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
      status: jest.fn(),
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
    axios.get.mockImplementation(() =>
      Promise.resolve({ data: { message: "Unable to get listing with id: 1" } })
    );
    let responseObject = {};
    const mockRes = {
      body: {},
      json: jest.fn().mockImplementation((result) => {
        responseObject = result;
      }),
      status: jest.fn(),
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
      message: "Unable to get listing with id: 1",
    });
  });
});
