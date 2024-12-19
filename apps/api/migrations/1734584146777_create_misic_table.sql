CREATE TYPE GENRE AS ENUM ('rnb', 'country', 'classic', 'rock', 'jazz');

CREATE TABLE music (
    artist_id int NOT NULL REFERENCES artists(id),
    title varchar(255) NOT NULL,
    album_name varchar(255) NOT NULL,
    genre GENRE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);