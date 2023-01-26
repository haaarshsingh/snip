CREATE TYPE expires AS ENUM (
    'never',
    '1h',
    '2h',
    '10h',
    '1d',
    '2d',
    '1w',
    '1m',
    '1y'
);
CREATE TABLE snips (
    id varchar(255) PRIMARY KEY,
    code TEXT NOT NULL,
    password TEXT,
    language TEXT,
    expires_in expires,
    created_at TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    user_id UUID,
    CONSTRAINT users FOREIGN KEY(user_id) REFERENCES users(id)
);