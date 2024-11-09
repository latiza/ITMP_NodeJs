# 3. modul elméleti áttekintés és demo - Adatbázis és Prisma

- Adatok kezelése a backendben
- SQLite adatbázis kezelése
- CRUD műveletek SQLite-ban: demó
- Egyéb adatbázis driver-ek használata
- ORM-ek használata

## Adatok kezelése a backendben

- **Miért van szükség adatbázisra?**: Az adatbázisok biztosítják az alkalmazásban használt adatok tartós tárolását.

- **Adatbázis integráció a backendünkbe**: A backend szerepe, hogy a kliens kérésére adatokat biztosítson, feldolgozzon vagy módosítson. Az Express-hez adatbázis kapcsolódást azért építünk ki, hogy a felhasználók kérései által létrehozott vagy módosított adatokat elmenthessük és feldolgozhassuk az adatbázisban. Az API-n keresztül történő kommunikáció révén biztonságosan érhetjük el és kezelhetjük az adatokat.

## SQLite adatbázis kezelése

- **Miért SQLite?**: Az SQLite kiváló választás kisebb alkalmazásokhoz vagy oktatási célokra, mert egy könnyen kezelhető, fájl alapú adatbázis, amely telepítés nélkül, helyben futtatható. Emiatt gyorsan tesztelhető, és nem igényel bonyolult beállításokat.

- **Telepítés és kapcsolat beállítása**:
  - Nyissuk meg a terminált, és futtassuk a következő parancsot: `npm install sqlite3`
  - Hozzunk létre egy adatbázis kapcsolatot:
  ```js
  const sqlite3 = require("sqlite3").verbose();
  const db = new sqlite3.Database("./database.sqlite");
  ```
  - Ez a kód egy `database.sqlite` nevű fájlt hoz létre, ha még nem létezik. Az adatainkat ebben a fájlban fogjuk tárolni.

## CRUD műveletek SQLite-ban: demó

## Egyéb adatbázis driverek használata

- **MySQL használata nagyobb alkalmazásokban**: Bár az SQLite egyszerű és gyorsan beállítható, nagyobb alkalmazásokhoz a MySQL hatékonyabb megoldást kínál. A `mysql2` csomag modern és optimalizált támogatást nyújt a MySQL adatbázisok kezeléséhez a Node.js-ben, amely fejlettebb funkciókat és aszinkron működést biztosít az adatkezelés során.

  - Először telepítsük a MySQL2 csomagot:: `npm install mysql2`
  - Miután telepítettük, hozzuk létre a kapcsolatot egy MySQL adatbázissal. Példa kapcsolódás:

  ```js
  const mysql = require("mysql2");

  // Adatbázis kapcsolat létrehozása
  const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "itmp",
  });

  // Kapcsolódás ellenőrzése
  connection.connect((err) => {
    if (err) {
      console.error("Hiba a kapcsolat létrehozásakor:", err);
      return;
    }
    console.log("Sikeresen kapcsolódtunk a MySQL adatbázishoz.");
  });
  ```

  - Példa INSERT:

  ```js
  connection
    .promise()
    .query("INSERT INTO users (name, email) VALUES (?, ?)", [
      "John Doe",
      "john@example.com",
    ])
    .then(([result]) => {
      console.log("Felhasználó sikeresen hozzáadva:", result);
    })
    .catch((err) => {
      console.error("Hiba a felhasználó hozzáadásakor:", err);
    });
  ```

## ORM-ek használata

- **Mi az ORM és miért hasznos?**: Az ORM, vagyis Object-Relational Mapping, egy olyan technológia, amely az adatbázis-kezelést könnyíti meg. Az ORM-ek lehetővé teszik, hogy az adatbázis objektumokat és adatokat könnyedén kezeljük a kódunkban. Az SQL helyett objektumokkal dolgozunk, amit az ORM a háttérben SQL-lekérdezésekké alakít. Ezáltal egyszerűbbé válik a kód olvasása, karbantartása és fejlesztése.

- **Prisma min ORM**: A Prisma egy modern, nyílt forráskódú ORM, amely egyszerűvé és átláthatóvá teszi az adatbázis integrációt.

  - **Type safe**: A Prisma támogatja a TypeScript nyelvet, ami típusbiztonságot nyújt a fejlesztés során. Így a kódunkban hamarabb észrevehetjük a hibákat, ami különösen hasznos nagyobb projekteknél.
  - **Automatikus adatmodell generálás**: A Prisma képes a meglévő adatbázis szerkezetéből kiindulva automatikusan generálni egy adatmodellt, amellyel rögtön dolgozni kezdhetünk. Ez lerövidíti az előkészítési időt.
  - **Egyszerű szinkronizáció és migrációk kezelése**: Ha az adatbázisban változtatásokat végzünk (például új oszlopokat adunk hozzá egy táblához), a Prisma migrációs rendszerével könnyen követhető és kezelhető a változás. Ez biztosítja, hogy az adatbázis és a kód mindig szinkronban maradjanak.

  - **Mikor érdemes használni?**: A Prisma kiváló választás, ha egy fejlettebb és hosszabb élettartamú projektet építünk, ahol a típusbiztonság, az olvashatóság és a könnyű karbantarthatóság fontos. A Prisma egyszerűsíti az adatkezelést, így gyorsabban és kevesebb hibával dolgozhatunk, különösen olyan rendszereknél, ahol többféle adatbázist kell támogatni.
