# 2. modul workshop - Node.js és Express CRUD alkalmazás elkészítése

- A bemutatott CRUD alkalmazás elkészítése
- Az elkészített API tesztelése a Thunder Client bővítménnyel

> [!NOTE]  
> **Cél:**  
> Az 1. modulból kiindulva hozzuk létre a lent definiált CRUD endpointokat, amik felhasználókat kezelnek. Az adatokat tároljuk memóriában egy tömbben, és JavaScript függvényekkel manipuláljuk őket. A Thunder Client VS Code bővítménnyel teszteljük a végpontokat.

<hr />

## CRUD alkalmazás elkészítése

Készítsd el a 2. modulban elkészített CRUD alkalmazást!

- Ezek az endpointok kellenek:

  - **GET** `/api/users`
    - Az összes felhasználó kilistázása
    - Sikeres kérés esetén 200-as státuszkód
  - **GET** `/api/users/:id`
    - 1 felhasználó visszaadása
    - Sikeres kérés esetén 200-as státuszkód
  - **POST** `/api/users`
    - Felhasználó létrehozása
    - Sikeres kérés esetén 201-es státuszkód
  - **PUT** `/api/users/:id`
    - Felhasználó szerkesztése
    - Sikeres kérés esetén 200-as státuszkód
  - **DELETE** `/api/users/:id`
    - Felhasználó törlése
    - Sikeres kérés esetén 204-es státuszkód

- Nyisd meg az 1. modul megoldását. Ha gondolod, előbb készíts róla másolatot, hogy később is meglegyen.
- Készítsd el ezt az 5 endpointot. Már van egy endpoint példa az 1. modul megoldásában, amit nyugodtan kitörölhetsz:

  - ```js
    app.get("/", (req, res) => {
      res.send("Hello World!");
    });
    ```

- Itt egy `users` tömb kezdésnek:

  - ```js
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
    ```

### A megoldáshoz elérhető néhány segítség:

<details>
<summary>1. segítség: endpointok definiálása</summary>

```js
// GET
app.get("/", (req, res) => {});

// POST
app.post("/", (req, res) => {});

// PUT
app.put("/", (req, res) => {});

// DELETE
app.dELETE("/", (req, res) => {});
```

</details>

<details>
<summary>2. segítség: JSON és státuszkód visszaküldése válaszként</summary>

```js
// Csak JSON:
res.json(xxx);

// JSON és státuszkód:
res.status(201).json(xxx);

// Csak státuszkód:
res.sendStatus(204);
```

</details>

<details>
<summary>3. segítség: paraméter fogadása az URL-ben</summary>

```js
app.get("/api/users/:id", (req, res) => {
  const id = req.params.id; // Az URL-ben a :id mint név és ez a név megegyezik
});

// Másik példa:
app.get("/api/users/:slug", (req, res) => {
  const slug = req.params.slug;
});
```

</details>

<details>
<summary>4. segítség: create, update, delete műveletek a users tömbben - példa</summary>

```js
// create:
users.push({
  name: "Teszt Elek",
  email: "teszti@example.com",
  id: crypto.randomUUID(),
});

// update:
const id = 1;
const updatedUser = {
  id,
  name: "Teszt Elek",
  email: "teszti@example.com",
};
users = users.map((u) => (u.id === id ? updatedUser : u));

// delete
const id = 1;
users = users.filter((x) => x.id !== id);
```

</details>

<br />

Továbbá bátran kérd a mentorok segítségét, vagy nézd meg a megoldást a [`module-2/workshop-solution`](./workshop-solution) mappában, ha teljesen elakadtál!

## API tesztelése

- Telepítsd a Thunder Client extension-t a VS Code-ba: [https://marketplace.visualstudio.com/items?itemName=rangav.vscode-thunder-client](https://marketplace.visualstudio.com/items?itemName=rangav.vscode-thunder-client)
- Teszteld az elkészített endpointokat Thunder Client-tel
