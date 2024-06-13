CREATE TABLE IF NOT EXISTS EncryptionMessages (
    encryption_key_id SERIAL PRIMARY KEY,
    chat_id INT NOT NULL REFERENCES Messages(chat_id) ON DELETE CASCADE
);