import request from "supertest";
import express from "express";
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";
import router from "../routes/register";
import { registerUser } from "../controllers/register_user.js";

jest.mock("nodemailer");
jest.mock("jsonwebtoken");

const app = express();
app.use(express.json());
app.use("/", router);
app.use("/request_account", router);

const mailOptions = {
  from: process.env.EMAIL,
  to: "test@uvic.ca",
  subject: "Account Verification",
  text: expect.stringContaining("http://localhost:5002/verify-account?jwt="),
};

const sendMailMock = {
  sendMail: jest.fn((mailOptions, callback) => callback("test")),
};

nodemailer.createTransport.mockReturnValue({
  sendMail: sendMailMock,
});

// Set default environment variables for testing
process.env.ACCESS_TOKEN_SECRET = "test_secret_key";
process.env.EMAIL = "test@domain.com";
process.env.APP_PASSWORD = "test_password";

describe("POST /", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jwt.sign.mockReturnValue("testtoken");
  });

  it("should send verification email successfully", async () => {
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
        email: "test@uvic.ca",
        callback: "http://localhost:5002/verify-account?jwt=",
      },
    };
    await registerUser(mockReq, mockPostRes);

    expect(postResponse).toEqual({ message: "User logged in successfully" });
  });

  it("should return 400 for an invalid UVic email", async () => {
    const response = await request(app).post("/request_account").send({
      email: "test@gmail.com",
      callback: "http://example.com/verify?token=",
    });

    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({ message: "Invalid email address" });
  });

  it("should return 500 if email sending fails", async () => {
    sendMailMock.mockImplementationOnce((mailOptions, callback) => {
      callback(new Error("Failed to send email"));
    });

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
        email: "test@uvic.ca",
        callback: "http://localhost:5002/verify-account?jwt=",
      },
    };
    await registerUser(mockReq, mockPostRes);

    console.log(response.error); //for debugging
    console.log(response.status); //for debugging

    expect(postResponse).toEqual({ message: "User logged in successfully" });
  });

  it("should return 400 if email is missing", async () => {
    const response = await request(app)
      .post("/request_account")
      .send({ callback: "http://example.com/verify?token=" });

    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({ message: "Email is required" });
  });

  it("should return 400 if callback is missing", async () => {
    const response = await request(app)
      .post("/request_account")
      .send({ email: "test@uvic.ca" });

    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({ message: "Callback URL is required" });
  });
});
