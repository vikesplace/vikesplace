import request from "supertest";
import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import axios from "axios";
import router from "../routes/verify_account"; // Adjust the path as necessary

jest.mock("bcryptjs");
jest.mock("axios");
jest.mock("jsonwebtoken");

const app = express();
app.use(express.json());
app.use("/verify_account", router);

describe("POST /verify_account", () => {
  let mockHash;
  let mockPost;

  beforeEach(() => {
    process.env.ACCESS_TOKEN_SECRET = "testsecret";
    mockHash = bcrypt.hash.mockImplementation(() => "hashedpassword");
    mockPost = axios.post.mockImplementation((url, data) => {
      if (url === "/user") {
        return Promise.resolve({ data: { user_id: 1 } });
      }
    });
    jwt.sign.mockReturnValue("testtoken");
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should create a new user with valid input", async () => {
    const response = await request(app)
      .post("/verify_account")
      .send({
        jwt: "validjwt",
        username: "valid_user",
        password: "Valid1@password",
        location: "V8Y2L5",
      });

    expect(response.statusCode).toBe(201);
    expect(response.body).toEqual({ userId: 1 });
    expect(jwt.sign).toHaveBeenCalledWith(
      { userId: 1 },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "2h" }
    );
    expect(bcrypt.hash).toHaveBeenCalledWith("Valid1@password", 10);
  });

  it("should return 400 if validation fails for username", async () => {
    const response = await request(app)
      .post("/verify_account")
      .send({
        jwt: "validjwt",
        username: "short",
        password: "Valid1@password",
        location: "V8Y2L5",
      });

    expect(response.statusCode).toBe(400);
    expect(response.body.message).toContain("Username must be 6-20 characters long");
  });

  it("should return 400 if validation fails for password", async () => {
    const response = await request(app)
      .post("/verify_account")
      .send({
        jwt: "validjwt",
        username: "valid_user",
        password: "short",
        location: "V8Y2L5",
      });

    expect(response.statusCode).toBe(400);
    expect(response.body.message).toContain("Password must be at least 8 characters long");
  });

  it("should return 400 if jwt token is missing", async () => {
    const response = await request(app)
      .post("/verify_account")
      .send({
        username: "valid_user",
        password: "Valid1@password",
        location: "V8Y2L5",
      });

    expect(response.statusCode).toBe(400);
    expect(response.body.message).toContain("jwt is required");
  });

  it("should return 400 if axios post fails", async () => {
    mockPost.mockImplementationOnce(() => Promise.reject(new Error("Failed to create user")));

    const response = await request(app)
      .post("/verify_account")
      .send({
        jwt: "validjwt",
        username: "valid_user",
        password: "Valid1@password",
        location: "V8Y2L5",
      });

    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe("Cannot read properties of undefined (reading 'email')");
  });
});