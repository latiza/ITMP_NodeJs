const express = require("express");
const app = express();

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

app.use(express.json());

app.get("/api/users", (req, res) => {
  res.json(users);
});

app.get("/api/users/:id", (req, res) => {
  const id = req.params.id;
  const user = users.find((u) => u.id === id);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.json(user);
});

app.post("/api/users", (req, res) => {
  const newUser = { ...req.body, id: crypto.randomUUID() };
  users.push(newUser);
  res.status(201).json(newUser);
});

app.put("/api/users/:id", (req, res) => {
  const id = req.params.id;
  const user = users.find((u) => u.id === id);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const updatedUser = { ...user, ...req.body };
  users = users.map((u) => (u.id === id ? updatedUser : u));
  res.json(updatedUser);
});

app.delete("/api/users/:id", (req, res) => {
  const id = req.params.id;
  const user = users.find((u) => u.id === id);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  users = users.filter((x) => x.id !== id);
  res.sendStatus(204);
});

app.listen(3000, () => console.log("The app is running on port 3000!"));
