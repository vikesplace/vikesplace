import request from "supertest";
import express from "express";
import review from "../routes/review.js";

const identification = (req, res, next) => {
  console.log("Auth middleware logic here");
  next();
};

const app = express();
app.use(express.json());
app.use(identification);
app.use("/review", review);

describe("Review Routes", () => {
  it("should get all reviews for a listing", async () => {
    const response = await request(app).get("/review/listing123");
    expect(response.body).toEqual({ message: "Get All Reviews" });
  });

  it("should leave a review for a listing", async () => {
    const response = await request(app)
      .post("/review/listing123")
      .send({ content: "Great listing!" });
    expect(response.body).toEqual({ message: "Leave Review" });
  });
});
