import axios from "axios";

export const getSellerListings = async (req, res) => {
  try {
    //Get seller_id from JWT token
    const seller_id = 1;
    const response = await axios.get(`/listing/me`, {
      params: { seller_id: seller_id },
    });
    if (response.status == 200) {
      res.json(response.data);
    } else {
      res.json(response.data);
    }
  } catch (err) {
    console.log(err);
  }
};
