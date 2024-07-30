import axios from "axios";
import { getSearchResults } from "../controllers/get_search_results.js";

jest.mock("axios");

describe("Get Search Results Tests", () => {
  it("Should Return Listings", async () => {
    const mockSearchOutput = [
      {
        listingId: 1,
        sellerId: 1,
        title: "test2",
        price: "50.00",
        location: "V8M",
        status: "AVAILABLE",
        listedAt: "2024-06-17T06:25:41.995Z",
        lastUpdatedAt: "2024-06-17T06:25:41.995Z",
        category: null,
        forCharity: false,
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
        category: null,
        forCharity: false,
      }
    ];

    const mockUserOutput = [
      {
        userId: 1,
        username: "test1",
      },
      {
        userId: 2,
        username: "test2",
      }
    ];

    const searchOutput = [
      {
        listing_id: 1,
        seller_id: 1,
        title: "test2",
        price: "50.00",
        location: "V8M",
        status: "AVAILABLE",
        listed_at: "2024-06-17T06:25:41.995Z",
        last_updated_at: "2024-06-17T06:25:41.995Z",
        category: null,
        for_charity: false,
      },
      {
        listing_id: 2,
        seller_id: 1,
        title: "test2",
        price: "50.00",
        location: "V8M",
        status: "AVAILABLE",
        listed_at: "2024-06-17T06:25:41.995Z",
        last_updated_at: "2024-06-17T06:25:41.995Z",
        category: null,
        for_charity: false,
      },
    ];
    const userOutput = [
      {
        user_id: 1,
        username: "test1",
      },
      {
        user_id: 2,
        username: "test2",
      }
    ]

    axios.get.mockImplementation((url) => {
      switch (url) {
        case 'undefineduser/getUserLatLong/1':
          return Promise.resolve({data: {lat_long: {coordinates: [5,5]}}});
        case 'undefinedsearch':
          return Promise.resolve({data: {results: {listings: searchOutput, users: userOutput}, status: 200}});
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
    expect(responseObject).toEqual({"listings": mockSearchOutput, "users": mockUserOutput});
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