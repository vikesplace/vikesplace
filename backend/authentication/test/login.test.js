import request from "supertest";
import express from "express";
import loginRouter from "../routes/login.js";

const identification = (req, res, next) => {
  console.log("Auth middleware logic here");
  next();
};

const app = express();
app.use(express.json());
app.use(identification);
app.use("/login", loginRouter);

describe("Login Routes", () => {
  it("should return login message on GET /login", async () => {
    const response = await request(app).get("/login");
    expect(response.body).toEqual({ message: "login" });
  });

  it("should log in a user on POST /login", async () => {
    const response = await request(app)
      .post("/login")
      .send({ username: "test", password: "test" });
    expect(response.body).toEqual({ message: "User logged in" });
  });
});
