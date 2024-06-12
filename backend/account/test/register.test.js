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
      .send({ email: "test@example.com" });
    expect(response.body).toEqual({ message: "verification email sent" });
  });

  it("should register a user on POST /register/verify_account", async () => {
    const response = await request(app)
      .post("/register/verify_account")
      .send({ token: "testtoken", username: "testuser", password: "testpassword" });
    expect(response.body).toEqual({ message: "user registered" });
  });
});
