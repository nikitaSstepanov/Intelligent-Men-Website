-- +goose Up
-- +goose StatementBegin
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email TEXT NOT NULL UNIQUE,
    username VARCHAR(50) NOT NULL,
    password TEXT NOT NUll,
    photoPath TEXT
);

CREATE TABLE tokens (
    id SERIAL PRIMARY KEY,
    refresh TEXT NOT NULL,
    userId SERIAL,
    FOREIGN KEY (userId) REFERENCES users (id) ON DELETE CASCADE
);

CREATE TABLE roles (
    id SERIAL PRIMARY KEY,
    role VARCHAR(20)
);

CREATE TABLE users_roles (
    userId SERIAL,
    roleId SERIAL,
    FOREIGN KEY (userId) REFERENCES users (id) ON DELETE CASCADE,
    FOREIGN KEY (roleId) REFERENCES roles (id) ON DELETE CASCADE
);

CREATE TABLE links (
    id SERIAL PRIMARY KEY,
    link TEXT NOT NUll UNIQUE,
    userId SERIAL,
    FOREIGN KEY (userId) REFERENCES users (id) ON DELETE CASCADE
);
-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
DROP TABLE IF EXISTS users;

DROP TABLE IF EXISTS tokens;

DROP TABLE IF EXISTS roles;

DROP TABLE IF EXISTS users_roles;

DROP TABLE IF EXISTS links;
-- +goose StatementEnd