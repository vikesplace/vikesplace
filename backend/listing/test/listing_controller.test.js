import axios from "axios";
import { createListing } from "../controller/create_listing";
import { deleteListing } from "../controller/delete_listing";
import { getSellerListings } from "../controller/get_seller_listings";
import { getListingInfo } from "../controller/get_listing";
import { updateListing } from "../controller/update_listing";
import { getLongLat } from "../helper/get_long_lat";
import { getPostalCode } from "../helper/get_postal_code";

jest.mock("axios");

describe("Listing Routes", () => {
  it("should create a listing", async () => {
    axios.post.mockImplementation(() => Promise.resolve({ data: 1 }));
    let responseObject = {};
    const mockRes = {
      body: {},
      json: jest.fn().mockImplementation((result) => {
        responseObject = result;
      }),
      status: jest.fn(),
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
    expect(responseObject).toEqual(1);
  });

  it("it should fail to create", async () => {
    axios.post.mockImplementation(() =>
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
    expect(responseObject).toEqual({ message: "Invalid input data" });
  });

  it("should return all listingIds", async () => {
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
    axios.get.mockImplementation(() =>
      Promise.resolve({ data: mockOutput, status: 200 })
    );
    let responseObject = {};
    const mockRes = {
      body: {},
      json: jest.fn().mockImplementation((result) => {
        responseObject = result;
      }),
      status: jest.fn(),
    };
    await getSellerListings({}, mockRes);
    expect(responseObject).toEqual(mockOutput);
  });

  it("fail to return all listingIds", async () => {
    axios.get.mockImplementation(() =>
      Promise.resolve({ data: { message: "Seller not found" } })
    );
    let responseObject = {};
    const mockRes = {
      body: {},
      json: jest.fn().mockImplementation((result) => {
        responseObject = result;
      }),
      status: jest.fn(),
    };
    await getSellerListings(
      {},
      mockRes
    );
    expect(responseObject).toEqual({ message: "Seller not found" });
  });

  it("should get a listing", async () => {
    //create a mock implementation of axios.get to return a promise that resolves the json data that would contain listing seller_id, listing_id, title, price, location, status, listed_at, lastupdated_at
    axios.get.mockImplementation(() => Promise.resolve({ data: {seller_id: '245242', listing_id: '1', title: 'test', price: 0, location: { type: "Point", coordinates: [1, -1] }, status: 'AVAILABLE', listed_at: '2021-09-01', lastupdated_at: '2021-09-01' } }));
    let responseObject = {};
    const mockRes = {
      body:{},
      json: jest.fn().mockImplementation((result)=>{
        responseObject = result;
      }),
      status: jest.fn()
    };
    await getListingInfo(
      {
        params: {
          listingId: "1",
        },
      },
      mockRes
    );
    expect(responseObject).toEqual({ seller_id: '245242', listing_id: '1', title: 'test', price: 0, location: { type: "Point", coordinates: [1, -1] }, status: 'AVAILABLE', listed_at: '2021-09-01', lastupdated_at: '2021-09-01'});
  });

  it("should fail to get a listing", async () => {
    axios.get.mockImplementation(() => Promise.resolve({ data: {message: "Unable to get listing with id: 1"} }));
    let responseObject = {};
    const mockRes = {
      body:{},
      json: jest.fn().mockImplementation((result)=>{
        responseObject = result;
      }),
      status: jest.fn()
    };
    await getListingInfo(
      {
        params: {
          listingId: "1",
        },
      },
      mockRes
    );
    expect(responseObject).toEqual({ message: "Unable to get listing with id: 1" });
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
    axios.delete.mockImplementation(() => Promise.resolve({ data: {message: "Unable to delete listing with id: 1" } }));
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
    expect(responseObject).toEqual({ message: "Unable to delete listing with id: 1" });
  });

  it("should get long lat", async () => {
    const mockOutput = {
      longitude: 45.5,
      latitude: -45.5,
    };

    axios.get.mockResolvedValue({ data: mockOutput });

    const postal_code = "12345";
    const result = await getLongLat(postal_code);

    expect(result).toEqual(mockOutput);
  });

  it("it should fail to get long lat", async () => {
    axios.get.mockResolvedValue({ data: { message: "Postal code not found" } });

    const postal_code = "12345";
    const result = await getLongLat(postal_code);

    expect(result).toEqual({ message: "Postal code not found" });
  });

  it("should get postal code", async () => {
    const mockOutput = {
      postal_code: "123"
    };

    axios.get.mockResolvedValue({ data: mockOutput });

    const latitude = 45.5;
    const longitude = -45.5;
    const result = await getPostalCode(latitude, longitude);

    expect(result).toEqual(mockOutput);
  });

  it("it should fail to get postal code", async () => {
    axios.get.mockResolvedValue({ data: { message: "Latitude and longitude not found" } });

    const latitude = 45.5;
    const longitude = -45.5;
    const result = await getPostalCode(latitude, longitude);

    expect(result).toEqual({ message: "Latitude and longitude not found" });
  });

  it("should update a listing", async () => {
    axios.patch.mockImplementation(() => Promise.resolve({ data: 1 }));
    let responseObject = {};
    const mockRes = {
      body:{},
      json: jest.fn().mockImplementation((result)=>{
        responseObject = result;
      }),
      status: jest.fn()
    };
    await updateListing(
      {
        body: {
          title: "test",
          price: 1.01,
          status: "AVAILABLE",
          location: { type: "Point", coordinates: [1, -1] },
          category: "ELECTRONICS",
        },
      },
      mockRes
    );
    expect(responseObject).toEqual(1);
  });
  it("it should fail to update", async () => {
    axios.patch.mockImplementation(() => Promise.resolve({ data: {message: "Unable to update listing with id: 1"} }));
    let responseObject = {};
    const mockRes = {
      body:{},
      json: jest.fn().mockImplementation((result)=>{
        responseObject = result;
      }),
      status: jest.fn()
    };
    await updateListing(
      {
        body: {
          title: "test",
          price: 1.01,
          status: "AVAILABLE",
          location: { type: "Point", coordinates: [1, -1] },
          category: "ELECTRONICS",
        },
      },
      mockRes
    );
    expect(responseObject).toEqual({ message: "Unable to update listing with id: 1" });
  });
});
