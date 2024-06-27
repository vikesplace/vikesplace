import axios from "axios";
import { getPostalCode } from "../helper/get_postal_code";

jest.mock("axios");

describe("Get Postal Codes Test", () => {
  it("should get postal code", async () => {
    const mockOutput = {
      postal_code: "123",
    };

    axios.get.mockResolvedValue({ data: mockOutput });

    const latitude = 45.5;
    const longitude = -45.5;
    const result = await getPostalCode(latitude, longitude);

    expect(result).toEqual(mockOutput);
  });

  it("it should fail to get postal code", async () => {
    axios.get.mockResolvedValue({
      data: { message: "Latitude and longitude not found" },
    });

    const latitude = 45.5;
    const longitude = -45.5;
    const result = await getPostalCode(latitude, longitude);

    expect(result).toEqual({ message: "Latitude and longitude not found" });
  });
});
