import axios from "axios";

export const getSortedListings = async (req, res) => {
  try {
    const response = await axios.get(`/listing/me`, {
      //add query params
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
