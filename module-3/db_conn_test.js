const sqlite3 = require("sqlite3").verbose();

// Új adatbázis kapcsolat létrehozása
const db = new sqlite3.Database("./database.sqlite", (err) => {
  if (err) {
    console.error("Hiba történt az adatbázis létrehozásakor:", err.message);
  } else {
    console.log("Kapcsolódva az SQLite adatbázishoz.");
  }
});

// A kapcsolat bezárása mivel csak tesztelem 
db.close((err) => {
  if (err) {
    console.error("Hiba történt az adatbázis bezárásakor:", err.message);
  } else {
    console.log("Kapcsolat bezárva.");
  }
});
