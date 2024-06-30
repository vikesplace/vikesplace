import axios from "axios";
import { getLongLat } from "../helper/get_long_lat";

jest.mock("axios");

describe("Get Long and Lat Tests", () => {
  it("should get long lat", async () => {
    const mockOutput = {
      longitude: 45.5,
      latitude: -45.5,
    };

    axios.get.mockResolvedValue({ data: mockOutput });

    const postal_code = "12345";
    const result = await getLongLat(postal_code);

    expect(result).toEqual(mockOutput);
  });

  it("it should fail to get long lat", async () => {
    axios.get.mockResolvedValue({ data: { message: "Postal code not found" } });

    const postal_code = "12345";
    const result = await getLongLat(postal_code);

    expect(result).toEqual({ message: "Postal code not found" });
  });
});
