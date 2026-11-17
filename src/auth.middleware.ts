import { Request, Response, NextFunction } from "express";

const API_KEY = "geheim123";

export function requireApiKey(req: Request, res: Response, next: NextFunction) {
    
  const api_key = req.header("x-api-key");
  if (!api_key || api_key !== API_KEY) {
    return res.status(401).json({ fehler: "Nicht autorisiert" });
  }
  next();
}