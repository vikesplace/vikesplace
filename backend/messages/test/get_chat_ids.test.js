import axios from "axios";
import { getChatIds } from "../controller/get_chat_ids";

jest.mock("axios");

describe("Get Chat Ids", () => {
  it("it should return all chat ids", async () => {
    const mockOutput = [
      { chatId: 1 },
      { chatId: 2 },
    ];

    axios.get.mockImplementation(() =>
      Promise.resolve({
        data: mockOutput
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

    await getChatIds(
      {},
      mockRes
    );

    expect(responseObject).toEqual({chats: [1, 2]});
  });

  it("it should fail to return all chat ids", async () => {
    axios.get.mockImplementation(() =>
      Promise.resolve({ data: { message: "Failed to get chats" } })
    );
    let responseObject = {};
    const mockRes = {
      json: jest.fn().mockImplementation((result) => {
        responseObject = result;
      }),
      status: jest.fn().mockReturnThis(),
      locals: { decodedToken: { userId: 1 } },
    };

    await getChatIds(
      {},
      mockRes
    );
    expect(responseObject).toEqual({ message: "Failed to get chats" });
  });
});
