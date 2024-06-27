import axios from "axios";
import { getChatIds } from "../controller/get_chat_ids";

jest.mock("axios");

describe("Get Chat Ids", () => {
  it("it should return all chat ids", async () => {
    const mockOutput = [
      {
        chat_id: 1,
        listing_id: 1,
        user_id_one: 1,
        user_id_two: 2,
        timestamp: "2024-06-17T06:25:41.995Z",
        last_message_time: "2024-06-17T06:25:41.995Z",
      },
      {
        chat_id: 2,
        listing_id: 2,
        user_id_one: 3,
        user_id_two: 4,
        timestamp: "2024-06-17T06:25:41.995Z",
        last_message_time: "2024-06-17T06:25:41.995Z",
      },
    ];

    const mockDecodedToken = { userId: 1 };

    axios.get.mockResolvedValue({ data: mockOutput, status: 200 });

    let responseObject = {};

    const mockRes = {
      locals: { decodedToken: mockDecodedToken },
      json: jest.fn().mockImplementation((result) => {
        responseObject = result;
      }),
      status: jest.fn(),
      locals: { decodedToken: { userId: 1 } },
    };

    await getChatIds({}, mockRes);

    expect(responseObject).toEqual(mockOutput);
  });

  it("it should fail to return all chat ids", async () => {
    axios.get.mockImplementation(() =>
      Promise.resolve({ data: { message: "User id not found" } })
    );
    let responseObject = {};
    const mockRes = {
      body: {},
      json: jest.fn().mockImplementation((result) => {
        responseObject = result;
      }),
      status: 200,
      locals: { decodedToken: { userId: 1 } }
    };
    await getChatIds(
      {
        params: {
          userId: "1",
        },
      },
      mockRes
    );
    expect(responseObject).toEqual({ message: "User id not found" });
  });
});
