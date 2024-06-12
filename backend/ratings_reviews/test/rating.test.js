import request from "supertest";
import express from "express";
import rating from "../routes/rating.js";

const identification = (req, res, next) => {
  console.log("Auth middleware logic here");
  next();
};

const app = express();
app.use(express.json());
app.use(identification);
app.use("/rating", rating);

describe("Rating Routes", () => {
  it("should get all ratings for a listing", async () => {
    const response = await request(app).get("/rating/listing123");
    expect(response.body).toEqual({ message: "Get All Ratings" });
  });

  it("should leave a rating for a listing", async () => {
    const response = await request(app)
      .post("/rating/listing123")
      .send({ rating: 5 });
    expect(response.body).toEqual({ message: "Leave Rating" });
  });
});
