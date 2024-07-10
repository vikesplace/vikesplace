import axios from "axios";
import { sendMessages } from "../controller/send_messages";

jest.mock("axios");

describe("Send Messages Test", () => {
  it("should send a message", async () => {
    const mockOutput = {
      message_id: 1,
      listing_id: 1,
      chat_id: 1,
      message_content: "Hello",
      sender_id: 1,
      receiver_id: 2
    };
    axios.post.mockImplementation(() =>
      Promise.resolve({
        data: mockOutput,
      })
    );


    let responseObject = {};
    const mockRes = {
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
        params: { chatId: "1" },
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
        params: { chatId: "1" },
      },
      mockRes
    );
    expect(responseObject).toEqual({ message: "Could not send message" });
  });
});
