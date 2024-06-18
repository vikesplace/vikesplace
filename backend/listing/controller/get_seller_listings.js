import axios from "axios";

export const getSellerListings = async (req, res) => {
  try {
    //Get seller_id from JWT token
    const response = await axios.post("/listing/me", {
      seller_id: 1,
    });
    if (response.status == 200) {
      const listingIds = response.data.map((listing) => listing.listing_id);
      res.json(listingIds);
    } else {
      res.json(response.data);
    }
  } catch (err) {
    console.log(err);
  }
};
