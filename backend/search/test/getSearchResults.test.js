import axios from "axios";
import { getSearchResults } from "../controllers/getSearchResults";

jest.mock("axios");

describe("Get Search Results Tests", () => {
  it("Should Return Listings", async () => {
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
    const mockUser = {data: {user: {location: {coordinates: [5,5]}}}};
    
    axios.get.mockImplementation((url) => {
      console.log(url);
      switch (url) {
        case 'undefineduser/1':
          return Promise.resolve(mockUser);
        case 'undefinedsearch':
          return Promise.resolve({data: {results: {listings: mockOutput}, status: 200}});
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
    const mockUser = {data: {user: {location: {coordinates: [5,5]}}}};
    
    axios.get.mockImplementation((url) => {
      console.log(url);
      switch (url) {
        case 'undefineduser/1':
          return Promise.resolve(mockUser);
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
