import axios from "axios";
import { getUserMe } from "../controller/getUserMe";

jest.mock("axios");

describe("Get Own User Data", () => {
  it("Should return user data", async () => {
    const mockOutput = {
      user_id: 21,
      username: "TestUser",
      email: "testuser@example.com",
      location: {
        type: "Point",
        coordinates: [48.4784, -123.337822],
      },
      joining_date: "2024-01-20T10:00:00.000Z",
      items_sold: 0,
      items_bought: 0,
    };

    axios.get.mockImplementation((url) => {
      return Promise.resolve({ data: mockOutput });
    });
    let responseObject = {};
    const req = {};
    const mockRes = {
      body: {},
      json: jest.fn().mockImplementation((result) => {
        responseObject = result;
      }),
      status: jest.fn(),
      locals: { decodedToken: { userId: 1 } },
    };
    await getUserMe(req, mockRes);
    expect(responseObject).toEqual(mockOutput);
  });
  it("No valid userId", async () => {
    const mockOutput = {"message": "Error getting user",};

    axios.get.mockImplementation((url) => {
      return Promise.resolve({ data: { user: mockOutput } });
    });
    let responseObject = {};
    let mockStatusResult;
    const req = {};
    const mockRes = {
      body: {},
      json: jest.fn().mockImplementation((result) => {
        responseObject = result;
      }),
      status: jest.fn((value) => {
        mockStatusResult = value;
        return mockRes;
      }),
    };

    await getUserMe(req, mockRes);
    expect(mockStatusResult).toEqual(500);
    expect(responseObject).toEqual(mockOutput);
  });
});
