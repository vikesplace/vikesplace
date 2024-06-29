import geolib from "geolib";

export const calculateDistance = (user_location, listing_location) => {
  const distance = geolib.getDistance(user_location, listing_location);
  if (distance <= 5000) {
    return true;
  } else {
    return false;
  }
};

// const result = listings.map(listing => calculateDistance(listing.listing_id, user_location, listing.listing_location)).filter(listing => listing !== null);
