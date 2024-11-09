// A 'mysql2' modul importálása
const mysql = require("mysql2");
const express = require("express");
const app = express();
const port = 3000; // Szerver port beállítása

// MySQL adatbázis kapcsolat létrehozása
const connection = mysql.createConnection({
  host: "localhost", // A MySQL szerver címe
  user: "root", // Alapértelmezett MySQL felhasználó
  password: "", // Jelszó üresen hagyva (ha nincs beállítva jelszó)
  database: "itmp", // Az adatbázis neve, amelyhez kapcsolódunk
});

// Kapcsolódás ellenőrzése
connection.connect((err) => {
  if (err) {
    console.error("Hiba a kapcsolat létrehozásakor:", err.message);
    return;
  }
  console.log("Sikeresen kapcsolódtunk a MySQL adatbázishoz.");
});

// JSON adatok kezeléséhez szükséges középver beállítása
app.use(express.json());

// GET végpont az összes felhasználó lekérdezéséhez
app.get("/api/users", (req, res) => {
  connection.query("SELECT * FROM users", (err, results) => {
    if (err) {
      res.status(500).json({ error: "Hiba történt az adatbázis lekérdezésekor." });
    } else {
      res.json(results);
    }
  });
});

// GET végpont egy felhasználó lekérdezéséhez az ID alapján
app.get("/api/users/:id", (req, res) => {
    const userId = req.params.id;  // Lekérjük az id paramétert az URL-ből
    connection.query("SELECT * FROM users WHERE id = ?", [userId], (err, results) => {
      if (err) {
        res.status(500).json({ error: "Hiba történt az adatbázis lekérdezésekor." });
      } else if (results.length === 0) {
        res.status(404).json({ error: "Felhasználó nem található." });  // Ha nincs találat, 404-et küldünk
      } else {
        res.json(results[0]);  // Visszaküldjük a megtalált felhasználó adatait
      }
    });
  });
  

// POST végpont egy új felhasználó létrehozásához
app.post("/api/users", (req, res) => {
  const { name, email } = req.body;
  const insertQuery = "INSERT INTO users (name, email) VALUES (?, ?)";
  connection.query(insertQuery, [name, email], (err, results) => {
    if (err) {
      res.status(500).json({ error: "Hiba történt a felhasználó beszúrásakor." });
    } else {
      res.status(201).json({ id: results.insertId, name, email });
    }
  });
});

// PUT végpont egy meglévő felhasználó adatainak módosításához
app.put("/api/users/:id", (req, res) => {
  const userId = req.params.id;
  const { name, email } = req.body;
  const updateQuery = "UPDATE users SET name = ?, email = ? WHERE id = ?";
  connection.query(updateQuery, [name, email, userId], (err, results) => {
    if (err) {
      res.status(500).json({ error: "Hiba történt a felhasználó módosításakor." });
    } else if (results.affectedRows === 0) {
      res.status(404).json({ error: "Felhasználó nem található." });
    } else {
      res.json({ message: "Felhasználó sikeresen módosítva.", id: userId, name, email });
    }
  });
});

// DELETE végpont egy felhasználó törléséhez az ID alapján
app.delete("/api/users/:id", (req, res) => {
  const userId = req.params.id;
  const deleteQuery = "DELETE FROM users WHERE id = ?";
  connection.query(deleteQuery, [userId], (err, results) => {
    if (err) {
      res.status(500).json({ error: "Hiba történt a felhasználó törlésekor." });
    } else if (results.affectedRows === 0) {
      res.status(404).json({ error: "Felhasználó nem található." });
    } else {
      res.json({ message: "Felhasználó sikeresen törölve.", id: userId });
    }
  });
});

// Szerver indítása
app.listen(port, () => {
  console.log(`A szerver fut a következő porton: http://localhost:${port}`);
});
