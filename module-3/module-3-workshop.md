# 3. modul workshop - Adatbázist a backendünknek!

- Projekt inicializálása
- SQLite adatbázis telepítés, létrehozás
- CRUD műveletek SQLite-tal

> [!NOTE]  
> **Cél:**  
> A 2. modulból kiindulva átalakítsuk a kódot úgy, hogy minden adat SQLite adatbázisban legyen tárolva.

<hr />

> [!IMPORTANT]  
> Minden szükséges SQL parancs megtalálható a [`queries.sql`](./queries.sql) fájlban.

## Projekt inicializálása

- Hozz létre egy mappát a projektnek
- Másold át a [`/module-2/workshop-solution`](../module-2/workshop-solution/) mappa tartalmát ebbe a mappába. **A `node_modules` mappát ne másold!**
- Az új mappában nyiss egy terminált, majd futtasd az `npm i` parancsot. Ez a parancs a már meglévő `package.json` alapján fel fogja tenni a függőségeket.

## SQLite adatbázis telepítés, létrehozás

- Első lépésként telepíteni kell az `sqlite3` npm csomagot. Ezt az `npm i sqlite3` paranccsal tudod megtenni. ([npmjs.com](https://www.npmjs.com/package/sqlite3))
- A fájlunk tetején az importok alatt hozzuk létre az adatbáziskapcsolatot:
  - ```js
    const sqlite3 = require("sqlite3").verbose();
    const db = new sqlite3.Database("./database.sqlite");
    ```
- Ha a kapcsolatunk él, **szerializáljuk az adatbázist:** hozzuk létre a users táblát és insertáljunk 3 usert a már megadott tömbön végigiterálva.  
  A `db.serialize(() => {...})` ([Doksi](https://github.com/TryGhost/node-sqlite3/wiki/Control-Flow#databaseserializecallback)) fogad paraméterben egy callback függvényt, amiben a `db.run()` ([Doksi](https://github.com/TryGhost/node-sqlite3/wiki/API#runparam---callback)) függvényeket kell majd meghívni, aminek paraméterben átadjuk az SQL parancsokat.

<details>
<summary>Nyiss le a megoldásért!</summary>

```js
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./database.sqlite");

const users = [
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
  db.run("DROP TABLE IF EXISTS users");
  db.run(
    "CREATE TABLE users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, email TEXT)"
  );

  for (const i of users) {
    db.run("INSERT INTO users (name, email) VALUES (?, ?)", [i.name, i.email]);
  }
});
```

</details>

## CRUD műveletek SQLite-tal

- Továbbra is az alábbi endpointjaink vannak:

  - **GET** `/api/users` - Az összes felhasználó kilistázása
  - **GET** `/api/users/:id` - 1 felhasználó visszaadása
  - **POST** `/api/users` - Felhasználó létrehozása
  - **PUT** `/api/users/:id` - Felhasználó szerkesztése
  - **DELETE** `/api/users/:id` - Felhasználó törlése

- Az alábbi `sqlite3` függvényekre lesz szükség:

  - `db.all()` - [Doksi](https://github.com/TryGhost/node-sqlite3/wiki/API#allparam---callback)
  - `db.get()` - [Doksi](https://github.com/TryGhost/node-sqlite3/wiki/API#getparam---callback)
  - `db.run()` - [Doksi](https://github.com/TryGhost/node-sqlite3/wiki/API#runparam---callback)

Módosítsd a meglévő kódot úgy, hogy minden endpoint adatbázist használjon! Figyelj arra, hogy a funkcionalitás ne változzon!

<details>
<summary>Nyiss le segítségért!</summary>

### Melyik endpointhoz mi kell?

- **GET** `/api/users` - `db.all()`
- **GET** `/api/users/:id` - `db.get()`
- **POST** `/api/users` - `db.run()`
- **PUT** `/api/users/:id` - `db.run()`
- **DELETE** `/api/users/:id` - `db.run()`

### Példák:

```js
// Adatbázisból több rekordot kérünk le
db.all("SELECT * FROM table", (err, result) => {
  if (err) {
    // Error
  }

  // Success
});

// Adatbázisból 1 rekordot szeretnénk
db.get("SELECT * FROM table WHERE id = ?", [id], (err, result) => {
  if (err) {
    // Error
  }

  if (!result) {
    // No result found
  }

  // Success
});

// INSERT, UPDATE és DELETE queryknél használjuk.
db.run("INSERT INTO table (field1) VALUES (?)", [field1Value], function (err) {
  if (err) {
    // Error
  }

  // Success
  // lastId: this.lastID
});
```

</details>

<br />

A megoldást a [`/module-3/workshop-solution`](./workshop-solution/) mappában találod.
