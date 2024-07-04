import request from "supertest";
import express from "express";
import nodemailer from "nodemailer";
import router from "../routes/register";

jest.mock("nodemailer");

const app = express();
app.use(express.json());
app.use("/", router);
app.use("/request_account", router);

const sendMailMock = jest.fn();

nodemailer.createTransport.mockReturnValue({
  sendMail: sendMailMock,
});

describe('POST /', () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should send verification email successfully', async () => {
    
    sendMailMock.mockImplementation((mailOptions, callback) => {
      callback(null, { response: '250 OK' });
    });

    const response = await request(app)
      .post('/')
      .send({
        email: 'test@uvic.ca',
        callback: 'http://localhost:3000/verify?token=',
      });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Verification email sent successfully');
    expect(sendMailMock).toHaveBeenCalledTimes(1);
    expect(sendMailMock).toHaveBeenCalledWith(
      expect.objectContaining({
        from: process.env.EMAIL,
        to: 'test@uvic.ca',
        subject: 'Account Verification',
        text: expect.stringContaining('http://localhost:3000/verify?token='),
      }),
      expect.any(Function)
    );
  });

  it("should return 400 for an invalid UVic email", async () => {
    const response = await request(app)
      .post("/request_account")
      .send({ email: "test@gmail.com", callback: "http://example.com/verify?token=" });

    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({ message: "Invalid email address" });
  });

  it("should return 500 if email sending fails", async () => {
    sendMailMock.mockImplementationOnce((mailOptions, callback) => {
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