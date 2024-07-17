import axios from "axios";
import { updateUserData } from "../controller/update_user_data";

jest.mock("axios");

describe("Update User Data Tests", () => {
    it("should update user data", async () => {
        axios.get.mockImplementation(() => Promise.resolve({ data: { latitude: 1, longitude: -1 } }));
        axios.patch.mockImplementation(() => Promise.resolve({ data: { location: "V8P5C2" } }));
        let responseObject = {};
        const mockRes = {
            body: {},
            json: jest.fn().mockImplementation((result) => {
                responseObject = result;
            }),
            status: jest.fn(),
        };
        await updateUserData(
            {
                body: {
                    location: "V8P5C2",
                },
                params: {
                    user_id: "1",
                },
            },
            mockRes
        );
        expect(responseObject).toEqual({ location: "V8P5C2" });
    });

    it("it should fail to update", async () => {
        axios.patch.mockImplementation(() => Promise.resolve({ data: { message: "Unable to update user with id: 1" } }));
        let responseObject = {};
        const mockRes = {
            body: {},
            json: jest.fn().mockImplementation((result) => {
                responseObject = result;
            }),
            status: jest.fn(),
        };
        await updateUserData(
            {
                body: {
                    location: "V8P5C2",
                },
                params: {
                    user_id: "1",
                },
            },
            mockRes
        );
        expect(responseObject).toEqual({ message: "Unable to update user with id: 1" });
    });
});