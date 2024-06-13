CREATE TABLE IF NOT EXISTS PostalCodes (
    adress_id SERIAL PRIMARY KEY,
    postal_code VARCHAR(5) NOT NULL,
    longitude DECIMAL(9,7) NOT NULL,
    latitude DECIMAL(9,7) NOT NULL
);