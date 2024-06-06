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

describe("Listing Routes", () => {
  it("should create a listing", async () => {
    const response = await request(app)
      .post("/listing")
      .send({ name: "Test Listing" });
    expect(response.body).toEqual({ message: "Create Listing" });
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

  it("should get all listings of a user", async () => {
    const response = await request(app)
      .get("/listing/user/userxyz");
    expect(response.body).toEqual({ message: "Get All Listings of a User" });
  });
});
