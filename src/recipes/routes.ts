import { Router } from "express";
import { requireApiKey } from "../auth.middleware.ts";
import { getRecipesHandler, getRecipeHandler, createRecipeHandler, deleteRecipeHandler } from "./controller.ts";

const router = Router();
router.get("/", getRecipesHandler);
// TODO: Route GET "/:id" auf getRecipeHandler registrieren
router.get("/:id", getRecipeHandler);
// TODO: Route POST "/" auf createRecipeHandler registrieren
router.post("/", createRecipeHandler);
// TODO: Route DELETE "/:id" auf deleteRecipeHandler registrieren MIT auth
router.delete("/:id", requireApiKey, deleteRecipeHandler);

export default router;