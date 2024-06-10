CREATE TABLE IF NOT EXISTS Reviews (
    listing_review_id SERIAL PRIMARY KEY,
    reviewed_listing_id INT NOT NULL REFERENCES Listings(listing_id) ON DELETE CASCADE,
    review_user_id INT NOT NULL REFERENCES Users(user_id) ON DELETE CASCADE,
    review_content TEXT NOT NULL,
    listing_rating_id INT NOT NULL REFERENCES Ratings(listing_rating_id) ON DELETE CASCADE,
    timestamp TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);