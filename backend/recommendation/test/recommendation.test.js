import request from "supertest";
import express from "express";
import recommendationRouter from "../routes/recommendation.js";

const identification = (req, res, next) => {
    console.log("Auth middleware logic here");
    next();
};

const app = express();
app.use(express.json());
app.use(identification);
app.use("/recommendation", recommendationRouter);

describe("Recommendation Routes", () => {
  it("should get recommendations on GET /recommendation", async () => {
    const response = await request(app).get("/recommendation");
    expect(response.body).toEqual({ message: "Get Recommendations" });
  });

  it("should ignore a recommendation on POST /recommendation/:listingId/ignore", async () => {
    const response = await request(app)
      .post("/recommendation/123/ignore")
      .send();
    expect(response.body).toEqual({ message: "Ignore Recommendation" });
  });
});
