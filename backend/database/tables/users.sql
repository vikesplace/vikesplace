CREATE TABLE IF NOT EXISTS Users (
    user_id SERIAL PRIMARY KEY UNIQUE,
    username VARCHAR(255) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    location VARCHAR(255) NOT NULL,
    joining_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    items_sold INT NOT NULL DEFAULT 0,
    items_bought INT NOT NULL DEFAULT 0
);