// Az API alap URL-je, amely a szerverünk felhasználói végpontját jelöli
const apiUrl = 'http://localhost:3000/api/users';

// Összes felhasználó lekérése és megjelenítése
async function getUsers() {
  console.log("GET / Lekérés indítása..."); // Tesztelési log
  const response = await fetch(apiUrl);
  console.log("GET / Válasz státusza:", response.status); // Válasz státuszának naplózása

  const users = await response.json();
  console.log("GET / Felhasználók listája:", users); // Lekért felhasználók listájának naplózása

  document.getElementById('userList').textContent = JSON.stringify(users, null, 2);
}

// Új felhasználó létrehozása és az adatok mentése a szerverre
async function createUser() {
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  console.log("POST / Új felhasználó létrehozása:", { name, email }); // Tesztelési log az új felhasználó adatairól

  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email })
  });

  console.log("POST / Válasz státusza:", response.status); // Válasz státuszának naplózása

  if (response.status === 201) {
    console.log("POST / Felhasználó sikeresen létrehozva"); // Sikeres létrehozás naplózása
    alert('Felhasználó sikeresen létrehozva');
    getUsers();
  }
}

// Egy adott felhasználó adatainak betöltése szerkesztéshez
async function loadUserForEdit() {
  const userId = document.getElementById('editUserId').value;
  console.log("GET / ID alapján betöltés:", userId); // Tesztelési log a megadott ID-ról

  const response = await fetch(`${apiUrl}/${userId}`);
  console.log("GET / Válasz státusza:", response.status); // Válasz státuszának naplózása

  if (response.ok) {
    const user = await response.json();
    console.log("GET / Betöltött felhasználó:", user); // Betöltött felhasználó adatainak naplózása

    document.getElementById('updateId').value = user.id;
    document.getElementById('updateName').value = user.name;
    document.getElementById('updateEmail').value = user.email;
  } else {
    alert("Felhasználó nem található.");
  }
}

// Egy meglévő felhasználó adatainak frissítése
async function updateUser() {
  const id = document.getElementById('updateId').value;
  const name = document.getElementById('updateName').value;
  const email = document.getElementById('updateEmail').value;
  console.log("PUT / Felhasználó frissítése:", { id, name, email }); // Tesztelési log a frissítendő adatokkal

  const response = await fetch(`${apiUrl}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email })
  });

  console.log("PUT / Válasz státusza:", response.status); // Válasz státuszának naplózása

  if (response.status === 200) {
    console.log("PUT / Felhasználó sikeresen frissítve"); // Sikeres frissítés naplózása
    alert('Felhasználó sikeresen frissítve');
    getUsers();
  }
}

// Egy felhasználó törlése az ID alapján
async function deleteUser() {
  const id = document.getElementById('deleteId').value;
  console.log("DELETE / Felhasználó törlése ID alapján:", id); // Tesztelési log a törlendő ID-ról

  const response = await fetch(`${apiUrl}/${id}`, {
    method: 'DELETE'
  });

  console.log("DELETE / Válasz státusza:", response.status); // Válasz státuszának naplózása

  if (response.status === 204) {
    console.log("DELETE / Felhasználó sikeresen törölve"); // Sikeres törlés naplózása
    alert('Felhasználó sikeresen törölve');
    getUsers();
  }
}

// LocalStorage kiegészítések

// A localStorage kulcsa, ahol a felhasználói adatokat tároljuk
const localStorageKey = 'usersData';

// Adatok lekérése a localStorage-ből
function getUsersFromLocalStorage() {
  const users = localStorage.getItem(localStorageKey);
  console.log("LocalStorage / Felhasználók lekérve:", users ? JSON.parse(users) : []); // Naplózás a helyi tárhely adatainak ellenőrzéséhez
  return users ? JSON.parse(users) : [];
}

// Adatok mentése a localStorage-be
function saveUsersToLocalStorage(users) {
  console.log("LocalStorage / Felhasználók mentése:", users); // Naplózás a mentett felhasználók adatairól
  localStorage.setItem(localStorageKey, JSON.stringify(users));
}
