import axios from "axios";
import { createListing } from "../controller/create_listing";

jest.mock("axios");

describe("Create Listing Tests", () => {
  it("should create a listing", async () => {
    axios.post.mockImplementation(() =>
      Promise.resolve({ data: 1, status: 200 })
    );
    let postResponse = {};
    const mockPostRes = {
      body: {},
      json: jest.fn().mockImplementation((result) => {
        postResponse = result;
      }),
      status: jest.fn(),
      locals: { decodedToken: { userId: 1 } },
    };

    axios.get.mockImplementation(() =>
      Promise.resolve({ data: { type: "Point", coordinates: [1, -1] } })
    );

    const mockReq = {
      body: {
        title: "test",
        price: 0,
        location: "V9A1Y2",
        category: "ELECTRONICS",
      },
    };

    await createListing(mockReq, mockPostRes);
    expect(postResponse).toEqual(1);
  });

  it("it should fail to create due to missing userId", async () => {
    axios.post.mockImplementation(() =>
      Promise.resolve({ data: 1, status: 200 })
    );
    let postResponse = {};
    const mockPostRes = {
      body: {},
      json: jest.fn().mockImplementation((result) => {
        postResponse = result;
      }),
      status: jest.fn(),
    };

    axios.get.mockImplementation(() =>
      Promise.resolve({ message: { type: "Point", coordinates: [1, -1] } })
    );

    const mockReq = {
      body: {
        title: "test",
        price: 0,
        location: "V9A1Y2",
        category: "ELECTRONICS",
      },
    };

    const spyConsoleLog = jest.spyOn(console, "log");
    await createListing(mockReq, mockPostRes);

    expect(spyConsoleLog).toHaveBeenCalled();
  });

  it("it should fail due to missing location", async () => {
        let postResponse = {};
        const mockPostRes = {
          body: {},
          json: jest.fn().mockImplementation((result) => {
            postResponse = result;
          }),
          status: jest.fn(),
          locals: { decodedToken: { userId: 1 } },
        };
    
        axios.get.mockImplementation(() =>
          Promise.resolve({ message: { type: "Point", coordinates: [1, -1] } })
        );
    
        const mockReq = {
          body: {
            title: "test",
            price: 0,
            category: "ELECTRONICS",
          },
        };
    
        const spyConsoleLog = jest.spyOn(console, "log");
        await createListing(mockReq, mockPostRes);
    
        expect(spyConsoleLog).toHaveBeenCalled();
      });
});
