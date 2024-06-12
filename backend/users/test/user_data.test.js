import request from "supertest";
import express from "express";
import userData from "../routes/user_data.js";

const identification = (req, res, next) => {
  console.log("Auth middleware logic here");
  next();
};

const app = express();
app.use(express.json());
app.use(identification);
app.use("/userdata", userData);

describe("User Data Routes", () => {
  it("should get data of the logged-in user", async () => {
    const response = await request(app).get("/userdata/me");
    expect(response.body).toEqual({ message: "Get user data" });
  });

  it("should get another user's data", async () => {
    const response = await request(app).get("/userdata/user123");
    expect(response.body).toEqual({ message: "Get another user data" });
  });

  it("should update user data", async () => {
    const response = await request(app)
      .patch("/userdata/user123")
      .send({ name: "Updated Name" });
    expect(response.body).toEqual({ message: "Update user data" });
  });
});
