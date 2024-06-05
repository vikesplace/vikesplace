CREATE TABLE IF NOT EXISTS Listings (
    listing_id SERIAL PRIMARY KEY,
    seller_id INT NOT NULL REFERENCES Users(user_id) ON DELETE CASCADE,
    buyer_username VARCHAR(255) REFERENCES Users(username) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL CHECK (price >= 0),
    location VARCHAR(255) NOT NULL, --not sure whether this should be a foreign key
    status VARCHAR(255) NOT NULL CHECK (status IN ('AVAILABLE', 'SOLD', 'REMOVED')),
    listed_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    last_updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    category VARCHAR(255),
    pull_limit INT,
    page_offset INT
);