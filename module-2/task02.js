// Express keretrendszer könyvtárának importálása, ha már telepítetted
const express = require("express");
//Express új példányának létrehozása 
const app = express();
const port = 3000;

// JSON adatok kezeléséhez szükséges middleware beállítása
app.use(express.json());

// Statikus fájlok kiszolgálása a 'public' mappából
app.use(express.static("public"));

// Felhasználók listája - a felhasználók adatait itt tároljuk memóriában
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

// GET /api/users -> fontos konvenció, hogy végpontokat /api -val hozzuk létre!
// Az összes felhasználó kilistázása
app.get("/api/users", (req, res) => {
  console.log("GET /api/users endpoint meghívva"); // Ellenőrizzük, hogy az endpoint meghívódott-e
  res.status(200).json(users); // Válaszként küldjük az összes felhasználót
  console.log("Válasz JSON formátumban elküldve az összes felhasználóval.");
});

// GET /api/users/:id itt id alapján le tudjuk kérni felhasználók adatit 
//pl: http://localhost:3000/api/users/1
// Egy konkrét felhasználó adatainak lekérdezése az ID alapján
app.get("/api/users/:id", (req, res) => {
  console.log(`GET /api/users/${req.params.id} endpoint meghívva`); // Az ID-t kiírjuk a teszteléshez
  const user = users.find((u) => u.id === req.params.id); // Felhasználó keresése ID alapján
  if (user) {
    console.log("Felhasználó megtalálva:", user); // Megtalált felhasználó adatai
    res.status(200).json(user); // Válaszként küldjük a felhasználót
  } else {
    console.log("Felhasználó nem található az adott ID-val."); // Ha nincs ilyen ID, hibát küldünk
    res.status(404).json({ message: "Felhasználó nem található." });
  }
});

// **POST /api/users**
// Új felhasználó létrehozása a kérés törzséből érkező adatok alapján
app.post("/api/users", (req, res) => {
  console.log("POST /api/users endpoint meghívva"); // Az endpoint meghívását ellenőrizzük
  console.log("Kérés törzse:", req.body); // A beérkezett adatok ellenőrzése
  const newUser = {
    id: String(users.length + 1), // Egyedi ID létrehozása a tömb hossza alapján
    name: req.body.name,
    email: req.body.email,
  };
  users.push(newUser); // Új felhasználó hozzáadása a users tömbhöz
  console.log("Új felhasználó létrehozva:", newUser); // Az új felhasználó adatai
  res.status(201).json(newUser); // Sikeres létrehozás válasza
});

// **PUT /api/users/:id**
// Meglévő felhasználó adatainak frissítése az ID alapján
app.put("/api/users/:id", (req, res) => {
  console.log(`PUT /api/users/${req.params.id} endpoint meghívva`); // Az endpoint és ID ellenőrzése
  console.log("Frissítési adatok:", req.body); // Az új adatok ellenőrzése
  const userIndex = users.findIndex((u) => u.id === req.params.id); // Felhasználó indexének keresése
  if (userIndex !== -1) {
    users[userIndex] = { ...users[userIndex], ...req.body }; // Frissítjük a felhasználó adatait
    console.log("Felhasználó frissítve:", users[userIndex]); // A frissített felhasználó adatai
    res.status(200).json(users[userIndex]); // Sikeres frissítés válasza
  } else {
    console.log("Felhasználó nem található az adott ID-val."); // Ha nincs ilyen ID, hibát küldünk
    res.status(404).json({ message: "Felhasználó nem található." });
  }
});

// **DELETE /api/users/:id**
// Felhasználó törlése az ID alapján
app.delete("/api/users/:id", (req, res) => {
  console.log(`DELETE /api/users/${req.params.id} endpoint meghívva`); // Az endpoint és ID ellenőrzése
  const initialLength = users.length; // Eredeti tömb hosszának mentése
  users = users.filter((u) => u.id !== req.params.id); // Felhasználó törlése a tömbből
  if (users.length < initialLength) {
    console.log(`Felhasználó törölve az ID alapján: ${req.params.id}`); // Törlés visszaigazolása
    res.sendStatus(204); // Sikeres törlés, státuszkód: 204 (Nincs tartalom)
  } else {
    console.log("Felhasználó nem található az adott ID-val, törlés nem lehetséges."); // Ha nincs ilyen ID, hibát küldünk
    res.status(404).json({ message: "Felhasználó nem található." });
  }
});

// A szerver elindítása a megadott porton
app.listen(port, () => {
  console.log(`A szerver fut: http://localhost:${port}/api/users`);
  console.log("A szerver készen áll a kérések fogadására.");
});

//frontend kezelés
/*app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});*/
