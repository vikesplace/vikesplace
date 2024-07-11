import listing from "../routes/listing.js";
import request from "supertest";
import express from "express";

// Mock the identification middleware
const identification = (req, res, next) => {
  console.log("Auth middleware logic here");
  next();
};

const app = express();
app.use(express.json());
app.use(identification);
app.use("/listing", listing);
// Mock the controller functions inline within jest.mock()
jest.mock("../controller/create_listing.js", () => ({
  createListing: (req, res) => {
    res.status(200).json({ message: "Create Listing" });
  },
}));

jest.mock("../controller/delete_listing.js", () => ({
  deleteListing: (req, res) => {
    res.status(200).json({ message: "Delete Listing" });
  },
}));

jest.mock("../controller/update_listing.js", () => ({
  updateListing: (req, res) => {
    res.status(200).json({ message: "Update Listing" });
  },
}));

jest.mock("../controller/get_seller_listings.js", () => ({
  getSellerListings: (req, res) => {
    res.status(200).json({ message: "Get All Listings of a User" });
  },
}));

jest.mock("../controller/get_sorted_listings.js", () => ({
  getSortedListings: (req, res) => {
    res.status(200).json({ message: "Get Sorted Listings" });
  },
}));

jest.mock("../controller/get_listing.js", () => ({
  getListingInfo: (req, res) => {
    res.status(200).json({ message: "Get Listing" });
  },
}));

describe("Listing Routes", () => {
  it("should create a listing", async () => {
    const response = await request(app)
      .post("/listing")
      .send({ name: "Test Listing" });
    expect(response.body).toEqual({ message: "Create Listing" });
  });

  it("should get all listings of a user", async () => {
    const response = await request(app)
      .get("/listing/me");
    expect(response.body).toEqual({ message: "Get All Listings of a User" });
  });

  it("should update a listing", async () => {
    const response = await request(app)
      .patch("/listing/1")
      .send({ name: "Updated Listing" });
    expect(response.body).toEqual({ message: "Update Listing" });
  });

  it("should delete a listing", async () => {
    const response = await request(app)
      .delete("/listing/1");
    expect(response.body).toEqual({ message: "Delete Listing" });
  });


  it("should get sorted listings", async () => {
    const response = await request(app)
      .get("/listing");
    expect(response.body).toEqual({ message: "Get Sorted Listings" });
  });

  it("should get a listing", async () => {
    const response = await request(app)
      .get("/listing/1");
    expect(response.body).toEqual({ message: "Get Listing" });
  });

  it("should fail to get a listing", async () => {
    const response = await request(app)
      .get("/listing/");
    expect(response.body).toEqual({ message: "Get Sorted Listings" });
  });
});