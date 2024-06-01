CREATE TABLE IF NOT EXISTS listing_reviews (
    listing_review_id SERIAL PRIMARY KEY,
    reviewed_listing_id INTEGER NOT NULL REFERENCES listings(listing_id) ON DELETE CASCADE,
    review_user_id INTEGER NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    review_content TEXT NOT NULL,
    timestamp TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
