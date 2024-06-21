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
  it("should log in a user on POST /login", async () => {
    const response = await request(app)
      .post("/login")
      .send({ username: "test", password: "test" });
    expect(response.body).toEqual({ message: "User logged in" });
  });

  it("should not log in a user with incorrect username on POST /login", async () => {
    const response = await request(app)
      .post("/login")
      .send({ username: "wronguser", password: "test" });
    expect(response.body).toEqual({ error: "Invalid username or password" });
  });

  it("should not log in a user with incorrect password on POST /login", async () => {
    const response = await request(app)
      .post("/login")
      .send({ username: "test", password: "wrongpassword" });
    expect(response.body).toEqual({ error: "Invalid username or password" });
  });

  it("should not log in a user with missing username on POST /login", async () => {
    const response = await request(app)
      .post("/login")
      .send({ password: "test" });
    expect(response.body).toEqual({ error: "Username is required" });
  });

  it("should not log in a user with missing password on POST /login", async () => {
    const response = await request(app)
      .post("/login")
      .send({ username: "test" });
    expect(response.body).toEqual({ error: "Password is required" });
  });

  it("should not log in a user with missing username and password on POST /login", async () => {
    const response = await request(app)
      .post("/login")
      .send({});
    expect(response.body).toEqual({ error: "Username and password are required" });
  });

  it("should not log in an unregistered user on POST /login", async () => {
    const response = await request(app)
      .post("/login")
      .send({ username: "unregistereduser", password: "password" });
    expect(response.body).toEqual({ error: "Invalid username or password" });
  });
});
