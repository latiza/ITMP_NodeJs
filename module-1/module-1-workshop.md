# 1. modul workshop - Node.js telepítése, egyszerű express project létrehozása

- Node.js telepítése
- Projekt inicializálása
- Express telepítése
- Express szerver és egy GET endpoint létrehozása

> [!NOTE]  
> **Cél:**  
> Minden szükséges eszköz telepítve legyen a számítógépen: Node.js, NPM, Visual Studio Code. Legyen létrehozva egy Node.js projekt, az express telepítve legyen. Értenünk kell egy Node.js projekt felépítését, valamint azt, hogy milyen fájlokat tartalmaz. Ismerkedjünk az express-szel, egy egyszerű GET endpointot és hozzunk létre.

<hr />

## Node.js telepítése

- Telepítsd a Node.js-t [innen](https://nodejs.org/en)
- Ellenőrizd, hogy sikeresen települt-e:

  ```sh
  node -v
  npm -v
  ```

- Ha nincs feltelepítve [Visual Studio Code](https://code.visualstudio.com/), akkor azt is telepítsd!

## Projekt inicializálása

- Készíts egy mappát a számítógépeden, ahova majd a projektfájlok fognak kerülni. Ezt a mappát nyisd meg VS Code-ban.
- Nyiss egy terminált, ami ebbe a mappába mutat. A legegyszerűbb VS Code-ban: **View > Terminal**
- Add ki az `npm init -y` parancsot. Ha elahogyod a `-y` flaget, akkor fel fog tenni pár kérdést a projekttel kapcsolatban, ezt is kipróbálhatod. (`npm init`) Ha egyszer már inicializálva lett a projekt ezzel a paranccsal, akkor többször már nem kell kiadni.

## Express telepítése

Telepítsd az express NPM package-t az `npm install express` paranccsal

## Express szerver és egy GET endpoint létrehozása

Készíts egy index.js fájlt a következő tartalommal:

```js
const express = require("express");
const app = express();

app.get("/itmp", (req, res) => {
  res.send("Hello ITMP!");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
```

Hozz még létre további **2** endpointot az alábbiak szerint:

- `/nodejs`
  - Visszaad egy stringet: `"A Node.js egy olyan szerveroldali JavaScript futtatókörnyezet, amely a V8 JavaScript motorra épül."`
- `/express`
  - Visszaad egy stringet: `"Az Express egy minimalista webes keretrendszer, amely a Node.js-hez készült."`

<br/>

A kész fájlt futtasd a `node index.js` parancs segítségével. Ha mindent jól csináltál, akkor a konzolon ki lesz írva a `console.log`-ban látott üzenet.  
Az app ezután elérhető lesz a `http://localhost:3000` címen.

Próbáld értelmezni, hogy melyik sor mit csinál. Ha elakadsz, fordulj a mentorodhoz!

## Legenerált projektfájlok tanulmányozása

Az `npm init` valamint az `npm install` parancsok legeneráltak nekünk mindenféle fájlokat és mappákat (`package.json`, `pacakge-lock.json`, `node_modules`). Nézd meg és tanulmányozd ezeket az állományokat. Gondold végig, hogy az egyes állományoknak mi a szerepe. Ha valamiben nem vagy biztos, akkor kérd a mentorod segítségét!

## BÓNUSZ

A [`/module-1/assets/index.html`](./assets/index.html) elérési úton találsz egy `index.html` fájlt. Ezt a fájlt szolgáld ki express segítségével!  
A projektedben készíts egy `public` mappát, amibe másold bele ezt az `index.html`-t. A fájl tartalmán ne módosíts!

Ha ez megvan, a legelső endpoint elé másold be az alábbi sort:

```js
app.use("/", express.static("public"));
```

Indítsd újra az Express szervert, majd teszteld úgy, hogy a [http://localhost:3000/](http://localhost:3000/) URL-re navigálsz.

Tanulmányozd ezt az `index.html` fájlt, hogy hogyan fetch-eli le a szerverről az endpointokat!
