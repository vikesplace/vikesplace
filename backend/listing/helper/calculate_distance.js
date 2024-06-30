import geolib from "geolib";

export const calculateDistance = (user_location, listing_location) => {
  const distance = geolib.getDistance(user_location, listing_location);
  if (distance <= 5000) {
    return true;
  } else {
    return false;
  }
};