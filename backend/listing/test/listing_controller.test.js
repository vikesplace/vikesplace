import axios from "axios";
import { createListing } from "../controller/create_listing";
import { deleteListing } from "../controller/delete_listing";
import { getSellerListings } from "../controller/get_seller_listings";
import { getListingInfo } from "../controller/get_listing";
import { updateListing } from "../controller/update_listing";
import { getSortedListings } from "../controller/get_sorted_listings";

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

  it("should update a listing", async () => {
    axios.patch.mockImplementation(() => Promise.resolve({ data: {message: "Update Listing"} }));
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
          price: 0,
          location: { type: "Point", coordinates: [1, -1] },
          category: null,
        },
        params: {
          listingId: "1",
        },
      },
      mockRes
    );
    expect(responseObject).toEqual({ message: "Update Listing" });
  });

  it("it should fail to update", async () => {
    axios.patch.mockImplementation(() => Promise.resolve({ data: {message: "Unable to update listing"} }));
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
          price: 0,
          location: { type: "Point", coordinates: [1, -1] },
          category: null,
        },
      },
      mockRes
    );
    expect(responseObject).toEqual({ message: "Unable to update listing" });
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
    axios.delete.mockImplementation(() => Promise.resolve({ data: {message: "Invalid input data" } }));
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
    expect(responseObject).toEqual({ message: "Invalid input data" });
  });

  it("should get listings filtered by choice and sorted by price", async () => {
    axios.get.mockImplementation(() => Promise.resolve({ data: 
      {
        "count": 3,
        "rows": [
          {
            "listing_id": 3, "seller_id": 123, "buyer_username": "joe", "title": "test", "price": 0, "location": {"type": "Point", "coordinates": [1, -1]}, "status": "AVAILABLE", "listed_at": "2021-09-01", "lastupdated_at": "2021-09-01", "category": "BOOKS"
          },
          {
            "listing_id": 2, "seller_id": 124, "buyer_username": "maria", "title": "test", "price": 2, "location": {"type": "Point", "coordinates": [1, -1]}, "status": "AVAILABLE", "listed_at": "2021-09-01", "lastupdated_at": "2021-09-01", "category": "BOOKS"
          },
          {
            "listing_id": 1, "seller_id": 123, "buyer_username": "joe", "title": "test", "price": 3, "location": {"type": "Point", "coordinates": [1, -1]}, "status": "AVAILABLE", "listed_at": "2021-09-01", "lastupdated_at": "2021-09-01", "category": "BOOKS"
          }]
    }}
  ));
    let responseObject = {};
    const mockRes = {
      body:{},
      json: jest.fn().mockImplementation((result)=>{
        responseObject = result;
      }),
      status: jest.fn()
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
    expect(responseObject).toEqual(
      {
        "count": 3,
        "rows": [
          {
            "listing_id": 3, "seller_id": 123, "buyer_username": "joe", "title": "test", "price": 0, "location": {"type": "Point", "coordinates": [1, -1]}, "status": "AVAILABLE", "listed_at": "2021-09-01", "lastupdated_at": "2021-09-01", "category": "BOOKS"
          },
          {
            "listing_id": 2, "seller_id": 124, "buyer_username": "maria", "title": "test", "price": 2, "location": {"type": "Point", "coordinates": [1, -1]}, "status": "AVAILABLE", "listed_at": "2021-09-01", "lastupdated_at": "2021-09-01", "category": "BOOKS"
          },
          {
            "listing_id": 1, "seller_id": 123, "buyer_username": "joe", "title": "test", "price": 3, "location": {"type": "Point", "coordinates": [1, -1]}, "status": "AVAILABLE", "listed_at": "2021-09-01", "lastupdated_at": "2021-09-01", "category": "BOOKS"
          }]
      });

  });

  it("should throw error for invalid price range", async () => {
    axios.get.mockImplementation(() => Promise.resolve({ data: {message: "Invalid price range"} }));
    let responseObject = {};
    const mockRes = {
      body:{},
      json: jest.fn().mockImplementation((result)=>{
        responseObject = result;
      }),
      status: jest.fn()
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
    expect(responseObject).toEqual({message: "Invalid price range"});
  });

  it("should throw error for invalid price range", async () => {
    axios.get.mockImplementation(() => Promise.resolve({ data: {message: "Invalid price range"} }));
    let responseObject = {};
    const mockRes = {
      body:{},
      json: jest.fn().mockImplementation((result)=>{
        responseObject = result;
      }),
      status: jest.fn()
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
    expect(responseObject).toEqual({message: "Invalid price range"});
  });

  it("should fail to get sorted listings", async () => {
    axios.get.mockImplementation(() => Promise.resolve({ data: {message: "Invalid input data"} }));
    let responseObject = {};
    const mockRes = {
      body:{},
      json: jest.fn().mockImplementation((result)=>{
        responseObject = result;
      }),
      status: jest.fn()
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
    expect(responseObject).toEqual({message: "Invalid input data"});
  });
 
});
