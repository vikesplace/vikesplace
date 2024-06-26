import request from "supertest";
import express from "express";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import router from "../routes/request_reset"; // Adjust the path as necessary

jest.mock("jsonwebtoken");
jest.mock("nodemailer");

const app = express();
app.use(express.json());
app.use("/", router);

describe("POST /", () => {
  let mockSendMail;

  beforeEach(() => {
    process.env.ACCESS_TOKEN_SECRET = "testsecret";
    process.env.EMAIL = "test@example.com";
    process.env.APPPASSWORD = "testpassword";

    jwt.sign.mockReturnValue("testtoken");

    mockSendMail = jest.fn((mailOptions, callback) => callback(null, "Email sent"));
    nodemailer.createTransport.mockReturnValue({ sendMail: mockSendMail });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should send reset email for a valid uvic.ca email", async () => {
    const response = await request(app)
      .post("/")
      .send({
        email: "valid@uvic.ca",
        callback: "http://localhost/reset"
      });

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ message: "Reset email sent successfully" });
    expect(jwt.sign).toHaveBeenCalledWith(
      { email: "valid@uvic.ca" },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: 900000 }
    );
    expect(mockSendMail).toHaveBeenCalledWith(
      expect.objectContaining({
        from: process.env.EMAIL,
        to: "valid@uvic.ca",
        subject: "Password Reset Request",
        text: expect.stringContaining("http://localhost/reset?jwt=testtoken")
      }),
      expect.any(Function)
    );
  });

  it("should return 400 if email domain is not uvic.ca", async () => {
    const response = await request(app)
      .post("/")
      .send({
        email: "invalid@gmail.com",
        callback: "http://localhost/reset"
      });

    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({ message: "Invalid email address" });
    expect(jwt.sign).not.toHaveBeenCalled();
    expect(mockSendMail).not.toHaveBeenCalled();
  });

  it("should return 500 if email fails to send", async () => {
    mockSendMail.mockImplementationOnce((mailOptions, callback) => callback(new Error("Failed to send")));

    const response = await request(app)
      .post("/")
      .send({
        email: "valid@uvic.ca",
        callback: "http://localhost/reset"
      });

    expect(response.statusCode).toBe(500);
    expect(response.body).toEqual({ message: "Failed to send reset email" });
    expect(jwt.sign).toHaveBeenCalled();
    expect(mockSendMail).toHaveBeenCalled();
  });

  it("should return 400 if email is missing", async () => {
    const response = await request(app)
      .post("/")
      .send({
        callback: "http://localhost/reset"
      });

    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({ message: "Invalid email address" });
    expect(jwt.sign).not.toHaveBeenCalled();
    expect(mockSendMail).not.toHaveBeenCalled();
  });

  it("should return 400 if callback is missing", async () => {
    const response = await request(app)
      .post("/")
      .send({
        email: "valid@uvic.ca"
      });

    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({ message: "Invalid email address" });
    expect(jwt.sign).not.toHaveBeenCalled();
    expect(mockSendMail).not.toHaveBeenCalled();
  });
});
