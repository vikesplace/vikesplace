import axios from "axios";
import { ignoreRecommendation } from "../controller/ignore_recommendation.js";

jest.mock("axios");

describe("Ignore Recommendations", () => {
  it("Ignore Recommendation", async () => {
    const postFromAlgoResult = {
      status: 200,
      message: "Recommendation Ignored Successfully",
      results: 1,
    };

    axios.post.mockImplementation((url) => {
      return Promise.resolve({ data: postFromAlgoResult });
    });
    let statusValue = {};
    const req = {
      params: {
        listingId: 1,
      },
    };
    const mockRes = {
      body: {},
      json: jest.fn(),
      status: jest.fn().mockImplementation((status) => {
        statusValue = status;
        return mockRes;
      }),
      locals: { decodedToken: { userId: 1 } },
    };
    await ignoreRecommendation(req, mockRes);
    expect(statusValue).toEqual(200);
  });
  it("Failed to ignore", async () => {
    const postFromAlgoResult = {
      status: 422,
    };

    axios.post.mockImplementation((url) => {
      return Promise.resolve({ data: postFromAlgoResult });
    });
    let statusValue = {};
    const req = {
      params: {
        listingId: 1,
      },
    };
    const mockRes = {
      body: {},
      json: jest.fn().mockImplementation(),
      status: jest.fn((value) => {
        statusValue = value;
        return mockRes;
      }),
      locals: { decodedToken: { userId: 1 } },
    };

    await ignoreRecommendation(req, mockRes);
    expect(statusValue).toEqual(422);
  });
  it("Error Connection Refused to Alg Endpoint", async () => {
    const postFromAlgoResult = {
      status: 500,
    };

    axios.get.mockImplementation((url) => {
      return Promise.reject({ data: postFromAlgoResult });
    });
    let statusValue = {};
    const req = {
      params: {
        listingId: 1,
      },
    };
    let responseObject = {};
    const mockRes = {
      body: {},
      json: jest.fn().mockImplementation((response) => {
        responseObject = response;
      }),
      status: jest.fn((value) => {
        statusValue = value;
        return mockRes;
      }),
      locals: { decodedToken: { userId: 1 } },
    };

    await ignoreRecommendation(req, mockRes);
    expect(responseObject).toEqual({
      message: "Failed to Ignore Recommendation",
    });
  });
});
