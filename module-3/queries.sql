DROP TABLE IF EXISTS users;

CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,  -- AUTO_INCREMENT helyesen
  name VARCHAR(255),                  -- VARCHAR a TEXT helyett
  email VARCHAR(255)
);

-- Példa adatok beszúrása
INSERT INTO users (name, email) VALUES ('John Doe', 'john.doe@example.com');
INSERT INTO users (name, email) VALUES ('Jane Smith', 'jane.smith@example.com');
INSERT INTO users (name, email) VALUES ('Sam Johnson', 'sam.johnson@example.com');

SELECT * FROM users;

SELECT * FROM users WHERE id = ?;

INSERT INTO users (name, email) VALUES (?, ?);

UPDATE users SET name = ?, email = ? WHERE id = ?;

DELETE FROM users WHERE id = ?;