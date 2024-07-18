import axios from "axios";
import { createRating } from "../controllers/createRating";

jest.mock("axios");

describe("Create Rating Tests", () => {
  it("should create a rating", async () => {
    const mockOutput = {
      ratingId: 1,
      timestamp: "2024-07-08T08:08:13.414Z",
    };

    axios.post.mockImplementation(() =>
      Promise.resolve({
        data: {
          rating_id: 1,
          rating_value: 5,
          listing_id: 1,
          timestamp: "2024-07-08T08:08:13.414Z",
          user_id: 1,
        },
        status: 200,
      })
    );
    let postResponse = {};
    const mockPostRes = {
      body: {},
      json: jest.fn().mockImplementation((result) => {
        postResponse = result;
      }),
      status: jest.fn(),
      locals: { decodedToken: { userId: 1 } },
    };

    const mockReq = {
      body: {
        ratingValue: 1,
      },
      params: {
        listingId: 1,
      },
    };

    await createRating(mockReq, mockPostRes);
    expect(postResponse).toEqual(mockOutput);
  });
  it("should fail to create listing", async () => {
    const mockOutput = {
      message: "Error creating rating",
    };

    axios.post.mockImplementation(() =>
      Promise.resolve({
        data: {
          rating_id: 1,
          rating_value: 5,
          listing_id: 1,
          timestamp: "2024-07-08T08:08:13.414Z",
          user_id: 1,
        },
        status: 200,
      })
    );
    let postResponse = {};
    const mockPostRes = {
      body: {},
      json: jest.fn().mockImplementation((result) => {
        postResponse = result;
      }),
      status: jest.fn(() => mockPostRes),
    };

    const mockReq = {
      body: {
        ratingValue: 1,
      },
      params: {
        listingId: 1,
      },
    };

    await createRating(mockReq, mockPostRes);
    expect(postResponse).toEqual(mockOutput);
  });
});
