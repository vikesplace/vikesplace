import axios from "axios";

export const getSearchResults = async (req, res) => {
  try {
    //Get seller_id from JWT token
    //http://localhost:8000/search?query=<query goes here>&location=<lat value>&location=<lon value>
    //Get Long and Lat depending on user_id
    if (req.query.search == null) {
      res.status(500).json({ message: "internal server error" });
    }

    //Get Long and Lat from DB. Requires User Data endpoint.
    const requestParamsObject = req.query;
    const longitude = 48;
    const latitude = -123;

    requestParamsObject.longitude = longitude;
    requestParamsObject.latitude = latitude;

    const response = await axios.get(`/search`, {
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
