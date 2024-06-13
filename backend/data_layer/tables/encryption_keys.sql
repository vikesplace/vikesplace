CREATE TABLE IF NOT EXISTS EncryptionKeys (
    encryption_key_id SERIAL PRIMARY KEY,
    table_name VARCHAR(255) NOT NULL
);