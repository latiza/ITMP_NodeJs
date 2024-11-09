const express = require("express");
const app = express();

const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./database.sqlite");

let users = [
  {
    id: "1",
    name: "John Doe",
    email: "john.doe@example.com",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane.smith@example.com",
  },
  {
    id: "3",
    name: "Sam Johnson",
    email: "sam.johnson@example.com",
  },
];

db.serialize(() => {
  db.run("DROP TABLE IF EXISTS users"); // never do this in production
  db.run(
    "CREATE TABLE users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, email TEXT)"
  );

  for (const i of users) {
    db.run("INSERT INTO users (name, email) VALUES (?, ?)", [i.name, i.email]);
  }
});

app.use(express.json());

app.get("/api/users", (req, res) => {
  db.all("SELECT * FROM users", (err, users) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    }

    res.json(users);
  });
});

app.get("/api/users/:id", (req, res) => {
  const id = req.params.id;
  db.get("SELECT * FROM users WHERE id = ?", [id], (err, user) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    }

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  });
});

app.post("/api/users", (req, res) => {
  db.run(
    "INSERT INTO users (name, email) VALUES (?, ?)",
    [req.body.name, req.body.email],
    function (err) {
      if (err) {
        return res.status(500).json({ message: err.message });
      }

      res.status(201).json({ ...req.body, id: this.lastID });
    }
  );
});

app.put("/api/users/:id", (req, res) => {
  const id = req.params.id;

  db.run(
    "UPDATE users SET name = ?, email = ? WHERE id = ?",
    [req.body.name, req.body.email, id],
    function (err) {
      if (err) {
        return res.status(500).json({ message: err.message });
      }

      res.json({ ...req.body, id: Number(id) });
    }
  );
});

app.delete("/api/users/:id", (req, res) => {
  const id = req.params.id;

  db.run("DELETE FROM users WHERE id = ?", [id], function (err) {
    if (err) {
      return res.status(500).json({ message: err.message });
    }

    res.sendStatus(204);
  });
});

app.listen(3000, () => console.log("The app is running on port 3000!"));
