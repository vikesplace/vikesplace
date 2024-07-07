import axios from "axios";
import { createReview } from "../controller/create_review";

jest.mock("axios");

describe("Create Review Tests", () => {
    it("should create a review", async () => {
        axios.post.mockImplementation(() =>
            Promise.resolve({ data: 1, status: 200 })
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

        axios.get.mockImplementation(() =>
            Promise.resolve({ data: { type: "Point", coordinates: [1, -1] } })
        );

        const mockReq = {
            body: {
                review_content: "test",
                listing_rating_id: 1,
            },
            params: { listingId: 1 },
        };

        await createReview(mockReq, mockPostRes);
        expect(postResponse).toEqual(1);
    });

    it("it should fail to create due to missing userId", async () => {
        axios.post.mockImplementation(() =>
            Promise.resolve({ data: { message: "Could not create review"}})
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

        axios.get.mockImplementation(() =>
            Promise.resolve({ message: { type: "Point", coordinates: [1, -1] } })
        );

        const mockReq = {
            body: {
                review_content: "test",
                listing_rating_id: 1,
            },
            params: { listingId: 1 },
        };

        await createReview(mockReq, mockPostRes);
        expect(postResponse).toEqual({ message: "Could not create review" });
    });
});

