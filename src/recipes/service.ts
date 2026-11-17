export type Rezept = {
  id: number;
  titel: string;
  zutaten: string[];
  minuten: number;
  portionen: number;
};

let rezepte = [
  {
    id: 1,
    titel: "Spaghetti Carbonara",
    zutaten: [
      "Spaghetti",
      "Eier",
      "Guanciale",
      "schwarze Pfeffer",
      "Pecorino Romano",
    ],
    minuten: 20,
    portionen: 2,
  },
  {
    id: 2,
    titel: "Chicken Tikka Masala",
    zutaten: ["Hühnchen", "Tomaten", "Garam Masala", "Kokosmilch", "Reis"],
    minuten: 45,
    portionen: 4,
  },
  {
    id: 3,
    titel: "Beef Tacos",
    zutaten: ["Rindfleisch", "Tortillas", "Guacamole", "Tomaten", "Zwiebeln"],
    minuten: 30,
    portionen: 4,
  },
  {
    id: 4,
    titel: "Hühnersuppe",
    zutaten: ["Hühnchen", "Suppengemüse", "Zwiebeln", "Kartoffeln", "Salz"],
    minuten: 120,
    portionen: 4,
  },
  // ...
];

export async function getAllRecipes(): Promise<Rezept[]> {
  return rezepte;
}

export async function getRecipeById(id: number): Promise<Rezept | null> {
  return rezepte.find((r) => r.id === id) ?? null;
}

export async function createRecipe(daten: Omit<Rezept, "id">): Promise<Rezept> {
  let naechsteId = rezepte.length + 1;
  const neues: Rezept = { id: naechsteId++, ...daten };
  
  rezepte.push(neues);
  return neues;
}

export async function deleteRecipe(id: number): Promise<boolean> {
  if (rezepte.length === rezepte.filter((r) => r.id !== id).length) {
    return false;
  }
  rezepte = rezepte.filter((r) => r.id !== id);
  return true;
}
