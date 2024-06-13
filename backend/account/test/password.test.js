import request from "supertest";
import express from "express";
import passwordRouter from "../routes/password.js";

const identification = (req, res, next) => {
  console.log("Auth middleware logic here");
  next();
};

const app = express();
app.use(express.json());
app.use(identification);
app.use("/password", passwordRouter);

describe("Password Routes", () => {
  it("should send a reset password email on POST /password/request_reset", async () => {
    const response = await request(app)
      .post("/password/request_reset")
      .send({ email: "test@example.com" });
    expect(response.body).toEqual({ message: "reset password email sent" });
  });

  it("should reset the password on POST /password/verify_reset", async () => {
    const response = await request(app)
      .post("/password/verify_reset")
      .send({ token: "testtoken", newPassword: "newpassword" });
    expect(response.body).toEqual({ message: "password reset" });
  });
});
