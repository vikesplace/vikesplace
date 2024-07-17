import axios from "axios";
import { createChat } from "../controller/create_chat";
jest.mock("axios");

describe("Create Chat Tests", () => {
  it("should create a chat", async () => {
    const mockOutput = {
      chat_id: 1,
      listing_id: 1,
      user_id_one: 1,
      user_id_two: 2,
    };
    axios.post.mockImplementation(() =>
      Promise.resolve({
        data: mockOutput,
      })
    );

    let responseObject = {};
    const mockRes = {
      body: {
        userId: 1,
      },
      json: jest.fn().mockImplementation((result) => {
        responseObject = result;
      }),
      status: jest.fn(),
      locals: { decodedToken: { userId: 1 } },
    };
    await createChat(
      {
        params: {
          listingId: "1",
        },
      },
      mockRes
    );
    expect(responseObject).toEqual(mockOutput);
  });

  it("should fail to create a chat", async () => {
    axios.post.mockImplementation(() =>
      Promise.resolve({ data: { message: "Could not create chat" } })
    );

    let responseObject = {};
    const mockRes = {
      body: {
        userId: 1,
      },
      json: jest.fn().mockImplementation((result) => {
        responseObject = result;
      }),
      status: jest.fn(),
      locals: { decodedToken: { userId: 1 } },
    };

    await createChat(
      {
        params: {
          listingId: "1",
        },
      },
      mockRes
    );
    expect(responseObject).toEqual({ message: "Could not create chat" });
  });
});
