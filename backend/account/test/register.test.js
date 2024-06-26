import request from "supertest";
import express from "express";
import registerRouter from "../routes/register.js";

const identification = (req, res, next) => {
  console.log("Auth middleware logic here");
  next();
};

const app = express();
app.use(express.json());
app.use(identification);
app.use("/register", registerRouter);

describe("Register Routes", () => {
  it("should send a verification email on POST /register/request_account", async () => {
    const response = await request(app)
      .post("/register/request_account")
      .send({ email: "test@uvic.ca" });
    expect(response.body).toEqual({ message: "verification email sent" });
  });

  it("should register a user on POST /register/verify_account", async () => {
    const response = await request(app)
      .post("/register/verify_account")
      .send({ token: "testtoken", username: "testuser", password: "testpassword" });
    expect(response.body).toEqual({ message: "user registered" });
  });

  it("should not send a verification email for an already registered email on POST /register/request_account", async () => {
    const response = await request(app)
      .post("/register/request_account")
      .send({ email: "test@uvic.ca" });
    expect(response.body).toEqual({ error: "email already registered" });
  });

  it("should not send a verification email for an invalid email on POST /register/request_account", async () => {
    const response = await request(app)
      .post("/register/request_account")
      .send({ email: "invalidemail" });
    expect(response.body).toEqual({ error: "invalid email format" });
  });

  it("should not send a verification email for a non uvic.ca email on POST /register/request_account", async () => {
    const response = await request(app)
      .post("/register/request_account")
      .send({ email: "invalidemail@gmail.com" });
    expect(response.body).toEqual({ error: "invalid email domain" });
  });

  it("should not register a user with an invalid token on POST /register/verify_account", async () => {
    const response = await request(app)
      .post("/register/verify_account")
      .send({ token: "invalidtoken", username: "testuser", password: "testpassword" });
    expect(response.body).toEqual({ error: "invalid token" });
  });

  it("should not register a user with a missing username on POST /register/verify_account", async () => {
    const response = await request(app)
      .post("/register/verify_account")
      .send({ token: "validtoken", password: "testpassword" });
    expect(response.body).toEqual({ error: "missing username" });
  });

  it("should not register a user with a missing password on POST /register/verify_account", async () => {
    const response = await request(app)
      .post("/register/verify_account")
      .send({ token: "validtoken", username: "testuser" });
    expect(response.body).toEqual({ error: "missing password" });
  });
});
