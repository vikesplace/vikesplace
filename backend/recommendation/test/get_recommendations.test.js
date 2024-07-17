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
            return Promise.resolve({data: getFromAlgoResult})
            });
        let statueValue = {};
        const req = {
            params: {
                user_id: 1,
                latitude: 1,
                longitude: 2,
            },
        }
        axios.get.mockImplementation((url) => {
            return Promise.resolve({data: getFromDataLayerResult})
            });
        const mockRes = {
            body: {},
            json: jest.fn(),
            status: jest.fn().mockImplementation((status) => {
                statueValue = status;
                return mockRes;
            }),
            locals: {
                decodedToken: {
                    userId: 1,
                },
            },
        };
        
        await getRecommendations(req, mockRes);
        expect(mockRes.json).toHaveBeenCalledWith(getFromAlgoResult.data);
    });

       
});