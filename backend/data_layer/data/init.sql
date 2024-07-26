CREATE EXTENSION postgis ;

CREATE TABLE IF NOT EXISTS "Users" (
    user_id SERIAL PRIMARY KEY UNIQUE,
    username VARCHAR(255) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    lat_long GEOMETRY(POINT) NOT NULL,
    location VARCHAR(255) NOT NULL,
    joining_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    items_sold INT NOT NULL DEFAULT 0,
    items_purchased INT NOT NULL DEFAULT 0,
    see_charity BOOLEAN NOT NULL DEFAULT TRUE
);

CREATE TABLE IF NOT EXISTS "Listings" (
    listing_id SERIAL PRIMARY KEY,
    seller_id INT NOT NULL REFERENCES "Users"(user_id) ON DELETE CASCADE,
    buyer_username VARCHAR(255) REFERENCES "Users"(username) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    lat_long GEOMETRY(POINT) NOT NULL,
    location VARCHAR(255) NOT NULL,
    status VARCHAR(255) NOT NULL CHECK (status IN ('AVAILABLE', 'SOLD', 'REMOVED')),
    listed_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    last_updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    category VARCHAR(255) NOT NULL,
    pull_limit INT,
    page_offset INT,
    for_charity BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS "Chats" (
    chat_id SERIAL PRIMARY KEY,
    user_id_one INT NOT NULL REFERENCES "Users"(user_id) ON DELETE CASCADE,
    user_id_two INT NOT NULL REFERENCES "Users"(user_id) ON DELETE CASCADE,
    listing_id INT NOT NULL REFERENCES "Listings"(listing_id) ON DELETE CASCADE,
    timestamp TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    last_message_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "Messages" (
    message_id SERIAL PRIMARY KEY,
    listing_id INT NOT NULL REFERENCES "Listings"(listing_id) ON DELETE CASCADE,
    message_content TEXT NOT NULL,
    timestamp TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    chat_id INT NOT NULL REFERENCES "Chats"(chat_id) ON DELETE CASCADE,
    sender_id INT NOT NULL REFERENCES "Users"(user_id) ON DELETE CASCADE,
    receiver_id INT NOT NULL REFERENCES "Users"(user_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS "Ratings" (
    rating_id SERIAL PRIMARY KEY,
    listing_id INT NOT NULL REFERENCES "Listings"(listing_id) ON DELETE CASCADE,
    user_id INT NOT NULL REFERENCES "Users"(user_id) ON DELETE CASCADE,
    rating_value INT NOT NULL CHECK (rating_value >= 1 AND rating_value <= 5),
    timestamp TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "Reviews" (
    review_id SERIAL PRIMARY KEY,
    listing_id INT NOT NULL REFERENCES "Listings"(listing_id) ON DELETE CASCADE,
    user_id INT NOT NULL REFERENCES "Users"(user_id) ON DELETE CASCADE,
    review_content TEXT NOT NULL,
    rating_id INT REFERENCES "Ratings"(rating_id) ON DELETE CASCADE,
    timestamp TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "Charity" (
    charity_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    status VARCHAR(255) NOT NULL CHECK (status IN ('OPEN', 'CLOSED')),
    fund DECIMAL(10, 2) NOT NULL,
    logo_url VARCHAR(255) NOT NULL,
    start_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    end_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    num_listings INT NOT NULL DEFAULT 0
);

-- Insert 20 users with unique usernames and emails
INSERT INTO "Users" (username, email, password, lat_long, location, joining_date, items_sold, items_purchased) VALUES
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
('Tina', 'tina@example.com', 'password20', 'POINT(48.478400 -123.337822)'::GEOMETRY, 'V8N5M3', '2024-01-20 10:00:00', 0, 0),
('TestUser', 'testuser@example.com', '$2a$10$2NC3ozp1b1YIgSb0tpEEEep83BUpAOz5xi4.dsyqqa80kXINQl5oO', 'POINT(48.478400 -123.337822)'::GEOMETRY, 'V8N5M3', '2024-01-20 10:00:00', 0, 0);

INSERT INTO "Listings" (seller_id, buyer_username, title, price, lat_long, location, status, listed_at, last_updated_at, category) VALUES
(1, NULL, 'Bicycle',100,'POINT(48.428400 -123.385600)'::GEOMETRY, 'V8R6N2', 'AVAILABLE', '2024-02-01 10:00:00', '2024-02-01 10:00:00', 'Sports'),
(1, NULL, 'Laptop',500,'POINT(48.378400 -123.404489)'::GEOMETRY, 'V8R6N2', 'AVAILABLE', '2024-02-01 11:00:00', '2024-02-01 11:00:00', 'Electronics'),
(1, NULL, 'Desk Chair',75,'POINT(48.378400 -123.393378)'::GEOMETRY, 'V8R6N2', 'AVAILABLE', '2024-02-01 12:00:00', '2024-02-01 12:00:00', 'Furniture'),
(1, NULL, 'Headphones',50,'POINT(48.378400 -123.382267)'::GEOMETRY, 'V8R6N2', 'AVAILABLE', '2024-02-01 13:00:00', '2024-02-01 13:00:00', 'Electronics'),
(1, NULL, 'Bookshelf',120,'POINT(48.378400 -123.371156)'::GEOMETRY, 'V8R6N2', 'AVAILABLE', '2024-02-01 14:00:00', '2024-02-01 14:00:00', 'Furniture'),
(2, NULL, 'Guitar',150,'POINT(48.378400 -123.360044)'::GEOMETRY, 'V8R6N2', 'AVAILABLE', '2024-02-02 10:00:00', '2024-02-02 10:00:00', 'Music'),
(2, NULL, 'Camera',300,'POINT(48.378400 -123.348933)'::GEOMETRY, 'V8R6N2', 'AVAILABLE', '2024-02-02 11:00:00', '2024-02-02 11:00:00', 'Electronics'),
(2, NULL, 'Coffee Table',80,'POINT(48.378400 -123.337822)'::GEOMETRY, 'V8W1R7', 'AVAILABLE', '2024-02-02 12:00:00', '2024-02-02 12:00:00', 'Furniture'),
(2, NULL, 'Smartphone',400,'POINT(48.378400 -123.326711)'::GEOMETRY, 'V8W1R7', 'AVAILABLE', '2024-02-02 13:00:00', '2024-02-02 13:00:00', 'Electronics'),
(2, NULL, 'Dining Set',200,'POINT(48.378400 -123.315600)'::GEOMETRY, 'V9A4L2', 'AVAILABLE', '2024-02-02 14:00:00', '2024-02-02 14:00:00', 'Furniture'),
(3, NULL, 'Mountain Bike',250,'POINT(48.389511 -123.415600)'::GEOMETRY, 'V8W1R7', 'AVAILABLE', '2024-02-03 10:00:00', '2024-02-03 10:00:00', 'Sports'),
(3, NULL, 'Tablet',200,'POINT(48.389511 -123.404489)'::GEOMETRY, 'V9A4L2', 'AVAILABLE', '2024-02-03 11:00:00', '2024-02-03 11:00:00', 'Electronics'),
(3, NULL, 'Sofa',300,'POINT(48.389511 -123.393378)'::GEOMETRY, 'V8W1R7', 'AVAILABLE', '2024-02-03 12:00:00', '2024-02-03 12:00:00', 'Furniture'),
(3, NULL, 'Wireless Earbuds',80,'POINT(48.389511 -123.382267)'::GEOMETRY, 'V8W1R7', 'AVAILABLE', '2024-02-03 13:00:00', '2024-02-03 13:00:00', 'Electronics'),
(3, NULL, 'Office Desk',150,'POINT(48.389511 -123.371156)'::GEOMETRY, 'V8W1R7', 'AVAILABLE', '2024-02-03 14:00:00', '2024-02-03 14:00:00', 'Furniture'),
(4, NULL, 'Keyboard',50,'POINT(48.389511 -123.360044)'::GEOMETRY, 'V8N5M3', 'AVAILABLE', '2024-02-04 10:00:00', '2024-02-04 10:00:00', 'Music'),
(4, NULL, 'Monitor',150,'POINT(48.389511 -123.348933)'::GEOMETRY, 'V8N5M3', 'AVAILABLE', '2024-02-04 11:00:00', '2024-02-04 11:00:00', 'Electronics'),
(4, NULL, 'Dining Table',250,'POINT(48.389511 -123.337822)'::GEOMETRY, 'V8N5M3', 'AVAILABLE', '2024-02-04 12:00:00', '2024-02-04 12:00:00', 'Furniture'),
(4, NULL, 'Bluetooth Speaker',100,'POINT(48.389511 -123.326711)'::GEOMETRY, 'V8N5M3', 'AVAILABLE', '2024-02-04 13:00:00', '2024-02-04 13:00:00', 'Electronics'),
(4, NULL, 'Bookshelf',120,'POINT(48.389511 -123.315600)'::GEOMETRY, 'V8N5M3', 'AVAILABLE', '2024-02-04 14:00:00', '2024-02-04 14:00:00', 'Furniture'),
(5, NULL, 'Printer',75,'POINT(48.400622 -123.415600)'::GEOMETRY, 'V8N5M3', 'AVAILABLE', '2024-02-05 10:00:00', '2024-02-05 10:00:00', 'Electronics'),
(5, NULL, 'Bookshelf',120,'POINT(48.400622 -123.404489)'::GEOMETRY, 'V8N5M3', 'AVAILABLE', '2024-02-05 11:00:00', '2024-02-05 11:00:00', 'Furniture'),
(5, NULL, 'Electric Kettle',40,'POINT(48.400622 -123.393378)'::GEOMETRY, 'V8N5M3', 'AVAILABLE', '2024-02-05 12:00:00', '2024-02-05 12:00:00', 'Appliances'),
(5, NULL, 'Office Chair',100,'POINT(48.400622 -123.382267)'::GEOMETRY, 'V8N5M3', 'AVAILABLE', '2024-02-05 13:00:00', '2024-02-05 13:00:00', 'Furniture'),
(5, NULL, 'Laptop',500,'POINT(48.400622 -123.371156)'::GEOMETRY, 'V8N5M3', 'AVAILABLE', '2024-02-05 14:00:00', '2024-02-05 14:00:00', 'Electronics'),
(6, NULL, 'Mixer',60,'POINT(48.400622 -123.360044)'::GEOMETRY, 'V8N5M3', 'AVAILABLE', '2024-02-06 10:00:00', '2024-02-06 10:00:00', 'Appliances'),
(6, NULL, 'Bookshelf',120,'POINT(48.400622 -123.348933)'::GEOMETRY, 'V8N5M3', 'AVAILABLE', '2024-02-06 11:00:00', '2024-02-06 11:00:00', 'Furniture'),
(6, NULL, 'Headphones',50,'POINT(48.400622 -123.337822)'::GEOMETRY, 'V8N5M3', 'AVAILABLE', '2024-02-06 12:00:00', '2024-02-06 12:00:00', 'Electronics'),
(6, NULL, 'Coffee Maker',75,'POINT(48.400622 -123.326711)'::GEOMETRY, 'V8N5M3', 'AVAILABLE', '2024-02-06 13:00:00', '2024-02-06 13:00:00', 'Appliances'),
(6, NULL, 'Laptop',500,'POINT(48.400622 -123.315600)'::GEOMETRY, 'V8N5M3', 'AVAILABLE', '2024-02-06 14:00:00', '2024-02-06 14:00:00', 'Electronics'),
(7, NULL, 'Smartphone',400,'POINT(48.411733 -123.415600)'::GEOMETRY, 'V8N5M3', 'AVAILABLE', '2024-02-07 10:00:00', '2024-02-07 10:00:00', 'Electronics'),
(7, NULL, 'Desk Lamp',30,'POINT(48.411733 -123.404489)'::GEOMETRY, 'V8N5M3', 'AVAILABLE', '2024-02-07 11:00:00', '2024-02-07 11:00:00', 'Furniture'),
(7, NULL, 'Bookshelf',120,'POINT(48.411733 -123.393378)'::GEOMETRY, 'V8N5M3', 'AVAILABLE', '2024-02-07 12:00:00', '2024-02-07 12:00:00', 'Furniture'),
(7, NULL, 'Electric Fan',45,'POINT(48.411733 -123.382267)'::GEOMETRY, 'V8N5M3', 'AVAILABLE', '2024-02-07 13:00:00', '2024-02-07 13:00:00', 'Appliances'),
(7, NULL, 'Laptop',500,'POINT(48.411733 -123.371156)'::GEOMETRY, 'V8N5M3', 'AVAILABLE', '2024-02-07 14:00:00', '2024-02-07 14:00:00', 'Electronics'),
(8, NULL, 'Tablet',200,'POINT(48.411733 -123.360044)'::GEOMETRY, 'V8N5M3', 'AVAILABLE', '2024-02-08 10:00:00', '2024-02-08 10:00:00', 'Electronics'),
(8, NULL, 'Bookshelf',120,'POINT(48.411733 -123.348933)'::GEOMETRY, 'V8N5M3', 'AVAILABLE', '2024-02-08 11:00:00', '2024-02-08 11:00:00', 'Furniture'),
(8, NULL, 'Toaster',25,'POINT(48.411733 -123.337822)'::GEOMETRY, 'V8N5M3', 'AVAILABLE', '2024-02-08 12:00:00', '2024-02-08 12:00:00', 'Appliances'),
(8, NULL, 'Laptop',500,'POINT(48.411733 -123.326711)'::GEOMETRY, 'V8N5M3', 'AVAILABLE', '2024-02-08 13:00:00', '2024-02-08 13:00:00', 'Electronics'),
(8, NULL, 'Chair',75,'POINT(48.411733 -123.315600)'::GEOMETRY, 'V8N5M3', 'AVAILABLE', '2024-02-08 14:00:00', '2024-02-08 14:00:00', 'Furniture'),
(9, NULL, 'Refrigerator',300,'POINT(48.422844 -123.415600)'::GEOMETRY, 'V8N5M3', 'AVAILABLE', '2024-02-09 10:00:00', '2024-02-09 10:00:00', 'Appliances'),
(9, NULL, 'Bookshelf',120,'POINT(48.422844 -123.404489)'::GEOMETRY, 'V8N5M3', 'AVAILABLE', '2024-02-09 11:00:00', '2024-02-09 11:00:00', 'Furniture'),
(9, NULL, 'Smartwatch',250,'POINT(48.422844 -123.393378)'::GEOMETRY, 'V8N5M3', 'AVAILABLE', '2024-02-09 12:00:00', '2024-02-09 12:00:00', 'Electronics'),
(9, NULL, 'Laptop',500,'POINT(48.422844 -123.382267)'::GEOMETRY, 'V8N5M3', 'AVAILABLE', '2024-02-09 13:00:00', '2024-02-09 13:00:00', 'Electronics'),
(9, NULL, 'Desk Chair',75,'POINT(48.422844 -123.371156)'::GEOMETRY, 'V8N5M3', 'AVAILABLE', '2024-02-09 14:00:00', '2024-02-09 14:00:00', 'Furniture'),
(10, NULL, 'Microwave',50,'POINT(48.422844 -123.360044)'::GEOMETRY, 'V8N5M3', 'AVAILABLE', '2024-02-10 10:00:00', '2024-02-10 10:00:00', 'Appliances'),
(10, NULL, 'Bookshelf',120,'POINT(48.422844 -123.348933)'::GEOMETRY, 'V8N5M3', 'AVAILABLE', '2024-02-10 11:00:00', '2024-02-10 11:00:00', 'Furniture'),
(10, NULL, 'Laptop',500,'POINT(48.422844 -123.337822)'::GEOMETRY, 'V8N5M3', 'AVAILABLE', '2024-02-10 12:00:00', '2024-02-10 12:00:00', 'Electronics'),
(10, NULL, 'Blender',35,'POINT(48.422844 -123.326711)'::GEOMETRY, 'V8N5M3', 'AVAILABLE', '2024-02-10 13:00:00', '2024-02-10 13:00:00', 'Appliances'),
(10, NULL, 'Desk Lamp',30,'POINT(48.422844 -123.315600)'::GEOMETRY, 'V8N5M3', 'AVAILABLE', '2024-02-10 14:00:00', '2024-02-10 14:00:00', 'Furniture'),
(11, NULL, 'Air Conditioner',250,'POINT(48.433956 -123.415600)'::GEOMETRY, 'V8N5M3', 'AVAILABLE', '2024-02-11 10:00:00', '2024-02-11 10:00:00', 'Appliances'),
(11, NULL, 'Bookshelf',120,'POINT(48.433956 -123.404489)'::GEOMETRY, 'V8N5M3', 'AVAILABLE', '2024-02-11 11:00:00', '2024-02-11 11:00:00', 'Furniture'),
(11, NULL, 'Smartphone',400,'POINT(48.433956 -123.393378)'::GEOMETRY, 'V8N5M3', 'AVAILABLE', '2024-02-11 12:00:00', '2024-02-11 12:00:00', 'Electronics'),
(11, NULL, 'Vacuum Cleaner',150,'POINT(48.433956 -123.382267)'::GEOMETRY, 'V8N5M3', 'AVAILABLE', '2024-02-11 13:00:00', '2024-02-11 13:00:00', 'Appliances'),
(11, NULL, 'Desk Chair',75,'POINT(48.433956 -123.371156)'::GEOMETRY, 'V8N5M3', 'AVAILABLE', '2024-02-11 14:00:00', '2024-02-11 14:00:00', 'Furniture'),
(12, NULL, 'Electric Oven',350,'POINT(48.433956 -123.360044)'::GEOMETRY, 'V8N5M3', 'AVAILABLE', '2024-02-12 10:00:00', '2024-02-12 10:00:00', 'Appliances'),
(12, NULL, 'Bookshelf',120,'POINT(48.433956 -123.348933)'::GEOMETRY, 'V8N5M3', 'AVAILABLE', '2024-02-12 11:00:00', '2024-02-12 11:00:00', 'Furniture'),
(12, NULL, 'Smartwatch',250,'POINT(48.433956 -123.337822)'::GEOMETRY, 'V8N5M3', 'AVAILABLE', '2024-02-12 12:00:00', '2024-02-12 12:00:00', 'Electronics'),
(12, NULL, 'Laptop',500,'POINT(48.433956 -123.326711)'::GEOMETRY, 'V8N5M3', 'AVAILABLE', '2024-02-12 13:00:00', '2024-02-12 13:00:00', 'Electronics'),
(12, NULL, 'Desk Lamp',30,'POINT(48.433956 -123.315600)'::GEOMETRY, 'V8N5M3', 'AVAILABLE', '2024-02-12 14:00:00', '2024-02-12 14:00:00', 'Furniture'),
(13, NULL, 'Hair Dryer',40,'POINT(48.445067 -123.415600)'::GEOMETRY, 'V8N5M3', 'AVAILABLE', '2024-02-13 10:00:00', '2024-02-13 10:00:00', 'Appliances'),
(13, NULL, 'Bookshelf',120,'POINT(48.445067 -123.404489)'::GEOMETRY, 'V8N5M3', 'AVAILABLE', '2024-02-13 11:00:00', '2024-02-13 11:00:00', 'Furniture'),
(13, NULL, 'Smartphone',400,'POINT(48.445067 -123.393378)'::GEOMETRY, 'V8N5M3', 'AVAILABLE', '2024-02-13 12:00:00', '2024-02-13 12:00:00', 'Electronics'),
(13, NULL, 'Laptop',500,'POINT(48.445067 -123.382267)'::GEOMETRY, 'V8N5M3', 'AVAILABLE', '2024-02-13 13:00:00', '2024-02-13 13:00:00', 'Electronics'),
(13, NULL, 'Desk Chair',75,'POINT(48.445067 -123.371156)'::GEOMETRY, 'V8N5M3', 'AVAILABLE', '2024-02-13 14:00:00', '2024-02-13 14:00:00', 'Furniture'),
(14, NULL, 'Washing Machine',500,'POINT(48.445067 -123.360044)'::GEOMETRY, 'V8N5M3', 'AVAILABLE', '2024-02-14 10:00:00', '2024-02-14 10:00:00', 'Appliances'),
(14, NULL, 'Bookshelf',120,'POINT(48.445067 -123.348933)'::GEOMETRY, 'V8N5M3', 'AVAILABLE', '2024-02-14 11:00:00', '2024-02-14 11:00:00', 'Furniture'),
(14, NULL, 'Smartwatch',250,'POINT(48.445067 -123.337822)'::GEOMETRY, 'V8N5M3', 'AVAILABLE', '2024-02-14 12:00:00', '2024-02-14 12:00:00', 'Electronics'),
(14, NULL, 'Laptop',500,'POINT(48.445067 -123.326711)'::GEOMETRY, 'V8N5M3', 'AVAILABLE', '2024-02-14 13:00:00', '2024-02-14 13:00:00', 'Electronics'),
(14, NULL, 'Desk Lamp',30,'POINT(48.445067 -123.315600)'::GEOMETRY, 'V8N5M3', 'AVAILABLE', '2024-02-14 14:00:00', '2024-02-14 14:00:00', 'Furniture'),
(15, NULL, 'Air Fryer',80,'POINT(48.456178 -123.415600)'::GEOMETRY, 'V8N5M3', 'AVAILABLE', '2024-02-15 10:00:00', '2024-02-15 10:00:00', 'Appliances'),
(15, NULL, 'Bookshelf',120,'POINT(48.456178 -123.404489)'::GEOMETRY, 'V8N5M3', 'AVAILABLE', '2024-02-15 11:00:00', '2024-02-15 11:00:00', 'Furniture'),
(15, NULL, 'Smartphone',400,'POINT(48.456178 -123.393378)'::GEOMETRY, 'V8N5M3', 'AVAILABLE', '2024-02-15 12:00:00', '2024-02-15 12:00:00', 'Electronics'),
(15, NULL, 'Laptop',500,'POINT(48.456178 -123.382267)'::GEOMETRY, 'V8N5M3', 'AVAILABLE', '2024-02-15 13:00:00', '2024-02-15 13:00:00', 'Electronics'),
(15, NULL, 'Desk Chair',75,'POINT(48.456178 -123.371156)'::GEOMETRY, 'V8N5M3', 'AVAILABLE', '2024-02-15 14:00:00', '2024-02-15 14:00:00', 'Furniture'),
(16, NULL, 'Blender',35,'POINT(48.456178 -123.360044)'::GEOMETRY, 'V8N5M3', 'AVAILABLE', '2024-02-16 10:00:00', '2024-02-16 10:00:00', 'Appliances'),
(16, NULL, 'Bookshelf',120,'POINT(48.456178 -123.348933)'::GEOMETRY, 'V8N5M3', 'AVAILABLE', '2024-02-16 11:00:00', '2024-02-16 11:00:00', 'Furniture'),
(16, NULL, 'Smartwatch',250,'POINT(48.456178 -123.337822)'::GEOMETRY, 'V8N5M3', 'AVAILABLE', '2024-02-16 12:00:00', '2024-02-16 12:00:00', 'Electronics'),
(16, NULL, 'Laptop',500,'POINT(48.456178 -123.326711)'::GEOMETRY, 'V8N5M3', 'AVAILABLE', '2024-02-16 13:00:00', '2024-02-16 13:00:00', 'Electronics'),
(16, NULL, 'Desk Lamp',30,'POINT(48.456178 -123.315600)'::GEOMETRY, 'V8N5M3', 'AVAILABLE', '2024-02-16 14:00:00', '2024-02-16 14:00:00', 'Furniture'),
(17, NULL, 'Coffee Maker',75,'POINT(48.467289 -123.415600)'::GEOMETRY, 'V8N5M3', 'AVAILABLE', '2024-02-17 10:00:00', '2024-02-17 10:00:00', 'Appliances'),
(17, NULL, 'Bookshelf',120,'POINT(48.467289 -123.404489)'::GEOMETRY, 'V8N5M3', 'AVAILABLE', '2024-02-17 11:00:00', '2024-02-17 11:00:00', 'Furniture'),
(17, NULL, 'Smartphone',400,'POINT(48.467289 -123.393378)'::GEOMETRY, 'V8N5M3', 'AVAILABLE', '2024-02-17 12:00:00', '2024-02-17 12:00:00', 'Electronics'),
(17, NULL, 'Laptop',500,'POINT(48.467289 -123.382267)'::GEOMETRY, 'V8N5M3', 'AVAILABLE', '2024-02-17 13:00:00', '2024-02-17 13:00:00', 'Electronics'),
(17, NULL, 'Desk Chair',75,'POINT(48.467289 -123.371156)'::GEOMETRY, 'V8N5M3', 'AVAILABLE', '2024-02-17 14:00:00', '2024-02-17 14:00:00', 'Furniture'),
(18, NULL, 'Electric Kettle',40,'POINT(48.467289 -123.360044)'::GEOMETRY, 'V8N5M3', 'AVAILABLE', '2024-02-18 10:00:00', '2024-02-18 10:00:00', 'Appliances'),
(18, NULL, 'Bookshelf',120,'POINT(48.467289 -123.348933)'::GEOMETRY, 'V8N5M3', 'AVAILABLE', '2024-02-18 11:00:00', '2024-02-18 11:00:00', 'Furniture'),
(18, NULL, 'Smartwatch',250,'POINT(48.467289 -123.337822)'::GEOMETRY, 'V8N5M3', 'AVAILABLE', '2024-02-18 12:00:00', '2024-02-18 12:00:00', 'Electronics'),
(18, NULL, 'Laptop',500,'POINT(48.467289 -123.326711)'::GEOMETRY, 'V8N5M3', 'AVAILABLE', '2024-02-18 13:00:00', '2024-02-18 13:00:00', 'Electronics'),
(18, NULL, 'Desk Lamp',30,'POINT(48.467289 -123.315600)'::GEOMETRY, 'V8N5M3', 'AVAILABLE', '2024-02-18 14:00:00', '2024-02-18 14:00:00', 'Furniture'),
(19, NULL, 'Toaster',25,'POINT(48.478400 -123.415600)'::GEOMETRY, 'V8N5M3', 'AVAILABLE', '2024-02-19 10:00:00', '2024-02-19 10:00:00', 'Appliances'),
(19, NULL, 'Bookshelf',120,'POINT(48.478400 -123.404489)'::GEOMETRY, 'V8N5M3', 'AVAILABLE', '2024-02-19 11:00:00', '2024-02-19 11:00:00', 'Furniture'),
(19, NULL, 'Smartphone',400,'POINT(48.478400 -123.393378)'::GEOMETRY, 'V8N5M3', 'AVAILABLE', '2024-02-19 12:00:00', '2024-02-19 12:00:00', 'Electronics'),
(19, NULL, 'Laptop',500,'POINT(48.478400 -123.382267)'::GEOMETRY, 'V8N5M3', 'AVAILABLE', '2024-02-19 13:00:00', '2024-02-19 13:00:00', 'Electronics'),
(19, NULL, 'Desk Chair',75,'POINT(48.478400 -123.371156)'::GEOMETRY, 'V8N5M3', 'AVAILABLE', '2024-02-19 14:00:00', '2024-02-19 14:00:00', 'Furniture'),
(20, NULL, 'Juicer',50,'POINT(48.478400 -123.360044)'::GEOMETRY, 'V8N5M3', 'AVAILABLE', '2024-02-20 10:00:00', '2024-02-20 10:00:00', 'Appliances'),
(20, NULL, 'Bookshelf',120,'POINT(48.478400 -123.348933)'::GEOMETRY, 'V8N5M3', 'AVAILABLE', '2024-02-20 11:00:00', '2024-02-20 11:00:00', 'Furniture'),
(20, NULL, 'Smartphone',400,'POINT(48.478400 -123.337822)'::GEOMETRY, 'V8N5M3', 'AVAILABLE', '2024-02-20 12:00:00', '2024-02-20 12:00:00', 'Electronics'),
(20, NULL, 'Laptop',500,'POINT(48.478400 -123.326711)'::GEOMETRY, 'V8N5M3', 'AVAILABLE', '2024-02-20 13:00:00', '2024-02-20 13:00:00', 'Electronics'),
(20, NULL, 'Desk Lamp',30,'POINT(48.478400 -123.315600)'::GEOMETRY, 'V8N5M3', 'AVAILABLE', '2024-02-20 14:00:00', '2024-02-20 14:00:00', 'Furniture');

INSERT INTO "Chats" (user_id_one, user_id_two, listing_id, timestamp, last_message_time) VALUES
(1, 2, 1, '2024-02-01 10:00:00', '2024-02-01 10:00:00'),
(2, 3, 2, '2024-02-01 11:00:00', '2024-02-01 10:00:00'),
(3, 4, 3, '2024-02-01 12:00:00', '2024-02-01 10:00:00'),
(4, 5, 4, '2024-02-01 13:00:00', '2024-02-01 10:00:00'),
(5, 6, 5, '2024-02-01 14:00:00', '2024-02-01 10:00:00'),
(6, 7, 6, '2024-02-02 10:00:00', '2024-02-01 10:00:00'),
(7, 8, 7, '2024-02-02 11:00:00', '2024-02-01 10:00:00'),
(8, 9, 8, '2024-02-02 12:00:00', '2024-02-01 10:00:00'),
(9, 10, 9, '2024-02-02 13:00:00', '2024-02-01 10:00:00'),
(10, 11, 10, '2024-02-02 14:00:00', '2024-02-01 10:00:00'); 

INSERT INTO "Messages" (listing_id, message_content, timestamp, chat_id, sender_id, receiver_id) VALUES
(1, 'Hello, I am interested in the Bicycle.', '2024-02-01 10:00:00', 1, 1, 2),
(1, 'Sure, I can meet you at the park.', '2024-02-01 10:05:00', 1, 2, 1),
(1, 'Great, see you there.', '2024-02-01 10:10:00', 1, 1, 2),
(2, 'Hello, I am interested in the Laptop.', '2024-02-01 11:00:00', 2, 1, 2),
(2, 'Sure, I can meet you at the coffee shop.', '2024-02-01 11:05:00', 2, 2, 1),
(2, 'Great, see you there.', '2024-02-01 11:10:00', 2, 1, 2),
(3, 'Hello, I am interested in the Desk Chair.', '2024-02-01 12:00:00', 3, 1, 2),
(3, 'Sure, I can meet you at the library.', '2024-02-01 12:05:00', 3, 2, 1),
(3, 'Great, see you there.', '2024-02-01 12:10:00', 3, 1, 2),
(4, 'Hello, I am interested in the Headphones.', '2024-02-01 13:00:00', 4, 1, 2),
(4, 'Sure, I can meet you at the park.', '2024-02-01 13:05:00', 4, 2, 1),
(4, 'Great, see you there.', '2024-02-01 13:10:00', 4, 1, 2),
(5, 'Hello, I am interested in the Bookshelf.', '2024-02-01 14:00:00', 5, 1, 2),
(5, 'Sure, I can meet you at the coffee shop.', '2024-02-01 14:05:00', 5, 2, 1),
(5, 'Great, see you there.', '2024-02-01 14:10:00', 5, 1, 2),
(6, 'Hello, I am interested in the Guitar.', '2024-02-02 10:00:00', 6, 1, 2);

INSERT INTO "Ratings" (listing_id, user_id, rating_value, timestamp) VALUES
(1, 2, 5, '2024-02-01 10:00:00'),
(2, 3, 4, '2024-02-01 11:00:00'),
(3, 4, 3, '2024-02-01 12:00:00'),
(4, 5, 2, '2024-02-01 13:00:00'),
(5, 6, 1, '2024-02-01 14:00:00'),
(6, 7, 5, '2024-02-02 10:00:00'),
(7, 8, 4, '2024-02-02 11:00:00'),
(8, 9, 3, '2024-02-02 12:00:00'),
(9, 10, 2, '2024-02-02 13:00:00'),
(10, 11, 1, '2024-02-02 14:00:00'),
(11, 12, 1, '2024-02-02 14:00:00');

INSERT INTO "Reviews" (listing_id, user_id, review_content, rating_id, timestamp) VALUES
(1, 2, 'Great bike, would rent again.', 1, '2024-02-01 10:00:00'),
(1, 2, 'Bad bike, would not rent again.', 1, '2024-02-01 10:00:00'),
(2, 3, 'Good laptop, would rent again.', 2, '2024-02-01 11:00:00'),
(3, 4, 'Average desk chair, would not rent again.', 3, '2024-02-01 12:00:00'),
(4, 5, 'Poor headphones, would not rent again.', 4, '2024-02-01 13:00:00'),
(5, 6, 'Terrible bookshelf, would not rent again.', 5, '2024-02-01 14:00:00'),
(6, 7, 'Great guitar, would rent again.', 6, '2024-02-02 10:00:00'),
(7, 8, 'Good keyboard, would rent again.', 7, '2024-02-02 11:00:00'),
(8, 9, 'Average monitor, would not rent again.', 8, '2024-02-02 12:00:00'),
(9, 10, 'Poor dining table, would not rent again.', 9, '2024-02-02 13:00:00'),
(10, 11, 'Terrible bluetooth speaker, would not rent again.', 10, '2024-02-02 14:00:00');

INSERT INTO "Charity" (name, status, fund, logo_url, start_date, end_date, num_listings) VALUES
('BC Children''s Hospital', 'OPEN', 1000.00, '12345', '2024-02-01 10:00:00', '2024-02-01 10:00:00', 0),
('Canadian Red Cross', 'CLOSED', 2000.00, '12345', '2024-02-01 11:00:00', '2024-02-01 11:00:00', 0),
('World Wildlife Fund', 'OPEN', 3000.00, '12345', '2024-02-01 12:00:00', '2024-02-01 13:00:00', 0),
('Doctors Without Borders', 'OPEN', 4000.00, '12345', '2024-02-01 13:00:00', '2024-02-01 13:00:00', 0),
('Salvation Army', 'CLOSED', 5000.00, '12345', '2024-02-01 14:00:00', '2024-02-01 14:00:00', 0);


-- Insert 4k users
CREATE TEMP TABLE temp_users (
    firstName VARCHAR(255),
    lastName VARCHAR(255),
    randomNum INT,
    username VARCHAR(255),
    email VARCHAR(255),
    password VARCHAR(255),
    location VARCHAR(255),
    latitude FLOAT,
    longitude FLOAT,
    joining_date TIMESTAMP
);

COPY temp_users(firstName, lastName, randomNum, username, email, password, location, latitude, longitude, joining_date)
FROM '/docker-entrypoint-initdb.d/users.csv' DELIMITER ',' CSV HEADER;

INSERT INTO "Users" (username, email, password, lat_long, location, joining_date)
SELECT username, email, password,
       CONCAT('POINT(',latitude,' ',longitude ,')')::GEOMETRY,
       location, joining_date
FROM temp_users;

DROP TABLE temp_users;


-- Insert ~250k listings
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
FROM '/docker-entrypoint-initdb.d/listings.csv' DELIMITER ',' CSV HEADER;

UPDATE temp_listings SET category = CASE
    WHEN category = 'All Beauty' THEN 'BEAUTY' 
    WHEN category = 'All Electronics' THEN 'ELECTRONICS' 
    WHEN category = 'Amazon Devices' THEN 'ELECTRONICS' 
    WHEN category = 'AMAZON FASHION' THEN 'APPAREL' 
    WHEN category = 'Amazon Fire TV' THEN 'ELECTRONICS' 
    WHEN category = 'Amazon Home' THEN 'KITCHENSUPPLIES' 
    WHEN category = 'Apple Products' THEN 'ELECTRONICS' 
    WHEN category = 'Appliances' THEN 'KITCHENSUPPLIES' 
    WHEN category = 'Arts, Crafts & Sewing' THEN 'OFFICESUPPLIES' 
    WHEN category = 'Audible Audiobooks' THEN 'ENTERTAINMENT' 
    WHEN category = 'Automotive' THEN 'VEHICLES' 
    WHEN category = 'Baby' THEN 'OTHER' 
    WHEN category = 'Books' THEN 'ENTERTAINMENT' 
    WHEN category = 'Buy a Kindle' THEN 'ENTERTAINMENT' 
    WHEN category = 'Camera & Photo' THEN 'ELECTRONICS' 
    WHEN category = 'Car Electronics' THEN 'VEHICLES' 
    WHEN category = 'Cell Phones & Accessories' THEN 'PHONES' 
    WHEN category = 'Collectible Coins' THEN 'OTHER' 
    WHEN category = 'Collectibles & Fine Art' THEN 'OTHER' 
    WHEN category = 'Computers' THEN 'ELECTRONICS' 
    WHEN category = 'Digital Music' THEN 'ENTERTAINMENT' 
    WHEN category = 'Electronics' THEN 'ELECTRONICS' 
    WHEN category = 'Entertainment' THEN 'ENTERTAINMENT' 
    WHEN category = 'Fire Phone' THEN 'ELECTRONICS' 
    WHEN category = 'Furniture' THEN 'FURNITURE' 
    WHEN category = 'Gift Cards' THEN 'OTHER' 
    WHEN category = 'GPS & Navigation' THEN 'VEHICLES' 
    WHEN category = 'Grocery' THEN 'OTHER' 
    WHEN category = 'Handmade' THEN 'OTHER' 
    WHEN category = 'Health & Personal Care' THEN 'HEALTH' 
    WHEN category = 'Home Audio & Theater' THEN 'ELECTRONICS' 
    WHEN category = 'Industrial & Scientific' THEN 'OTHER' 
    WHEN category = 'Movies & TV' THEN 'ENTERTAINMENT' 
    WHEN category = 'Music' THEN 'ENTERTAINMENT' 
    WHEN category = 'Musical Instruments' THEN 'MUSICALINSTRUMENTS' 
    WHEN category = 'Office Products' THEN 'OFFICESUPPLIES' 
    WHEN category = 'Pet Supplies' THEN 'OTHER' 
    WHEN category = 'Portable Audio & Accessories' THEN 'ELECTRONICS' 
    WHEN category = 'Premium Beauty' THEN 'BEAUTY' 
    WHEN category = 'Software' THEN 'ELECTRONICS' 
    WHEN category = 'Sports' THEN 'SPORTS' 
    WHEN category = 'Sports Collectibles' THEN 'OTHER' 
    WHEN category = 'Sports & Outdoors' THEN 'SPORTS' 
    WHEN category = 'Tools & Home Improvement' THEN 'GARDEN' 
    WHEN category = 'Toys & Games' THEN 'OTHER' 
    WHEN category = 'Video Games' THEN 'OTHER'
    ELSE 'OTHER'
END;

INSERT INTO "Listings" (seller_id, title, price, lat_long, location, status, listed_at, last_updated_at, category)
SELECT seller_id, title, price, 
       CONCAT('POINT(',latitude,' ',longitude ,')')::GEOMETRY,
       postal_code, status, listed_at, last_updated_at, category
FROM temp_listings;

DROP TABLE temp_listings;