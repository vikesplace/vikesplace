import axios from "axios";

export const getUserMe = async (req, res) => {
  try {
    const userId = res.locals.decodedToken.userId;
    const userData = await axios.get(`user/me/${userId}`);
    res.json(userData.data);
  } catch (error) {
    if (error.response && error.response.status == 400) {
      // if bad request, return error to client
      return res
        .status(error.response.status)
        .json({ message: error.response.data.message });
    } else {
      // if internal server error, log error and return message to client
      console.error("Error getting user:", error);
      return res.status(500).json({ message: "Error getting user" });
    }
  }
};
