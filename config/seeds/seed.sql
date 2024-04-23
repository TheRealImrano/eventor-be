-- Drop existing tables if they exist
DROP TABLE IF EXISTS registrations;
DROP TABLE IF EXISTS events;
DROP TABLE IF EXISTS users;

-- Creation of users table
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    is_organizer BOOLEAN NOT NULL
);

-- Creation of events table
CREATE TABLE events (
    event_id SERIAL PRIMARY KEY,
    event_name VARCHAR(255) NOT NULL,
    event_description TEXT,
    event_location VARCHAR(255),
    event_date TIMESTAMP,
    event_duration INTEGER,
    is_private BOOLEAN NOT NULL
);

-- Creation of registrations table
CREATE TABLE registrations (
    registration_id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(user_id),
    event_id INTEGER REFERENCES events(event_id)
);

-- Example seeding for users
INSERT INTO users (username, password, email, is_organizer) VALUES
('john_doe', 'securepassword', 'john@example.com', true),
('jane_smith', 'anothersecurepassword', 'jane@example.com', false);

-- Example seeding for events
INSERT INTO events (event_name, event_description, event_location, event_date, event_duration, is_private) VALUES
('Tech Conference', 'Annual tech conference', 'Convention Center', '2023-09-30 10:00:00', 480, false),
('Private Gala', 'An exclusive evening gala', 'Downtown Club', '2023-10-05 19:00:00', 240, true);

-- Example seeding for registrations
INSERT INTO registrations (user_id, event_id) VALUES
(1, 1),
(2, 1);
