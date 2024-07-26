import request from "supertest";
import express from "express";
import axios from "axios";
import jwt from "jsonwebtoken";
import router from "../routes/logout"; // Adjust the path as necessary

jest.mock("axios");
jest.mock("jsonwebtoken");

const app = express();
app.use(express.json());
app.use("/logout", router);

describe("Get /logout", () => {

  it("should return 200 if to logout", async () => {
    const response = await request(app)
      .get("/logout").send();

    expect(response.statusCode).toBe(200);
  });
});

