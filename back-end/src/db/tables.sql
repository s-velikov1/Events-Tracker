CREATE TABLE IF NOT EXISTS accounts (
    id SERIAL PRIMARY KEY,
    name TEXT,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS event_participants (
    id SERIAL PRIMARY KEY,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    phone_number TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS events (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    start_date TIMESTAMP NOT NULL,
    end_date TIMESTAMP NOT NULL,
    account_id INTEGER REFERENCES accounts(id),
    participant_id INTEGER REFERENCES event_participants(id)
);

INSERT INTO accounts (name, email, password) VALUES ('Stas', 'stas@gmail.com', 'Qwe123');
INSERT INTO event_participants (first_name, last_name, email, phone_number) VALUES ('Joe', 'Tripiany', 'joe@gmail.com', '0981231212');
INSERT INTO events (title, description, start_date, end_date, account_id, participant_id) 
	VALUES ('Event#1', 'Description for event#1', '2023-04-12T13:36:19.923Z', '2023-04-12T14:36:19.923Z', 1, 1);