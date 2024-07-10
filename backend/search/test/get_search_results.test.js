import axios from "axios";
import { getSearchResults } from "../controllers/get_search_results.js";

jest.mock("axios");

describe("Get Search Results Tests", () => {
  it("Should Return Listings", async () => {
    const mockOutput = [
      {
        listingId: 1,
        sellerId: 1,
        title: "test2",
        price: "50.00",
        location: "V8M",
        status: "AVAILABLE",
        listedAt: "2024-06-17T06:25:41.995Z",
        lastUpdatedAt: "2024-06-17T06:25:41.995Z",
      },
      {
        listingId: 2,
        sellerId: 1,
        title: "test2",
        price: "50.00",
        location: "V8M",
        status: "AVAILABLE",
        listedAt: "2024-06-17T06:25:41.995Z",
        lastUpdatedAt: "2024-06-17T06:25:41.995Z",
      }
    ];
    const searchOutput = [
      {
        listing_id: 1,
        seller_id: 1,
        buyer_username: null,
        title: "test2",
        price: "50.00",
        lat_long: {
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
        location: "V8M"
      },
      {
        listing_id: 2,
        seller_id: 1,
        buyer_username: null,
        title: "test2",
        price: "50.00",
        location: "V8M",
        listed_at: "2024-06-17T06:25:41.995Z",
        last_updated_at: "2024-06-17T06:25:41.995Z",
        status: "AVAILABLE"
      },
    ];
    
    axios.get.mockImplementation((url) => {
      switch (url) {
        case 'undefineduser/getUserLatLong/1':
          return Promise.resolve({data: {lat_long: {coordinates: [5,5]}}});
        case 'undefinedsearch':
          return Promise.resolve({data: {results: {listings: searchOutput}, status: 200}});
      }
    });
    let responseObject = {};
    const req = {
      query: {
        query: "test",
        category: "UNAVAILABLE"
      }
    };
    const mockRes = {
      body: {},
      json: jest.fn().mockImplementation((result) => {
        responseObject = result;
      }),
      status: jest.fn(),
      locals: { decodedToken: { userId: 1 } }
    };
    await getSearchResults(req, mockRes);
    expect(responseObject).toEqual(mockOutput);
  });
  it("Fail to Return Listings", async () => {
    const mockOutput = {"message": "Failed to get listings"};
    
    axios.get.mockImplementation((url) => {
      console.log(url);
      switch (url) {
        case 'undefineduser/getUserLatLong/1':
          return Promise.resolve({data: {lat_long: {coordinates: [5,5]}}});
        case 'undefinedsearch':
          return Promise.resolve({data: {results: {listings: mockOutput}, status: 400}});
      }
    });
    let responseObject = {};
    const req = {
      query: {
        query: "test",
        category: "UNAVAILABLE"
      }
    };
    const mockRes = {
      body: {},
      json: jest.fn().mockImplementation((result) => {
        responseObject = result;
      }),
      status: jest.fn(),
      locals: { decodedToken: { userId: 1 } }
    };
    await getSearchResults(req, mockRes);
    expect(responseObject).toEqual(mockOutput);
  });
});
