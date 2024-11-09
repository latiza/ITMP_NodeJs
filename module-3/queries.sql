DROP TABLE IF EXISTS users;

CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT,
  email TEXT
);

SELECT * FROM users;

SELECT * FROM users WHERE id = ?;

INSERT INTO users (name, email) VALUES (?, ?);

UPDATE users SET name = ?, email = ? WHERE id = ?;

DELETE FROM users WHERE id = ?;