import RecipeNotFoundError, { InvalidRecipeError } from "../errors.ts";

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

export async function getRecipeById(id: number): Promise<Rezept> {
  const rezept = rezepte.find((r) => r.id === id);
  if (!rezept) {
    throw new RecipeNotFoundError(id);
  }
  return rezept;
}

export async function createRecipe(daten: unknown): Promise<Rezept> {
  if (typeof daten !== "object" || daten === null || Array.isArray(daten)) {
    throw new InvalidRecipeError(["titel", "zutaten", "minuten", "portionen"]);
  }

  const recipe = daten as Record<string, unknown>;
  const invalidFields = [
    typeof recipe.titel !== "string" || recipe.titel.trim() === "" ? "titel" : null,
    !Array.isArray(recipe.zutaten) ||
    recipe.zutaten.length === 0 ||
    !recipe.zutaten.every((zutat) => typeof zutat === "string" && zutat.trim() !== "")
      ? "zutaten"
      : null,
    typeof recipe.minuten !== "number" || !Number.isFinite(recipe.minuten)
      ? "minuten"
      : null,
    typeof recipe.portionen !== "number" || !Number.isFinite(recipe.portionen)
      ? "portionen"
      : null,
  ].filter((field): field is string => field !== null);

  if (invalidFields.length > 0) {
    throw new InvalidRecipeError(invalidFields);
  }

  const validRecipe = recipe as Omit<Rezept, "id">;
  let naechsteId = rezepte.length + 1;
  const neues: Rezept = { id: naechsteId++, ...validRecipe };
  
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
