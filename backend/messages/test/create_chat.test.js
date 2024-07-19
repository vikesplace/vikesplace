import axios from "axios";
import { createChat } from "../controller/create_chat";
jest.mock("axios");

describe("Create Chat Tests", () => {
  it("should create a chat", async () => {
    axios.post.mockImplementation(() =>
      Promise.resolve({
        data: "1", status: 200
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
    expect(responseObject).toEqual({ chatId: "1" });
  });

  it("should fail to create a chat", async () => {
    axios.post.mockRejectedValue({ response: { status: 500 } });
    
    let responseObject = {};
    const mockRes = {
      body: {
        userId: 1,
      },
      json: jest.fn().mockImplementation((result) => {
        responseObject = result;
      }),
      status: jest.fn().mockReturnThis(),
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
    expect(responseObject).toEqual({message: "Failed to create chat" });
  });

  it("should fail if chat already exists", async () => {
    axios.post.mockRejectedValue({ response: { data: { message: "Chat already exists" }, status: 400 } });

    let responseObject = {};
    const mockRes = {
      body: {
        userId: 1,
      },
      json: jest.fn().mockImplementation((result) => {
        responseObject = result;
      }),
      status: jest.fn().mockReturnThis(),
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
    expect(responseObject).toEqual({ message: "Chat already exists" });
  });
});
