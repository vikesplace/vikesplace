import request from "supertest";
import express from "express";
import nodemailer from "nodemailer";
import router from "../routes/register";

jest.mock("nodemailer");

const app = express();
app.use(express.json());
app.use("/request_account", router);

describe("POST /request_account", () => {
  let mockSendMail;

  beforeEach(() => {
    // Clear all instances and calls to constructor and all methods:
    nodemailer.createTransport.mockClear();
    mockSendMail = jest.fn((mailOptions, callback) => {
      callback(null, { response: "250 Message accepted" });
    });

    nodemailer.createTransport.mockReturnValue({
      sendMail: mockSendMail,
    });
  });

  it("should send a verification email for a valid UVic email", async () => {
    const response = await request(app)
      .post("/request_account")
      .send({ email: "amanpalod@uvic.ca", callback: "http://localhost:5002/verify-account/?jwt=" });

    // expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ message: "Verification email sent successfully" });
    // expect(mockSendMail).toHaveBeenCalled();
  });

  it("should return 400 for an invalid UVic email", async () => {
    const response = await request(app)
      .post("/request_account")
      .send({ email: "test@gmail.com", callback: "http://example.com/verify?token=" });

    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({ message: "Invalid email address" });
  });

  it("should return 500 if email sending fails", async () => {
    mockSendMail.mockImplementationOnce((mailOptions, callback) => {
      callback(new Error("Failed to send email"));
    });

    const response = await request(app)
      .post("/request_account")
      .send({ email: "test@uvic.ca", callback: "http://example.com/verify?token=" });

    expect(response.statusCode).toBe(500);
    expect(response.body).toEqual({ message: "Failed to send verification email" });
    expect(mockSendMail).toHaveBeenCalled();
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
      expect(response.body).toEqual({ message: "Callback URL is required" });
      expect(response.statusCode).toBe(400);
  });
});