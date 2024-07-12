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
        expect(responseObject).toEqual(mockOutput);
    });

    it("it should fail to return all reviews", async () => {
        axios.get.mockImplementation(() =>
            Promise.resolve({ data: { message: "Listing id not found" } })
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
        expect(responseObject).toEqual({ message: "Listing id not found" });
    });
});