CREATE TABLE IF NOT EXISTS Users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL CHECK (username ~ '^[a-zA-Z0-9_@]{6,20}$'),
    email VARCHAR(255) NOT NULL CHECK (email ~ '^[a-zA-Z0-9._%+-]+@uvic.ca$'),
    password VARCHAR(255) NOT NULL CHECK (LENGTH (password) >= 8 AND password ~ '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$'),
    location VARCHAR(255) NOT NULL,
    joining_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    items_sold INT NOT NULL DEFAULT 0,
    items_bought INT NOT NULL DEFAULT 0
);

ALTER TABLE Users ADD CONSTRAINT unique_username UNIQUE (username);
ALTER TABLE Users ADD CONSTRAINT unique_email UNIQUE (email);
ALTER TABLE Users ADD CONSTRAINT unique_user_id UNIQUE (user_id);