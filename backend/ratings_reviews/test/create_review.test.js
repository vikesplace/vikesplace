import axios from "axios";
import { createReview } from "../controller/create_review";

jest.mock("axios");

describe("Create Review Tests", () => {
    it("should create a review", async () => {
        const mockOutput = {
            reviewedListingId: 1,
            listingReviewId: 1,
            timestamp: "2024-07-08T08:08:13.414Z",
        };
        axios.post.mockImplementation(() =>
            Promise.resolve(
                {
                    data: {
                        review_id: 1,
                        review_content: "test",
                        listing_id: 1,
                        timestamp: "2024-07-08T08:08:13.414Z",
                        user_id: 1,
                        rating_id: 1
                      },
                      status: 200,
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

        await createReview(
            {
                body: {
                    review_content: "test",
                    listingReviewId: 1,
                    reviewedListingId: 1,
                },
                params: { listingId: 1 },
            },
            mockRes
        );
        expect(responseObject).toEqual(mockOutput);
    });


    it("should fail to create review", async () => {
        const mockOutput = {
            message: "Failed to create review",
        };

        axios.post.mockImplementation(() =>
            Promise.resolve({
                data: {
                    listing_review_id: 1,
                    review_content: "test",
                    reviewed_listing_id: 1,
                    timestamp: "2021-04-14T22:04:59.000Z",
                    review_user_id: 1,
                    listing_rating_id: 1,
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
                listing_rating_id: 1,
                review_content: "test",
            },
            params: {
                listingId: 1,
            },
        };

        await createReview(mockReq, mockPostRes);
        expect(postResponse).toEqual(mockOutput);
    });
});

