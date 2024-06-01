CREATE TABLE IF NOT EXISTS Encryption_Keys (
    encryption_key_id SERIAL PRIMARY KEY,
    table_name VARCHAR(255) NOT NULL
);