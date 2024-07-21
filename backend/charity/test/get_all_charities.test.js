import axios from "axios";
import { getAllCharities } from "../controller/get_all_charities";

jest.mock("axios");

describe("Get all Charities", () => {
    it("it should return all charities", async () => {
        const mockOutput = [
            {
                name: "Doctors Without Borders",
                status: "OPEN",
                fund: "4000.00",
                logoUrl: "12345",
                endDate: "2024-02-01T13:00:00.000Z",
                numListings: 0,
            },
            {
                name: "Salvation Army",
                status: "CLOSED",
                fund: "5000.00",
                logoUrl: "12345",
                endDate: "2024-02-01T14:00:00.000Z",
                numListings: 0
            }
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
        await getAllCharities(
            {
                params: {
                    
                },
            },
            mockRes
        );
        expect(responseObject).toEqual(mockOutput);
    });

    it("it should fail to return all charities", async () => {
        axios.get.mockImplementation(() =>
            Promise.resolve({ data: { message: "No charity found" } })
        );
        let responseObject = {};
        const mockRes = {
            body: {},
            json: jest.fn().mockImplementation((result) => {
                responseObject = result;
            }),
            status: jest.fn(),
        };
        await getAllCharities(
            {
                params: {},
            },
            mockRes
        );
        expect(responseObject).toEqual({ message: "No charity found" });
    });
});