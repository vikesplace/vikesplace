CREATE TABLE IF NOT EXISTS Activities (
    activity_id SERIAL PRIMARY KEY,
    user_id INT NOT NULL REFERENCES Users(user_id) ON DELETE CASCADE,
    listing_id INT REFERENCES Listings(listing_id) ON DELETE CASCADE,
    recommendation_id INT REFERENCES Recommendations(recommendation_id) ON DELETE CASCADE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);