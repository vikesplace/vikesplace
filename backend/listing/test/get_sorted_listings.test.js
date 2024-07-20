import axios from "axios";
import { getSortedListings } from "../controller/get_sorted_listings";
import { calculateDistance } from "../helper/calculate_distance";

jest.mock("axios");
jest.mock("../helper/calculate_distance");

describe("Get Sorted Listings Tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return all listings for user", async () => {
    const mockUser = {
      data: {
          lat_long: {
            coordinates: [1, -1],
          },
      },
    };
    const mockListings = {
      data: {
        rows: [
          {
            listingId: 1,
            sellerId: 1,
            title: "test1",
            price: "50.00",
            lat_long: {
              coordinates: [2, -2],
            },
            status: "AVAILABLE",
          },
          {
            listingId: 2,
            sellerId: 1,
            title: "test2",
            price: "50.00",
            lat_long: {
              coordinates: [3, -3],
            },
            status: "AVAILABLE",
          },
        ],
      },
    };

    axios.get
      .mockResolvedValueOnce(mockUser)
      .mockResolvedValueOnce(mockListings);

    calculateDistance.mockReturnValue(true);

    let responseObject = {};
    const mockGetRes = {
      json: jest.fn().mockImplementation((result) => {
        responseObject = result;
      }),
      status: jest.fn().mockReturnThis(),
      locals: { decodedToken: { userId: 1 } },
    };

    await getSortedListings({ query: {} }, mockGetRes);
    expect(responseObject).toEqual(mockListings.data.rows);
  });

  it("should return filtered listings based on distance", async () => {
    const mockUser = {
      data: {
          lat_long: {
            coordinates: [1, -1],
          },
      },
    };
    const mockListings = {
      data: {
        rows: [
          {
            listingId: 1,
            sellerId: 1,
            title: "test1",
            price: "50.00",
            lat_long: {
              coordinates: [2, -2],
            },
            status: "AVAILABLE",
          },
          {
            listingId: 2,
            sellerId: 1,
            title: "test2",
            price: "50.00",
            lat_long: {
              coordinates: [100, 100],
            },
            status: "AVAILABLE",
          },
        ],
      },
    };

    axios.get
      .mockResolvedValueOnce(mockUser)
      .mockResolvedValueOnce(mockListings);

    calculateDistance.mockImplementation((userCoords, listingCoords) => {
      return listingCoords[0] !== 100 && listingCoords[1] !== 100;
    });

    let responseObject = {};
    const mockGetRes = {
      json: jest.fn().mockImplementation((result) => {
        responseObject = result;
      }),
      status: jest.fn().mockReturnThis(),
      locals: { decodedToken: { userId: 1 } },
    };

    await getSortedListings({ query: {} }, mockGetRes);
    expect(responseObject).toEqual([mockListings.data.rows[0]]);
  });

  it("should return error if user not found", async () => {
    axios.get.mockRejectedValueOnce({
      response: {
        status: 400,
        data: { message: "User does not exist" },
      },
    });

    let responseObject = {};
    const mockGetRes = {
      json: jest.fn().mockImplementation((result) => {
        responseObject = result;
      }),
      status: jest.fn().mockReturnThis(),
      locals: { decodedToken: { userId: 1 } },
    };

    await getSortedListings({ query: {} }, mockGetRes);
    expect(mockGetRes.status).toHaveBeenCalledWith(400);
    expect(responseObject).toEqual({ message: "User does not exist" });
  });

  it("should return internal server error", async () => {
    axios.get.mockRejectedValueOnce(new Error("Internal Server Error"));

    let responseObject = {};
    const mockGetRes = {
      json: jest.fn().mockImplementation((result) => {
        responseObject = result;
      }),
      status: jest.fn().mockReturnThis(),
      locals: { decodedToken: { userId: 1 } },
    };

    const spyConsoleLog = jest.spyOn(console, "error");
    await getSortedListings({ query: {} }, mockGetRes);

    expect(spyConsoleLog).toHaveBeenCalled();
    expect(mockGetRes.status).toHaveBeenCalledWith(500);
    expect(responseObject).toEqual({ message: "Failed to get listings" });
  });

  it("should return error if min price is greater than max price", async () => {
    const res = {
      locals: {
        decodedToken: {
          userId: 'mockUserId'
        }
      },
      status: jest.fn(() => res),
      json: jest.fn()
    };
    await getSortedListings({ query: { minPrice: 100, maxPrice: 50 } }, res);
    expect(res.status).toHaveBeenCalledWith(400); 
    expect(res.json).toHaveBeenCalledWith({ message: 'Min price cannot be greater than max price' });
  });
});
