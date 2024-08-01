import request from "supertest";
import express from "express";
import axios from "axios";
import jwt from "jsonwebtoken";
import router from "../routes/login"; // Adjust the path as necessary
import { loginUser } from "../controllers/login_user.js";

jest.mock("axios");
jest.mock("jsonwebtoken");

const app = express();
app.use(express.json());
app.use("/login", router);

describe("POST /login", () => {
  beforeEach(() => {
    process.env.ACCESS_TOKEN_SECRET = "testsecret";
    jwt.sign.mockReturnValue("testtoken");
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should login user with valid credentials", async () => {
    axios.post.mockResolvedValueOnce({ data: { user_id: 1 } });

    let postResponse = {};
    const mockPostRes = {
      body: {},
      json: jest.fn().mockImplementation((result) => {
        postResponse = result;
      }),
      status: jest.fn().mockReturnThis(),
      cookie: jest.fn().mockReturnThis(),
    };

    const mockReq = {
      body: {
        username: "testUser",
        password: "testpassword",
      },
    };
    await loginUser(mockReq, mockPostRes);

    expect(postResponse).toEqual({ message: "User logged in successfully" });
  });

  it("should return 400 if validation fails for username", async () => {
    const response = await request(app).post("/login").send({
      password: "Valid1@password",
    });

    expect(response.statusCode).toBe(400);
    expect(response.body.message).toContain("Username is required");
    expect(jwt.sign).not.toHaveBeenCalled();
    expect(axios.post).not.toHaveBeenCalled();
  });

  it("should return 400 if validation fails for password", async () => {
    const response = await request(app).post("/login").send({
      username: "valid_user",
      password: "short",
    });

    expect(response.statusCode).toBe(400);
    expect(response.body.message).toContain(
      "Password must be at least 8 characters long"
    );
    expect(jwt.sign).not.toHaveBeenCalled();
    expect(axios.post).not.toHaveBeenCalled();
  });

  it("should return 400 if axios post fails with 400", async () => {
    axios.post.mockRejectedValueOnce({
      response: {
        status: 400,
        data: { message: "Invalid credentials" },
      },
    });

    const response = await request(app).post("/login").send({
      username: "invalid_user",
      password: "Invalid1@password",
    });

    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe("Invalid credentials");
    expect(jwt.sign).not.toHaveBeenCalled();
  });

  it("should return 500 if axios post fails with no response", async () => {
    axios.post.mockRejectedValueOnce(new Error("Network error"));

    const response = await request(app).post("/login").send({
      username: "valid_user",
      password: "Valid1@password",
    });

    expect(response.statusCode).toBe(500);
    expect(response.body.message).toBe("Internal server error");
    expect(jwt.sign).not.toHaveBeenCalled();
  });

  it("should return 400 if there is a server error", async () => {
    // axios.post.mockResolvedValueOnce({ data: { user_id: 1 } });
    const response = await request(app).post("/login").send({
      username: "alpha_123",
      password: "Abcdefgh123@",
    });
    // expect(response.statusCode).toBe(200);
    expect(response.body.message).toContain("Internal server error");
  });
});
