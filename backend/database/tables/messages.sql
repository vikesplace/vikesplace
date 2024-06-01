CREATE TABLE IF NOT EXISTS Messages (
    message_id SERIAL PRIMARY KEY,
    sender_id INT NOT NULL REFERENCES Users(user_id) ON DELETE CASCADE,
    receiver_id INT NOT NULL REFERENCES Users(user_id) ON DELETE CASCADE,
    listing_id INT NOT NULL REFERENCES Listings(listing_id) ON DELETE CASCADE,
    message_content TEXT NOT NULL,
    timestamp TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    chat_id INT NOT NULL
);

ALTER TABLE Messages ALTER COLUMN timestamp TYPE TIMESTAMP;