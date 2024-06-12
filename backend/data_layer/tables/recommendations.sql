CREATE TABLE IF NOT EXISTS Recommendations (
    recommendation_id SERIAL PRIMARY KEY,
    recommending_user_id INT NOT NULL REFERENCES Users(user_id) ON DELETE CASCADE,
    recommended_listing_id INT NOT NULL REFERENCES Listings(listing_id) ON DELETE CASCADE,
    ignored BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);