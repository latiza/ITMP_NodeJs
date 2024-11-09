const express = require("express");
const sqlite3 = require("sqlite3").verbose();

const app = express();
const PORT = 3000;

// Adatbázis kapcsolat létrehozása és inicializálása
const db = new sqlite3.Database("./database.sqlite", (err) => {
  if (err) {
    return console.error("Hiba történt az adatbázis megnyitásakor:", err.message);
  }
  console.log("Kapcsolódva az SQLite adatbázishoz.");
});

// Alapértelmezett felhasználói adatok (csak egyszeri inicializáláshoz)
const initialUsers = [
  { name: "John Doe", email: "john.doe@example.com" },
  { name: "Jane Smith", email: "jane.smith@example.com" },
  { name: "Sam Johnson", email: "sam.johnson@example.com" },
];

// Adatbázis inicializálása: tábla létrehozása és alapértelmezett adatok feltöltése
function initDatabase() {
  db.serialize(() => {
    db.run("DROP TABLE IF EXISTS users"); // Ezt sose használd produkciós környezetben!
    db.run("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, email TEXT)");

    const insertUserStmt = db.prepare("INSERT INTO users (name, email) VALUES (?, ?)");
    initialUsers.forEach(user => {
      insertUserStmt.run(user.name, user.email);
    });
    insertUserStmt.finalize();
    console.log("Alapértelmezett adatok hozzáadva az adatbázishoz.");
  });
}

// Alapértelmezett JSON köztes réteg (middleware) a JSON formátumú kérések kezelésére
app.use(express.json());

// Összes felhasználó lekérése
app.get("/api/users", (req, res) => {
  db.all("SELECT * FROM users", (err, users) => {
    if (err) {
      console.error("Hiba történt a felhasználók lekérése közben:", err.message);
      return res.status(500).json({ message: "Belső szerver hiba" });
    }
    res.json(users);
  });
});

// Felhasználó lekérése ID alapján
app.get("/api/users/:id", (req, res) => {
  const id = req.params.id;
  db.get("SELECT * FROM users WHERE id = ?", [id], (err, user) => {
    if (err) {
      console.error(`Hiba történt a felhasználó (${id}) lekérése közben:`, err.message);
      return res.status(500).json({ message: "Belső szerver hiba" });
    }
    if (!user) {
      return res.status(404).json({ message: "Felhasználó nem található" });
    }
    res.json(user);
  });
});

// Új felhasználó létrehozása
app.post("/api/users", (req, res) => {
  const { name, email } = req.body;
  db.run("INSERT INTO users (name, email) VALUES (?, ?)", [name, email], function (err) {
    if (err) {
      console.error("Hiba történt a felhasználó létrehozásakor:", err.message);
      return res.status(500).json({ message: "Belső szerver hiba" });
    }
    res.status(201).json({ id: this.lastID, name, email });
  });
});

// Felhasználó frissítése ID alapján
app.put("/api/users/:id", (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;

  db.run("UPDATE users SET name = ?, email = ? WHERE id = ?", [name, email, id], function (err) {
    if (err) {
      console.error(`Hiba történt a felhasználó (${id}) frissítése közben:`, err.message);
      return res.status(500).json({ message: "Belső szerver hiba" });
    }
    if (this.changes === 0) {
      return res.status(404).json({ message: "Felhasználó nem található" });
    }
    res.json({ id: Number(id), name, email });
  });
});

// Felhasználó törlése ID alapján
app.delete("/api/users/:id", (req, res) => {
  const { id } = req.params;

  db.run("DELETE FROM users WHERE id = ?", [id], function (err) {
    if (err) {
      console.error(`Hiba történt a felhasználó (${id}) törlése közben:`, err.message);
      return res.status(500).json({ message: "Belső szerver hiba" });
    }
    if (this.changes === 0) {
      return res.status(404).json({ message: "Felhasználó nem található" });
    }
    res.sendStatus(204);
  });
});

// Adatbázis inicializálása és szerver indítása
initDatabase();
app.listen(PORT, () => console.log(`Az alkalmazás fut a ${PORT} porton.`));

// A folyamat leállításakor az adatbáziskapcsolat bezárása
process.on("SIGINT", () => {
  db.close((err) => {
    if (err) {
      console.error("Hiba történt az adatbázis bezárásakor:", err.message);
    }
    console.log("Kapcsolat az adatbázissal bezárva.");
    process.exit(0);
  });
});
