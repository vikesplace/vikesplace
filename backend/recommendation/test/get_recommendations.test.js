import axios from "axios";
import { getRecommendations } from "../controller/get_recommendations.js";

jest.mock("axios");

describe("Get Recommendations", () => {
    it("should return recommendations", async () => {
        const getFromAlgoResult = {
            data: {
                recommendations: [
                    {
                        listing_id: 1,
                        name: "Listing 1",
                        description: "Description 1",
                    },
                    {
                        listing_id: 2,
                        name: "Listing 2",
                        description: "Description 2",
                    },
                ],
            },
          };
        const getFromDataLayerResult = {
            data: {
                lat_long: {
                    coordinates: [1, 2],
                },
            }};

        axios.get.mockImplementation((url) => {
            
            if (url.includes("getUserLatLong")) {
                return Promise.resolve(getFromDataLayerResult);
            } else {
                return Promise.resolve(getFromAlgoResult);
            }
        });

        let responseObject = {};
        const mockRes = {
            body: {},
            json: jest.fn().mockImplementation((result) => {
                responseObject = result;
            }),
            status: jest.fn().mockReturnThis(),
            locals: {
                decodedToken: {
                    userId: "1",
                },
            },
        };

        await getRecommendations({}, mockRes);
        expect(responseObject).toEqual(getFromAlgoResult.data);
    });

    it("should fail to return recommendations", async () => {
        const getFromAlgoResult = {
            data: {
                message: "Failed to get recommendations",
            },
          };
        const getFromDataLayerResult = {
            data: {
                message: "Failed to get latitude and longitude",
            }};

        axios.get.mockImplementation((url) => {
            
            if (url.includes("getUserLatLong")) {
                return Promise.resolve(getFromDataLayerResult);
            } else {
                return Promise.resolve(getFromAlgoResult);
            }
        });

        let responseObject = {};
        const mockRes = {
            body: {},
            json: jest.fn().mockImplementation((result) => {
                responseObject = result;
            }),
            status: jest.fn().mockReturnThis(),
            locals: {
                decodedToken: {
                    userId: "1",
                },
            },
        };

        await getRecommendations({}, mockRes);
        expect(responseObject).toEqual({ message: "Failed to get recommendations" });
    });

       
});