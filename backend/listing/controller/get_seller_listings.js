import axios from "axios";

export const getSellerListings = async (req, res) => {
  try {
    const seller_id = res.locals.decodedToken.userId;
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
