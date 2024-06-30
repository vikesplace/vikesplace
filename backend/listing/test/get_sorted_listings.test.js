import axios from "axios";
import { getSortedListings } from "../controller/get_sorted_listings";

jest.mock("axios");

describe("Get Sorted Listings Tests", () => {
  it("should get listings filtered by choice and sorted by price", async () => {
    axios.get.mockImplementation(() =>
      Promise.resolve({
        data: {
          count: 3,
          rows: [
            {
              listing_id: 3,
              seller_id: 123,
              buyer_username: "joe",
              title: "test",
              price: 0,
              location: { type: "Point", coordinates: [1, -1] },
              status: "AVAILABLE",
              listed_at: "2021-09-01",
              lastupdated_at: "2021-09-01",
              category: "BOOKS",
            },
            {
              listing_id: 2,
              seller_id: 124,
              buyer_username: "maria",
              title: "test",
              price: 2,
              location: { type: "Point", coordinates: [1, -1] },
              status: "AVAILABLE",
              listed_at: "2021-09-01",
              lastupdated_at: "2021-09-01",
              category: "BOOKS",
            },
            {
              listing_id: 1,
              seller_id: 123,
              buyer_username: "joe",
              title: "test",
              price: 3,
              location: { type: "Point", coordinates: [1, -1] },
              status: "AVAILABLE",
              listed_at: "2021-09-01",
              lastupdated_at: "2021-09-01",
              category: "BOOKS",
            },
          ],
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
    await getSortedListings(
      {
        query: {
          pullLimit: 5,
          pageOffset: 0,
          minPrice: 0,
          maxPrice: 100,
          status: "AVAILABLE",
          sortBy: "price",
          isDescending: false,
        },
      },
      mockRes
    );
    expect(responseObject).toEqual({
      count: 3,
      rows: [
        {
          listing_id: 3,
          seller_id: 123,
          buyer_username: "joe",
          title: "test",
          price: 0,
          location: { type: "Point", coordinates: [1, -1] },
          status: "AVAILABLE",
          listed_at: "2021-09-01",
          lastupdated_at: "2021-09-01",
          category: "BOOKS",
        },
        {
          listing_id: 2,
          seller_id: 124,
          buyer_username: "maria",
          title: "test",
          price: 2,
          location: { type: "Point", coordinates: [1, -1] },
          status: "AVAILABLE",
          listed_at: "2021-09-01",
          lastupdated_at: "2021-09-01",
          category: "BOOKS",
        },
        {
          listing_id: 1,
          seller_id: 123,
          buyer_username: "joe",
          title: "test",
          price: 3,
          location: { type: "Point", coordinates: [1, -1] },
          status: "AVAILABLE",
          listed_at: "2021-09-01",
          lastupdated_at: "2021-09-01",
          category: "BOOKS",
        },
      ],
    });
  });

  it("should throw error for invalid price range", async () => {
    axios.get.mockImplementation(() =>
      Promise.resolve({ data: { message: "Invalid price range" } })
    );
    let responseObject = {};
    const mockRes = {
      body: {},
      json: jest.fn().mockImplementation((result) => {
        responseObject = result;
      }),
      status: jest.fn(),
    };
    await getSortedListings(
      {
        query: {
          pullLimit: 5,
          pageOffset: 0,
          minPrice: 0,
          status: "AVAILABLE",
          sortBy: "price",
          isDescending: false,
        },
      },
      mockRes
    );
    expect(responseObject).toEqual({ message: "Invalid price range" });
  });

  it("should throw error for invalid price range", async () => {
    axios.get.mockImplementation(() =>
      Promise.resolve({ data: { message: "Invalid price range" } })
    );
    let responseObject = {};
    const mockRes = {
      body: {},
      json: jest.fn().mockImplementation((result) => {
        responseObject = result;
      }),
      status: jest.fn(),
    };
    await getSortedListings(
      {
        query: {
          pullLimit: 5,
          pageOffset: 0,
          minPrice: 100,
          maxPrice: 0,
          status: "AVAILABLE",
          sortBy: "price",
          isDescending: false,
        },
      },
      mockRes
    );
    expect(responseObject).toEqual({ message: "Invalid price range" });
  });

  it("should fail to get sorted listings", async () => {
    axios.get.mockImplementation(() =>
      Promise.resolve({ data: { message: "Invalid input data" } })
    );
    let responseObject = {};
    const mockRes = {
      body: {},
      json: jest.fn().mockImplementation((result) => {
        responseObject = result;
      }),
      status: jest.fn(),
    };
    await getSortedListings(
      {
        query: {
          pullLimit: 5,
          pageOffset: 0,
          minPrice: 0,
          maxPrice: 100,
          status: "AVAILABLE",
          sortBy: "price",
          isDescending: false,
        },
      },
      mockRes
    );
    expect(responseObject).toEqual({ message: "Invalid input data" });
  });
});
