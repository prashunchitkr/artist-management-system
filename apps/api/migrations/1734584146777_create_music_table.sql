CREATE TYPE GENRE AS ENUM ('rnb', 'country', 'classic', 'rock', 'jazz');
CREATE TABLE music (
    id SERIAL PRIMARY KEY,
    artist_id int NOT NULL REFERENCES artists(id) ON DELETE CASCADE,
    title varchar(255) NOT NULL,
    album_name varchar(255),
    genre GENRE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX idx_music_artist_id ON music(artist_id);