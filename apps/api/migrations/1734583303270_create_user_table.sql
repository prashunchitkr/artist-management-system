CREATE TYPE GENDER AS ENUM ('m', 'f', 'o');
CREATE TYPE ROLE AS ENUM ('super_admin', 'artist_manager', 'artist');

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(500) NOT NULL,
    phone VARCHAR(20),
    dob TIMESTAMP,
    gender GENDER NOT NULL,
    address VARCHAR(255),
    role ROLE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);