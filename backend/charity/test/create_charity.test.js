import axios from "axios";
import { createCharity } from "../controller/create_charity";

jest.mock("axios");

describe("Create Charity Tests", () => {
    it("should create a charity", async () => {
        const mockOutput = {
            charity_id: 4,
            name: "Doctors Without Borders",
            status: "OPEN",
            fund: "4000.00",
            logo_url: "12345",
            start_date: "2024-02-01T13:00:00.000Z",
            end_date: "2024-02-01T13:00:00.000Z",
            num_listings: 0,
        };
        axios.post.mockImplementation(() =>
            Promise.resolve(
                {
                    data: {
                        charity_id: 4,
                        name: "Doctors Without Borders",
                        status: "OPEN",
                        fund: "4000.00",
                        logo_url: "12345",
                        start_date: "2024-02-01T13:00:00.000Z",
                        end_date: "2024-02-01T13:00:00.000Z",
                        num_listings: 0,
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
        };

        await createCharity(
            {
                body: {
                    charity_id: 4,
                    name: "Doctors Without Borders",
                    status: "OPEN",
                    fund: "4000.00",
                    logo_url: "12345",
                    start_date: "2024-02-01T13:00:00.000Z",
                    end_date: "2024-02-01T13:00:00.000Z",
                    num_listings: 0,
                },
            },
            mockRes
        );
        expect(responseObject).toEqual(mockOutput);
    });


    it("should fail to create charity", async () => {
        const mockOutput = {
            message: "Failed to create charity",
        };
        axios.post.mockImplementation(() =>
            Promise.resolve(
                {
                    data: mockOutput
                })
        );
        let responseObject = {};
        const mockRes = {
            json: jest.fn().mockImplementation((result) => {
                responseObject = result;
            }),
            status: jest.fn(),
        };

        await createCharity(
            {
                body: {
                    charity_id: 4,
                    name: "Doctors Without Borders",
                    status: "OPEN",
                    fund: "4000.00",
                    logo_url: "12345",
                    start_date: "2024-02-01T13:00:00.000Z",
                    end_date: "2024-02-01T13:00:00.000Z",
                    num_listings: 0,
                },
            },
            mockRes
        );
        expect(responseObject).toEqual(mockOutput);
    });
});

