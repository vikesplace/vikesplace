CREATE TABLE IF NOT EXISTS Encryption_Messages (
    encryption_key_id SERIAL PRIMARY KEY,
    chat_id INT NOT NULL REFERENCES Messages(chat_id) ON DELETE CASCADE
);