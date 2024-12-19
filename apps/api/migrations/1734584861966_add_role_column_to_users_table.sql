CREATE TYPE ROLE AS ENUM ('super_admin', 'artist_manager', 'artist');

ALTER TABLE users ADD COLUMN role ROLE NOT NULL;