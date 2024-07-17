import axios from "axios";
import { getUserData } from "../controller/get_user_data";

jest.mock("axios");

describe("Get User Data Tests", () => {
    it("should get user data", async () => {
        axios.get.mockImplementation(() =>
            Promise.resolve({
                data: {
                    username: "test",
                    email: "test@uvic.ca",
                    password: "Testpassword123@",
                    lat_long: { type: "Point", coordinates: [1, -1] },
                    location: "V8P5C2",
                    joining_date: "2021-09-01",
                    items_sold: 0,
                    items_purchased: 0,
                }
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

        await getUserData(
            {
                params: {
                    userId: "1",
                },
            },
            mockRes
        );

        expect(responseObject).toEqual({
            username: "test",
            email: "test@uvic.ca",
            password: "Testpassword123@",
            lat_long: { type: "Point", coordinates: [1, -1] },
            location: "V8P5C2",
            joining_date: "2021-09-01",
            items_sold: 0,
            items_purchased: 0,
        });
    });

    it("should fail to get user data", async () => {
        axios.get.mockImplementation(() =>
            Promise.resolve({ data: { message: "Unable to get user with id: 1" } })
        );

        let responseObject = {};
        const mockRes = {
            body: {},
            json: jest.fn().mockImplementation((result) => {
                responseObject = result;
            }),
            status: jest.fn(),
        };

        await getUserData(
            {
                params: {
                    userId: "1",
                },
            },
            mockRes
        );

        expect(responseObject).toEqual({ message: "Unable to get user with id: 1" });
    });
});