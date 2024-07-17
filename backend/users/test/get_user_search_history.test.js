import axios from "axios";
import { getUserSearchHistory } from "../controller/get_user_search_history";

jest.mock("axios");

describe("Get User Search History", () => {
  it("Gets User Search History", async () => {
    const getFromAlgoResult = {
      status: 200,
      message: "Search history successful",
      results: [
        {
          query: "Laptop",
          timestamp: "2024-06-14T00:00:00",
        },
        {
          query: "Computer",
          timestamp: "2024-06-14T00:00:00",
        },
      ],
    };

    const output = { searches: ["Laptop", "Computer"] };

    axios.get.mockImplementation((url) => {
      return Promise.resolve({ data: getFromAlgoResult });
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
    await getUserSearchHistory(req, mockRes);
    expect(responseObject).toEqual(output);
  });
  it("No search results", async () => {
    const getFromAlgoResult = {
      status: 200,
      message: "Search history successful",
      results: null,
    };

    const output = {
      searches: [],
    };

    axios.get.mockImplementation((url) => {
      return Promise.resolve({ data: { user: getFromAlgoResult } });
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
      locals: { decodedToken: { userId: 1 } },
    };

    await getUserSearchHistory(req, mockRes);
    expect(responseObject).toEqual(output);
  });
  it("Error Connection Refused to Alg Endpoint", async () => {
    const getFromAlgoResult = {
      status: 500,
      message: "Search history successful",
    };

    const output = {
      message: "Error getting searches",
    };

    axios.get.mockImplementation((url) => {
      return Promise.reject({ data: getFromAlgoResult });
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
      locals: { decodedToken: { userId: 1 } },
    };

    await getUserSearchHistory(req, mockRes);
    expect(responseObject).toEqual(output);
  });
});
