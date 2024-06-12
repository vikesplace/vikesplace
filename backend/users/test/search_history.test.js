import request from "supertest";
import express from "express";
import searchHistory from "../routes/search_history.js"; // Adjust the path as necessary

const identification = (req, res, next) => {
  console.log("Auth middleware logic here");
  next();
};

const app = express();
app.use(express.json());
app.use(identification);
app.use("/searchhistory", searchHistory);

describe("Search History Routes", () => {
  it("should get user's search history", async () => {
    const response = await request(app)
      .get("/searchhistory/user123/searches");
    expect(response.body).toEqual({ message: "Get user's search history" });
  });
});
