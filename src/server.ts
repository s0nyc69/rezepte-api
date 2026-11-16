import express from "express";

const app = express();
app.use(express.json());

const PORT = 3000;

const rezepte = [
  { id: 1, titel: "Spaghetti Carbonara", zutaten: ["Spaghetti", "Eier", "Guanciale", "schwarze Pfeffer", "Pecorino Romano"], minuten: 20, portionen: 2 },
  { id: 2, titel: "Chicken Tikka Masala", zutaten: ["Hühnchen", "Tomaten", "Garam Masala", "Kokosmilch", "Reis"], minuten: 45, portionen: 4 },
  { id: 3, titel: "Beef Tacos", zutaten: ["Rindfleisch", "Tortillas", "Guacamole", "Tomaten", "Zwiebeln"], minuten: 30, portionen: 4 },
  { id: 4, titel: "Hühnersuppe", zutaten: ["Hühnchen", "Suppengemüse", "Zwiebeln", "Kartoffeln", "Salz"], minuten: 120, portionen: 4 },
  // ...
];

// Begrüßung auf der Startseite
// TODO: den Text „Willkommen bei der Rezepte-API 👋" zurückschicken
app.get("/", (req, res) => {
    res.send("Willkommen bei der Rezepte-API 👋");
});

app.get("/recipes", (req, res) => {
  res.json(rezepte);
});

app.get("/recipes/:id", (req, res) => {
  // TODO: ID aus dem Pfad lesen — als Zahl!
  const id = parseInt(req.params.id);
  // TODO: passendes Rezept in der Liste suchen
  const rezept = rezepte.find((r) => r.id === id);

  if (!rezept) {
    // TODO: mit Status 404 und { fehler: "Rezept nicht gefunden" } antworten
    res.status(404).json({ fehler: "Rezept nicht gefunden" });
  }
  // TODO: das gefundene Rezept als JSON zurückschicken
    res.json(rezept);
});

// Health-Check: läuft der Server?
// TODO: GET /health soll { status: "ok" } als JSON zurückgeben
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.listen(PORT, () => {
  console.log(`Server läuft auf http://localhost:${PORT}`);
});