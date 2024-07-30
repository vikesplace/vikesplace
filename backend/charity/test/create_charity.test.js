import axios from "axios";
import { createCharity } from "../controller/create_charity";

jest.mock("axios");

describe("Create Charity Tests", () => {
    it("should create a charity", async () => {
        axios.post.mockImplementation(() =>
            Promise.resolve(
                {
                    data: {},
                    status: 200,
                })
        );
        let responseObject = {};
        const mockRes = {
            json: jest.fn().mockImplementation((result) => {
                responseObject = result;
            }),
            status: jest.fn().mockReturnThis(),
        };

        await createCharity(
            {
                body: {
                    charity_id: 4,
                    name: "Doctors Without Borders",
                    logoUrl: "12345",
                    endDate: "2024-02-01T13:00:00.000Z",
                },
            },
            mockRes
        );
        expect(responseObject).toEqual({});
    });


    it("should fail to create charity", async () => {

        axios.post.mockImplementation(() =>
            Promise.resolve(
                {
                    data: {
                        message: "Failed to create charity"
                    },
                    status: 200
                })
        );
        let responseObject = {};
        const mockRes = {
            body: {},
            json: jest.fn().mockImplementation((result) => {
                responseObject = result;
            }),
            status: jest.fn(() => mockRes),
        };
        await createCharity(
            {
                body: {
                    name: "Doctors Without Borders",
                    logoUrl: "12345",
                    endDate: "2024-02-01T13:00:00.000Z",
                },
                params: {}
            },
            mockRes
        );
        expect(responseObject).toEqual({message: "Failed to create charity"});
    });
});

