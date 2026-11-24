import express from "express";
import { errorHandler, notFoundHandler } from "./error.middleware.ts";
import { logger } from "./logger.middleware.ts";
import recipeRoutes from "./recipes/routes.ts";

const app = express();

app.use(express.json());              // JSON im Request-Body lesen
app.use(logger);

app.get("/", (req, res) => {
  res.send("Willkommen bei der Rezepte-API 👋");
});
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.use("/recipes", recipeRoutes);    // alle Rezept-Routen hängen unter /recipes

app.use(notFoundHandler);
app.use(errorHandler);

export default app;                   // die fertige App exportieren (NICHT starten)