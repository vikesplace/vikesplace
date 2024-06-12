import request from "supertest";
import express from "express";
import registerRouter from "../routes/register.js";

const identification = (req, res, next) => {
  console.log("Auth middleware logic here");
  next();
};
// dsfds
const app = express();
app.use(express.json());
app.use(identification);
app.use("/register", registerRouter);

describe("Register Routes", () => {
  it("should return register message on GET /register", async () => {
    const response = await request(app).get("/register");
    expect(response.body).toEqual({ message: "register" });
  });

  it("should register a user on POST /register", async () => {
    const response = await request(app)
      .post("/register")
      .send({ username: "test", password: "test" });
    expect(response.body).toEqual({ message: "User registered" });
  });
});
