import axios from "axios";
import { getAllReviews } from "../controller/get_all_reviews";

jest.mock("axios");

describe("Get all Reviews", () => {
    it("it should return all reviews", async () => {
        const mockOutput = [
            {
                review_content: "Hello World",
            },
            {
                review_content: "Hello World Again",
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
        await getAllReviews(
            {
                params: {
                    listingId: "1",
                },
            },
            mockRes
        );
        expect(responseObject).toEqual({"reviews": mockOutput});    
    });

    it("should return 500 if failed to get reviews", async () => {
        axios.get.mockImplementation(() =>
            Promise.reject(new Error())
        );
        let responseObject = {};
        const mockGetRes = {
            body: {},
            json: jest.fn().mockImplementation((result) => {
                responseObject = result;
            }),
            status: jest.fn().mockReturnThis(),
        };

        await getAllReviews(
            {
                params: {
                    listingId: "1",
                },
            }, 
        mockGetRes);
        expect(responseObject).toEqual({ message: "Failed to get reviews" });
        expect(mockGetRes.status).toHaveBeenCalledWith(500);
    });
});