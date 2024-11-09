const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "itmp",
});

connection.connect((err) => {
  if (err) {
    console.error("Kapcsolódási hiba:", err);
  } else {
    console.log("Sikeres kapcsolódás az adatbázishoz!");
  }
  connection.end();
});
