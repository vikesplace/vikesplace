// import request from "supertest";
// import express from "express";
// import registerRouter from "../routes/register.js";

// const identification = (req, res, next) => {
//   console.log("Auth middleware logic here");
//   next();
// };

// const app = express();
// app.use(express.json());
// app.use(identification);
// app.use("/register", registerRouter);

// describe("Register Routes", () => {
//   it("should send a verification email on POST /register/request_account", async () => {
//     const response = await request(app)
//       .post("/register/request_account")
//       .send({ email: "test@uvic.ca" });
//     expect(response.body).toEqual({ message: "verification email sent" });
//   });

//   it("should register a user on POST /register/verify_account", async () => {
//     const response = await request(app)
//       .post("/register/verify_account")
//       .send({ token: "testtoken", username: "testuser", password: "testpassword" });
//     expect(response.body).toEqual({ message: "user registered" });
//   });

//   it("should not send a verification email for an already registered email on POST /register/request_account", async () => {
//     const response = await request(app)
//       .post("/register/request_account")
//       .send({ email: "test@uvic.ca" });
//     expect(response.body).toEqual({ error: "email already registered" });
//   });

//   it("should not send a verification email for an invalid email on POST /register/request_account", async () => {
//     const response = await request(app)
//       .post("/register/request_account")
//       .send({ email: "invalidemail" });
//     expect(response.body).toEqual({ error: "invalid email format" });
//   });

//   it("should not send a verification email for a non uvic.ca email on POST /register/request_account", async () => {
//     const response = await request(app)
//       .post("/register/request_account")
//       .send({ email: "invalidemail@gmail.com" });
//     expect(response.body).toEqual({ error: "invalid email domain" });
//   });

//   it("should not register a user with an invalid token on POST /register/verify_account", async () => {
//     const response = await request(app)
//       .post("/register/verify_account")
//       .send({ token: "invalidtoken", username: "testuser", password: "testpassword" });
//     expect(response.body).toEqual({ error: "invalid token" });
//   });

//   it("should not register a user with a missing username on POST /register/verify_account", async () => {
//     const response = await request(app)
//       .post("/register/verify_account")
//       .send({ token: "validtoken", password: "testpassword" });
//     expect(response.body).toEqual({ error: "missing username" });
//   });

//   it("should not register a user with a missing password on POST /register/verify_account", async () => {
//     const response = await request(app)
//       .post("/register/verify_account")
//       .send({ token: "validtoken", username: "testuser" });
//     expect(response.body).toEqual({ error: "missing password" });
//   });
// });


import request from "supertest";
import express from "express";
import nodemailer from "nodemailer";
import router from "../routes/register";

jest.mock("nodemailer");

const app = express();
app.use(express.json());
app.use("/request_account", router);

const nodemailer = require("nodemailer");

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
      .send({ email: "test@uvic.ca", callback: "http://example.com/verify?token=" });

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ message: "Verification email sent successfully" });
    expect(mockSendMail).toHaveBeenCalled();
  });

  it("should return 400 for an invalid UVic email", async () => {
    const response = await request(app)
      .post("/request_account")
      .send({ email: "test@gmail.com", callback: "http://example.com/verify?token=" });

    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({ message: "Invalid email address" });
    expect(mockSendMail).not.toHaveBeenCalled();
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
    expect(response.body).toEqual({ message: "Invalid email address" });
    expect(mockSendMail).not.toHaveBeenCalled();
  });

  it("should return 200 if callback is missing", async () => {
    const response = await request(app)
      .post("/request_account")
      .send({ email: "test@uvic.ca" });

    expect(response.statusCode).toBe(200);
  });
});



