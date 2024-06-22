import axios from "axios";
import { getSearchResults } from "../controllers/getSearchResults";
jest.mock("axios");

describe("Listing Routes", () => {
  it("should create a listing", async () => {
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
    axios.get.mockImplementation(() => Promise.resolve(mockOutput));
    let responseObject = {};
    const req = {
        query: "test",
        longitude: 50,
        latitude: 50,
        category: "UNAVAILABLE"
    }
    const mockRes = {
      body: {},
      json: jest.fn().mockImplementation((result) => {
        responseObject = result;
      }),
      status: jest.fn(),
    };
    await getSearchResults(req,mockRes);
    expect(responseObject).toEqual(mockOutput);
  });
});
