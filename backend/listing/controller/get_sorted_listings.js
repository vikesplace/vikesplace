import axios from "axios";

export const getSortedListings = async (req, res) => {
  try {
    console.log(req.query.minPrice);
    const response = await axios.get(`/listing`, {
      params: {
        pullLimit: req.query.pullLimit,
        pageOffset: req.query.pageOffset, //potentially change to page number calc
        minPrice: req.query.minPrice,
        maxPrice: req.query.maxPrice,
        status: req.query.status,
        sortBy: req.query.sortBy,
        isDescending: req.query.isDescending
      },
    });
    res.json(response.data);
  } catch (err) {
    console.log(err);
  }
};
