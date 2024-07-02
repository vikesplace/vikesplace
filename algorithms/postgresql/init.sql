CREATE EXTENSION postgis;

CREATE TABLE IF NOT EXISTS "Users" (
    user_id SERIAL PRIMARY KEY UNIQUE,
    username VARCHAR(255) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    location GEOMETRY(POINT) NOT NULL,
    postal_code VARCHAR(255) NOT NULL,
    joining_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    items_sold INT NOT NULL DEFAULT 0,
    items_bought INT NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS "Listings" (
    listing_id SERIAL PRIMARY KEY,
    seller_id INT NOT NULL REFERENCES "Users"(user_id) ON DELETE CASCADE,
    buyer_username VARCHAR(255) REFERENCES "Users"(username) ON DELETE CASCADE,
    title TEXT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    location GEOMETRY(POINT) NOT NULL,
    postal_code VARCHAR(255) NOT NULL,
    status VARCHAR(255) NOT NULL CHECK (status IN ('AVAILABLE', 'SOLD', 'REMOVED')),
    listed_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    last_updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    category VARCHAR(255) NOT NULL,
    pull_limit INT,
    page_offset INT
);

-- Insert 20 users with unique usernames and emails
INSERT INTO "Users" (username, email, password, location, postal_code, joining_date, items_sold, items_bought) VALUES
('Alice', 'alice@example.com', 'password1', 'POINT(48.378400 -123.415600)'::GEOMETRY, 'V8R6N2', '2024-01-01 10:00:00', 0, 0),
('Bob', 'bob@example.com', 'password2', 'POINT(48.378400 -123.337822)'::GEOMETRY, 'V9A4L2', '2024-01-02 10:00:00', 0, 0),
('Charlie', 'charlie@example.com', 'password3', 'POINT(48.389511 -123.393378)'::GEOMETRY, 'V8W1R7','2024-01-03 10:00:00', 0, 0),
('Diana', 'diana@example.com', 'password4', 'POINT(48.389511 -123.337822)'::GEOMETRY, 'V9A4L2', '2024-01-04 10:00:00', 0, 0),
('Eve', 'eve@example.com', 'password5', 'POINT(48.400622 -123.404489)'::GEOMETRY, 'V8W1R7', '2024-01-05 10:00:00', 0, 0),
('Frank', 'frank@example.com', 'password6', 'POINT(48.400622 -123.348933)'::GEOMETRY, 'V8N5M3', '2024-01-06 10:00:00', 0, 0),
('Grace', 'grace@example.com', 'password7', 'POINT(48.411733 -123.415600)'::GEOMETRY, 'V8N5M3', '2024-01-07 10:00:00', 0, 0),
('Hank', 'hank@example.com', 'password8', 'POINT(48.411733 -123.326711)'::GEOMETRY, 'V8N5M3', '2024-01-08 10:00:00', 0, 0),
('Ivy', 'ivy@example.com', 'password9', 'POINT(48.422844 -123.404489)'::GEOMETRY, 'V8N5M3', '2024-01-09 10:00:00', 0, 0),
('Jack', 'jack@example.com', 'password10', 'POINT(48.422844 -123.360044)'::GEOMETRY, 'V8N5M3', '2024-01-10 10:00:00', 0, 0),
('Karen', 'karen@example.com', 'password11', 'POINT(48.433956 -123.415600)'::GEOMETRY, 'V8N5M3', '2024-01-11 10:00:00', 0, 0),
('Leo', 'leo@example.com', 'password12', 'POINT(48.433956 -123.348933)'::GEOMETRY, 'V8N5M3', '2024-01-12 10:00:00', 0, 0),
('Mona', 'mona@example.com', 'password13', 'POINT(48.445067 -123.404489)'::GEOMETRY, 'V8N5M3', '2024-01-13 10:00:00', 0, 0),
('Nina', 'nina@example.com', 'password14', 'POINT(48.445067 -123.360044)'::GEOMETRY, 'V8N5M3', '2024-01-14 10:00:00', 0, 0),
('Oscar', 'oscar@example.com', 'password15', 'POINT(48.456178 -123.415600)'::GEOMETRY, 'V8N5M3', '2024-01-15 10:00:00', 0, 0),
('Paul', 'paul@example.com', 'password16', 'POINT(48.456178 -123.360044)'::GEOMETRY, 'V8N5M3', '2024-01-16 10:00:00', 0, 0),
('Quinn', 'quinn@example.com', 'password17', 'POINT(48.467289 -123.404489)'::GEOMETRY, 'V8N5M3', '2024-01-17 10:00:00', 0, 0),
('Rose', 'rose@example.com', 'password18', 'POINT(48.467289 -123.337822)'::GEOMETRY, 'V8N5M3', '2024-01-18 10:00:00', 0, 0),
('Sam', 'sam@example.com', 'password19', 'POINT(48.478400 -123.393378)'::GEOMETRY, 'V8N5M3', '2024-01-19 10:00:00', 0, 0),
('Tina', 'tina@example.com', 'password20', 'POINT(48.478400 -123.337822)'::GEOMETRY, 'V8N5M3', '2024-01-20 10:00:00', 0, 0);


CREATE TEMP TABLE temp_listings (
    seller_id INT,
    title TEXT,
    price DECIMAL(10, 2),
    latitude FLOAT,
    longitude FLOAT,
    postal_code VARCHAR(255),
    status VARCHAR(255),
    listed_at TIMESTAMP,
    last_updated_at TIMESTAMP,
    category VARCHAR(255)
);


COPY temp_listings(seller_id, title, price, latitude, longitude, postal_code, status, listed_at, last_updated_at, category) 
FROM '/docker-entrypoint-initdb.d/data.csv' DELIMITER ';' CSV HEADER;

INSERT INTO "Listings" (seller_id, title, price, location, postal_code, status, listed_at, last_updated_at, category)
SELECT seller_id, title, price, 
       CONCAT('POINT(',latitude,' ',longitude ,')')::GEOMETRY,
       postal_code, status, listed_at, last_updated_at, category
FROM temp_listings;

DROP TABLE temp_listings;