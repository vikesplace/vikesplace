import axios from "axios";
const ALG_SEARCH = process.env.ALG_SEARCH;
const DATA_LAYER = process.env.DATA_LAYER;

export const getSearchResults = async (req, res) => {
  try {
    if (req.query.search == null) {
      res.status(500).json({ message: "internal server error" });
    }

    const userId = res.locals.decodedToken.userId;
    const url = `${DATA_LAYER}user/${userId}`;
    const user = await axios.get(url);

    const search = req.query.search;
    const longitude = user.data.user.location.coordinates[0];
    const latitude = user.data.user.location.coordinates[1];

    const requestParamsObject = {};
    requestParamsObject.query = search;
    requestParamsObject.longitude = longitude;
    requestParamsObject.latitude = latitude;

    const response = await axios.get(`${ALG_SEARCH}search`, {
      params: requestParamsObject,
    });
    if (response.status == 200) {
      res.json(response.data);
    } else {
      res.status(500).json({ message: "internal server error" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "internal server error" });
  }
};
