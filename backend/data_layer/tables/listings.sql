CREATE TABLE IF NOT EXISTS Listings (
    listing_id SERIAL PRIMARY KEY,
    seller_id INT NOT NULL REFERENCES Users(user_id) ON DELETE CASCADE,
    buyerUsername VARCHAR(255),
    title VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    location VARCHAR(255) NOT NULL, --not sure whether this should be a foreign key
    status VARCHAR(255) NOT NULL CHECK (status IN ('AVAILABLE', 'SOLD', 'REMOVED')),
    listed_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    last_updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    category VARCHAR(255),
    pullLimit INT,
    pageOffset INT
);