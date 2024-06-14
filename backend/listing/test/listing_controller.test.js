import axios from 'axios';
import { createListing } from '../controller/create_listing';
jest.mock('axios');

const mockReq = {
    
}

describe("Listing Routes", () => {
    it("should create a listing", async () => {
        axios.post.mockResolvedValue({
            data: [{message: "Create Listing"}],
          });
        const result = await createListing({},{});
        console.log(result);
        expect(result.message).toEqual({ message: "Create Listing" });
    });
})

