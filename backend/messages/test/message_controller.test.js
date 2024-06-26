import axios from 'axios';
import { getAllMessages } from "../controller/get_all_messages";
import { createChat } from "../controller/create_chat";

jest.mock('axios');

describe("Message Routes", () => {
    it("it should return all messages", async () => {
        const mockOutput = [
            {
                message_id: 1,
                message_content: "Hello World",
                listing_id: 1,
                timestamp: "2024-06-17T06:25:41.995Z"
            },
            {
                message_id: 2,
                message_content: "Hello World Again",
                listing_id: 1,
                timestamp: "2024-06-18T06:25:41.995Z"
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
        await getAllMessages(
            {
                params: {
                    chatId: "1",
                },
            }, mockRes);
        expect(responseObject).toEqual(mockOutput);
    });

    it("it should fail to return all messages", async () => {
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
        await getAllMessages(
            {
                params: {
                    chatId: "1",
                },
            }, mockRes);
        expect(responseObject).toEqual({ message: "Chat id not found"});
    });

    it("should create a chat", async () => {
        const mockOutput = {
            chat_id: 1,
            listing_id: 1,
            user_id_one: 1,
            user_id_two: 2
        };
        axios.post.mockImplementation(() =>
            Promise.resolve({
                data: mockOutput
            })
        );

        let responseObject = {};
        const mockRes = {
            body: {
                userId: 1
            },
            json: jest.fn().mockImplementation((result) => {
                responseObject = result;
            }),
            status: jest.fn(),
        };
        await createChat(
            {
                params: {
                    listingId: "1",
                },
            }, mockRes);
        expect(responseObject).toEqual(mockOutput);
    });

    it("should fail to create a chat", async () => {
        axios.post.mockImplementation(() =>
            Promise.resolve({ data: { message: "Could not create chat" }})
        );
        let responseObject = {};
        const mockRes = {
            body: {},
            json: jest.fn().mockImplementation((result) => {
                responseObject = result;
            }),
            status: jest.fn(),
        };
        await createChat(
            {
                params: {
                    listingId: "1",
                },
            }, mockRes);
        expect(responseObject).toEqual({ message: "Could not create chat"});
    }); 
});