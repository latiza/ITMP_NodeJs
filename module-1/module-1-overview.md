# 1. modul elméleti áttekintés - Bevezetés a Node.js-be

- Node.js és NPM alapok
- NPM
- Bevezetés a backendbe, REST
- CORS
- ExpressJS bevezetés
- Alkalmazás futtatása Node.js-sel

## Node.js alapok

- **Mi az a Node.js?**: Node.js egy szerveroldali JavaScript runtime környezet. Lehetővé teszi, hogy JavaScript-ben szerveroldali kódot írjunk és futtassunk, melynek köszönhetően ugyanazt a nyelvet használhatjuk frontend és backend oldalon.

- **Node.js telepítése**:

  - Telepítsük a Node.js LTS verzióját a [https://nodejs.org/en](https://nodejs.org/en) oldalról
  - Ellenőrizhetjük a `node -v` paranccsal

- **Node.js felhasználási területei**: Kiemelném, hogy a Node.js nemcsak backend REST API-k készítésére használható, hanem:

  - Parancssori eszközök létrehozására (CLI),
  - Valós idejű alkalmazások (chat applikációk),
  - Különböző scriptek
  - Web Appok

- **A kurzus fókusza: REST API backend készítés Express használatával**: Bár a Node.js széles körben használható, ezen a kurzuson a REST API fejlesztésére koncentrálunk az Express keretrendszer segítségével. (Hogy mi az Express és a REST API, arról később)

## NPM

- **Mi az NPM?**:

  - Node Package Manager
  - Az NPM a Node.js csomagkezelője, amely segítségével más fejlesztők által írt csomagokat használhatunk újra. Ezáltal nem szükséges mindent nulláról írni.
  - A Node.js telepítésekor az NPM automatikusan települ

- **Csomagok kezelése és telepítése**:

  - `npm init` – egy új projekt inicializálása, ami létrehozza a projekt csomagkezelő fájlját, a `package.json`-t. Fel fog tenni kérdéseket (projekt név, leírás, stb.), de az `npm init -y` flaggel ez átugorható, és alapértelmezett értékeket fog használni. Ezek aztán belekerülnek a `package.json`-ba.
  - A `package.json`-t manifesztként használjuk, amely információkat tárol az alkalmazásról, modulokról és csomagokról.
  - `npm install <name>` - csomagok telepítése, később látunk rá példát. Rövidítése `npm i`.
  - `package-lock.json`: A package-lock.json biztosítja, hogy a projekt minden függősége ugyanazon a verzión maradjon, ahogy azt eredetileg telepítették, így garantálva a stabil működést és elkerülve a verzióváltozásból adódó hibákat.
  - `node_modules`: A node_modules mappa tárolja a projekt minden szükséges külső csomagját és azok függőségeit, így az alkalmazás ezekre támaszkodhat a futás során.

- **Globális csomagok (-g)**: A -g flag használatával globálisan telepíthetünk csomagokat

## Példa az `npm init` parancsra és a `package.json` fájlra

<details>
<summary>Nyiss le a példáért!</summary>

### `npm init` példa:

```
$ npm init
This utility will walk you through creating a package.json file.
It only covers the most common items, and tries to guess sensible defaults.

See `npm help init` for definitive documentation on these fields
and exactly what they do.

Use `npm install <pkg>` afterwards to install a package and
save it as a dependency in the package.json file.

Press ^C at any time to quit.
package name: (test) test
version: (1.0.0)
description: Leiras
entry point: (index.js) main.js
test command:
git repository:
keywords: ITMP, almafa, kiscica
author: Oliver
license: (ISC) MIT
About to write to D:\path\to\itmp-nodejs-basics\test\package.json:

{
  "name": "test",
  "version": "1.0.0",
  "description": "Leiras",
  "main": "main.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [
    "ITMP",
    "almafa",
    "kiscica"
  ],
  "author": "Oliver",
  "license": "MIT"
}


Is this OK? (yes) yes
```

### `package.json` példa:

```json
{
  "name": "test",
  "version": "1.0.0",
  "description": "Leiras",
  "main": "main.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": ["ITMP", "almafa", "kiscica"],
  "author": "Oliver",
  "license": "MIT"
}
```

</details>

Mint fentebb említettem, nem kell válaszolnunk a kérdésekre, ha kiadjuk a `-y` flaget.  
Ezek igazábol csak **metaadatok**. Nekünk ezek nem olyan fontosak. Ezek leginkább akkor kellenek, ha npm csomagot publikálunk. A leginkább fontos dolog itt a `"scripts"` tömb. Később látunk példát.  
A package-lock.json-nal és a node_modules-szal pedig szinte soha nem kell foglalkoznunk.

## Backend, REST

- **Mi az a backend?**: A backend tulajdonképpen a szerveroldal, amely feldolgozza a kéréseket, adatokat kezel, és választ ad a frontendnek. A felhasználó számára ez nem látható.

- **Hogyan kommunikál a frontend és a backend?**: A mi esetünkben a frontend HTTP kéréseket küld a backendhez, amely ezekre válaszol (pl. adatokat ad vissza vagy feldolgozza a felhasználói bemenetet).

- **REST API**:

  - A REST (Representational State Transfer) egy architektúra, amelyet webszolgáltatások létrehozására használunk. Egyszerűen HTTP kérésekkel dolgozik (GET, POST, PUT, DELETE).
  - API: Application Programming Interface – egy interfész, amellyel a kliensek kommunikálnak a szerverrel.
  - Most tulajdonképpen egy ilyen REST API-t fogunk készíteni.

- **JSON**: Egy egyszerű, szöveges adatformátum, amelyet adatok strukturált tárolására és átvitelére használnak, kulcs-érték párok formájában. A REST API-k JSON formátumot használnak az adatok küldésére és fogadására, mivel könnyen olvasható, és jól támogatott a legtöbb programozási nyelvben.

- **HTTP metódusok: GET, POST, PUT, DELETE**:
  - Ezekkel mondjuk el, hogy milyen típusú műveletet fogunk végrehajtani. Ezek határozzák meg, hogy a szerver hogyan kezelje a kéréseket az adott erőforrásokkal:
  - GET: Adatok lekérése (pl. egy felhasználó adatainak megjelenítése)
  - POST: Új adat létrehozása (pl. új felhasználó létrehozása)
  - PUT: Létező adat módosítása (pl. felhasználó adatainak szerkesztése)
  - DELETE: Adat törlése (pl. felhasználó törlése)
  - A REST-ben kulcsszerepet játszanak, hiszen a REST API-kat úgy tervezik, hogy ezekkel a szabványos HTTP metódusokkal vezéreljék az adatkezelést, így egyszerű, érthető és szabványosított felületeket kínálnak a kliens-szerver kommunikációhoz.

## ExpressJS bevezetés

- **Mi az Express?**: Az Express egy minimalista és flexibilis library, amely megkönnyíti az API-k fejlesztését Node.js-ben. Segít a route-ok, middleware-ek, és HTTP metódusok kezelésében. A 2. modulban fogunk látni nagyobb példát.

- **Node.js project inicializálása**: Hozzunk létre egy mappát a számítógépünkön, majd nyissuk meg VS Code-ban, vagy valamilyen más editorban. A mappában adjuk ki az `npm init -y` parancsot.

- **Express telepítése NPM-mel**: A firssen inicializált projektünkben futtassuk az `npm install express` parancsot

- **Express szerver létrehozása**: Hozzunk létre egy index.js fájlt, aminek a tartalma legyen a következő:

  ```js
  const express = require("express");
  const app = express();

  app.get("/", (req, res) => {
    res.send("Hello ITMP!");
  });

  app.listen(3000, () => {
    console.log("Server is running on port 3000");
  });
  ```

## CORS

- **Mi az a CORS (Cross-Origin Resource Sharing)?**: A CORS egy mechanizmus, amely lehetővé teszi, hogy az egyik domainről érkező JavaScript kód másik domainen lévő erőforrásokhoz férjen hozzá. Például, ha egy frontend alkalmazás (pl. http://localhost:3000) adatokat kér egy backend API-ból (http://localhost:5000), akkor a CORS-nak megfelelően kell konfigurálni a backend-et.

- **Miért van korlátozva a cross-origin hozzáférés?**: A böngészők alapértelmezésben blokkolják a cross-origin kéréseket, hogy megvédjék a felhasználókat az esetleges biztonsági problémáktól, például a CSRF támadásoktól. Ezek a támadások kihasználhatják, hogy a webalkalmazások különböző forrásokból kérnek erőforrásokat.

- **CORS beállítása Express-ben**:

  - Az Express-ben egy egyszerű mód a CORS engedélyezésére a cors csomag használata. A csomag telepítése: `npm i cors`
  - Miután telepítettük, hozzá kell adnunk middleware-ként:
  - ```js
    const express = require("express");
    const cors = require("cors");
    const app = express();

    app.use(cors());
    ```

  - Finomhangolás: A `cors()` middleware paraméterekkel beállítható, hogy mely domainek férhetnek hozzá az API-hoz. Példa:
  - ```js
    app.use(
      cors({
        origin: "http://localhost:3000",
      })
    );
    ```

## Alkalmazás futtatása Node.js-sel

- `node <filename>`
- Kiterjesztés `(.js)` elhagyható
- Ha módosítunk a kódon, akkor újra kell indítani (megoldás később)
- Kilépni a `Ctrl+C` billentyűkombóval lehet
- Ha nem egy Expresses alkalmazásról van szó, tehát az alkalmazás nem fut "örökre", akkor csak szimplán végrehajtja az utasításokat. Például egy egyszerű egy soros `console.log`.
