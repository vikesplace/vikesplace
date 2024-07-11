import request from "supertest";
import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import axios from "axios";
import router from "../routes/verify_reset";

jest.mock("jsonwebtoken");
jest.mock("bcryptjs");
jest.mock("axios");

const app = express();
app.use(express.json());
app.use("/", router);

describe("POST /", () => {
  beforeEach(() => {
    process.env.ACCESS_TOKEN_SECRET = "test_secret";
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should change the password with a valid token and valid new password", async () => {
    jwt.verify.mockReturnValueOnce({ email: "test@uvic.ca" });
    bcrypt.hash.mockResolvedValueOnce("hashedPassword");
    axios.post.mockResolvedValueOnce({ data: {} });

    const response = await request(app)
      .post("/")
      .send({
        jwt: "validToken",
        password: "Valid1@password",
      });

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ message: "Password updated successfully" });
    console.log(response.error);
    expect(jwt.verify).toHaveBeenCalledWith("validToken", process.env.ACCESS_TOKEN_SECRET);
    expect(bcrypt.hash).toHaveBeenCalledWith("Valid1@password", 10);
    expect(axios.post).toHaveBeenCalledWith("/user/resetPassword/", {
      email: "test@uvic.ca",
      password: "hashedPassword",
    });
  });

  it("should return 400 if password validation fails", async () => {
    const response = await request(app)
      .post("/")
      .send({
        jwt: "validToken",
        password: "short", // Password length less than 8 characters
      });

    expect(response.statusCode).toBe(400);
    expect(response.body.message).toContain("Password must be at least 8 characters long");
    expect(jwt.verify).not.toHaveBeenCalled();
    expect(bcrypt.hash).not.toHaveBeenCalled();
    expect(axios.post).not.toHaveBeenCalled();
  });

  it("should return 400 if there's an error updating the password", async () => {
    jwt.verify.mockReturnValueOnce({ email: "test@uvic.ca" });
    bcrypt.hash.mockResolvedValueOnce("hashedPassword");
    axios.post.mockRejectedValueOnce(new Error("Database error"));

    const response = await request(app)
      .post("/")
      .send({
        jwt: "validToken",
        password: "Valid1@password",
      });

    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe("Database error");
    expect(jwt.verify).toHaveBeenCalledWith("validToken", process.env.ACCESS_TOKEN_SECRET);
    expect(bcrypt.hash).toHaveBeenCalledWith("Valid1@password", 10);
    expect(axios.post).toHaveBeenCalledWith("/user/resetPassword/", {
      email: "test@uvic.ca",
      password: "hashedPassword",
    });
  });

  it("should return 400 if token is missing", async () => {
    const response = await request(app)
      .post("/")
      .send({
        password: "Valid1@password",
      });

    expect(response.statusCode).toBe(400);
    expect(response.body.message).toContain("token is missing");
    expect(jwt.verify).not.toHaveBeenCalled();
    expect(bcrypt.hash).not.toHaveBeenCalled();
    expect(axios.post).not.toHaveBeenCalled();
  });

  it("should return 400 if new password is missing", async () => {
    const response = await request(app)
      .post("/")
      .send({
        jwt: "validToken",
      });

    expect(response.statusCode).toBe(400);
    expect(response.body.message).toContain("Password must be at least 8 characters long");
    expect(jwt.verify).not.toHaveBeenCalled();
    expect(bcrypt.hash).not.toHaveBeenCalled();
    expect(axios.post).not.toHaveBeenCalled();
  });
});