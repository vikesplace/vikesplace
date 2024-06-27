import axios from "axios";
import { sendMessages } from "../controller/send_messages";

jest.mock("axios");

describe("Send Messages Test", () => {
  it("should send a message", async () => {
    const mockOutput = {
      message: "Invalid input data",
    };
    axios.post.mockImplementation(() => Promise.resolve({ data: {} }));
    let responseObject = {};
    const mockRes = {
      body: {},
      json: jest.fn().mockImplementation((result) => {
        responseObject = result;
      }),
      status: jest.fn(),
      locals: { decodedToken: { userId: 1 } },
    };
    await sendMessages(
      {
        params: {
          chatId: "1",
        },
      },
      mockRes
    );
    expect(responseObject).toEqual(mockOutput);
  });
  it("should fail to send a message", async () => {
    axios.post.mockImplementation(() =>
      Promise.resolve({ data: { message: "Could not send message" } })
    );
    let responseObject = {};
    const mockRes = {
      body: {},
      json: jest.fn().mockImplementation((result) => {
        responseObject = result;
      }),
      status: jest.fn(),
      locals: { decodedToken: { userId: 1 } },
    };
    await sendMessages(
      {
        body: {
          content: "Hello",
        },
        params: { chatId: "123" },
      },
      mockRes
    );
    expect(responseObject).toEqual({ message: "Could not send message" });
  });
});
