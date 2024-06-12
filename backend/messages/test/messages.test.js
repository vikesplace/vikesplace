import request from "supertest";
import express from "express";
import messagesRouter from "../routes/messages.js";

const identification = (req, res, next) => {
  console.log("Auth middleware logic here");
  next();
};

const app = express();
app.use(express.json());
app.use(identification);
app.use("/messages", messagesRouter);

describe("Messages Routes", () => {
  it("should get all chat_ids for the logged in user on GET /messages/chats", async () => {
    const response = await request(app).get("/messages/chats");
    expect(response.body).toEqual({ message: "Get all chat_ids" });
  });

  it("should get all messages for a chat on GET /messages/:chatId", async () => {
    const response = await request(app).get("/messages/123");
    expect(response.body).toEqual({ message: "Get all messages for a chat" });
  });

  it("should get chat data on GET /messages/chats/:chatId", async () => {
    const response = await request(app).get("/messages/chats/123");
    expect(response.body).toEqual({ message: "Get chat data" });
  });

  it("should send a message on POST /messages/:chatId", async () => {
    const response = await request(app)
      .post("/messages/123")
      .send({ text: "Hello" });
    expect(response.body).toEqual({ message: "Send a message" });
  });
});
