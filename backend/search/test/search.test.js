import request from "supertest";
import express from "express";
import searchRouter from "../routes/search.js";

const identification = (req, res, next) => {
    console.log("Auth middleware logic here");
    next();
};

const app = express();
app.use(express.json());
app.use(identification);
app.use("/search", searchRouter);

describe("Search Routes", () => {
    it("should return search results on GET /search", async () => {
        const response = await request(app).get("/search");
        expect(response.body).toEqual({ message: "Get Search Results" });
    });
});
