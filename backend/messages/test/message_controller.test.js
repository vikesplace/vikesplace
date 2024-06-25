import axios from 'axios';
import { getAllMessages } from "../controller/get_all_messages";
import { getChatIds } from "../controller/get_chat_ids";
import { createChat } from "../controller/create_chat";
import { getMessages } from "../message_controller";

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
    
        it("it should return all chat ids", async () => {
            const mockOutput = [
                {
                    chat_id: 1,
                    listing_id: 1,
                    user_id_one: 1,
                    user_id_two: 2,
                    timestamp: "2024-06-17T06:25:41.995Z",
                    last_message_time: "2024-06-17T06:25:41.995Z"
                },
                {
                    chat_id: 2,
                    listing_id: 2,
                    user_id_one: 3,
                    user_id_two: 4,
                    timestamp: "2024-06-17T06:25:41.995Z",
                    last_message_time: "2024-06-17T06:25:41.995Z"
                }
            ];
    
            const mockDecodedToken = {userId: 1};
    
            axios.get.mockResolvedValue({data: mockOutput, status: 200});
    
            let responseObject = {};
    
            const mockRes = {
                locals: {decodedToken: mockDecodedToken},
                json: jest.fn().mockImplementation((result) => {
                    responseObject = result;
                }),
                status: jest.fn()
            };
    
            await getChatIds({}, mockRes);
    
            expect(responseObject).toEqual(mockOutput);
        });
    
        it("it should fail to return all chat ids", async () => {
            axios.get.mockImplementation(() =>
                Promise.resolve({ data: { message: "User id not found" }})
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
                        userId: "1",
                    },
                }, mockRes);
            expect(responseObject).toEqual({ message: "User id not found"});
        });

    it("should send a message", async () => {
        axios.post.mockImplementation(() => Promise.resolve({ data: {} }));
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
        await getMessages({
            body: {
                content: "Hello",
            },
            params: { chatId: "123" },
        }, mockRes);
        expect(responseObject).toEqual({});
        });
        await createChat(
            {
                params: {
                    listingId: "1",
                },
            }, mockRes);
        expect(responseObject).toEqual({ message: "Could not create chat"});
    }); 

    it("should fail to send a message", async () => {
        axios.post.mockImplementation(() => Promise.resolve({ data: {message: "Could not send message"}}));
        let responseObject = {};
        const mockRes = {
            body: {},
            json: jest.fn().mockImplementation((result) => {
                responseObject = result;
            }),
            status: jest.fn(),
        };

        await getMessages({
            body: {
                content: "Hello",
            },
            params: { chatId: "123" },
        }, mockRes);
        expect(responseObject).toEqual({ message: "Could not send message" });
        
    });
});