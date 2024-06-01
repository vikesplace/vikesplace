CREATE TABLE IF NOT EXISTS listing_ratings (
    listing_rating_id SERIAL PRIMARY KEY,
    rated_listing_id INTEGER NOT NULL REFERENCES listings(listing_id) ON DELETE CASCADE,
    rating_user_id INTEGER NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    rating_value INTEGER NOT NULL CHECK (rating_value >= 1 AND rating_value <= 5),
    timestamp TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);