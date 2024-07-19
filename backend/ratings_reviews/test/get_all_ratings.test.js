import axios from "axios";
import { getAllRatings } from "../controller/get_all_ratings.js";

jest.mock("axios");

describe("Get All Ratings Tests", () => {
    it("should get all ratings for a listing", async () => {
        const mockOutput = [{rating_value: 4}];
        
        axios.get.mockImplementation(() =>
            Promise.resolve({data: mockOutput})
        );
        let responseObject = {};
        const mockGetRes = {
            body: {},
            json: jest.fn().mockImplementation((result) => {
                responseObject = result;
            }),
            status: jest.fn().mockReturnThis(),
        };
    
        await getAllRatings(
            {
                params: {
                    listingId: "1",
                },
            }, 
        mockGetRes);
        expect(responseObject).toEqual({"ratings": [{"rating_value": 4}]});
    });

    it("should return 500 if failed to get ratings", async () => {
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

        await getAllRatings(
            {
                params: {
                    listingId: "1",
                },
            }, 
        mockGetRes);
        expect(responseObject).toEqual({ message: "Failed to get ratings" });
        expect(mockGetRes.status).toHaveBeenCalledWith(500);
    });
});