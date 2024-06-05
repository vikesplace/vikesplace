CREATE TABLE IF NOT EXISTS Ratings (
    listing_rating_id SERIAL PRIMARY KEY,
    rated_listing_id INT NOT NULL REFERENCES Listings(listing_id) ON DELETE CASCADE,
    rating_user_id INT NOT NULL REFERENCES Users(user_id) ON DELETE CASCADE,
    rating_value INT NOT NULL CHECK (rating_value >= 1 AND rating_value <= 5),
    timestamp TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);