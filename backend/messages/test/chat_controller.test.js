import axios from 'axios';
import { getChatData } from "../controller/get_chat_data";

jest.mock('axios');

describe("Chats Routes", () => {
    it("it should get chat data", async () => {
        const mockOutput = [
            {
                listing_id: 1,
                user_id_one: 1,
                user_id_two: 2,
                timestamp: "2024-06-17T06:25:41.995Z",
                last_message_time: "2024-06-17T06:25:41.995Z"
            },
            {
                listing_id: 2,
                user_id_one: 1,
                user_id_two: 2,
                timestamp: "2024-06-17T06:25:41.995Z",
                last_message_time: "2024-06-17T06:25:41.995Z"
            }
        ];

        axios.get.mockImplementation(() =>
            Promise.resolve({
                data: mockOutput
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
        await getChatData(
            {
                params: {
                    chatId: "1",
                },
            }, mockRes);
        expect(responseObject).toEqual(mockOutput);
    });

    it("it should fail to get chat data", async () => {
        axios.get.mockImplementation(() =>
            Promise.resolve({ data: { message: "Chat id not found" }})
        );
        let responseObject = {};
        const mockRes = {
            body: {},
            json: jest.fn().mockImplementation((result) => {
                responseObject = result;
            }),
            status: jest.fn(),
        };
        await getChatData(
            {
                params: {
                    chatId: "1",
                },
            }, mockRes);
        expect(responseObject).toEqual({ message: "Chat id not found"});
    });
});