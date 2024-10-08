import axios from "axios";
import { getAllMessages } from "../controller/get_all_messages";

jest.mock("axios");

describe("Get all Messages", () => {
  it("it should return all messages", async () => {
    const mockOutput = [
      {
        message_id: 1,
        message_content: "Hello World",
        listing_id: 1,
        timestamp: "2024-06-17T06:25:41.995Z",
      },
      {
        message_id: 2,
        message_content: "Hello World Again",
        listing_id: 1,
        timestamp: "2024-06-18T06:25:41.995Z",
      },
    ];

    axios.get.mockImplementation(() =>
      Promise.resolve({
        data: mockOutput,
      })
    );

    let responseObject = {};
    const mockRes = {
      body: {},
      json: jest.fn().mockImplementation((result) => {
        responseObject = result;
      }),
      status: jest.fn(),
    };
    await getAllMessages(
      {
        params: {
          chatId: "1",
        },
      },
      mockRes
    );
    expect(responseObject).toEqual({messages: mockOutput});
  });

  it("it should fail to return all messages", async () => {
    axios.get.mockImplementation(() =>
      Promise.resolve({ data: {} })
    );
    let responseObject = {};
    const mockRes = {
      body: {},
      json: jest.fn().mockImplementation((result) => {
        responseObject = result;
      }),
      status: jest.fn(),
    };
    await getAllMessages(
      {
        params: {
          chatId: "1",
        },
      },
      mockRes
    );
    expect(responseObject).toEqual({messages: {}});
  });
});
