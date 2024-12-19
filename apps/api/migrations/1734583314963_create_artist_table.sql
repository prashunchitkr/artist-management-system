CREATE TABLE artists (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    dob TIMESTAMP NOT NULL,
    gender GENDER NOT NULL,
    address VARCHAR(255) NOT NULL,
    first_release_year SMALLINT NOT NULL,
    no_of_albums_released INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);