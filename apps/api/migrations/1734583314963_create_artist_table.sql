CREATE TABLE artists (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    dob TIMESTAMP,
    gender GENDER NOT NULL,
    address VARCHAR(255),
    first_release_year SMALLINT,
    no_of_albums_released INT,
    user_id INT UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);