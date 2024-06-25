import geolib from 'geolib';

const user_location = { latitude: 51.525, longitude: 7.4575 };

const calculateDistance = (listing_id, user_location, listing_location) => {
    const distance = geolib.getDistance(user_location, listing_location);
    if (distance <= 5000) {
        return listing_id;
    }
    return null;
    };

const listings = [
    {
        listing_id: 1,
        listing_location: { latitude: 51.525, longitude: 8.4575 }
    },
    {
        listing_id: 2,
        listing_location: { latitude: 51.525, longitude: 8.4575 }
    },
    {
        listing_id: 3,
        listing_location: { latitude: 52.525, longitude: 7.4575 }
    },
    {
        listing_id: 4,
        listing_location: { latitude: 51.525, longitude: 7.4575 }
    }
];

const result = listings.map(listing => calculateDistance(listing.listing_id, user_location, listing.listing_location)).filter(listing => listing !== null);
