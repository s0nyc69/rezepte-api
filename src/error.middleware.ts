import { Request, Response, NextFunction } from "express";
import { HttpError } from "./errors.ts";

export function notFoundHandler(
  req: Request,
  _res: Response,
  next: NextFunction,
) {
  next(new HttpError(404, `Route ${req.method} ${req.originalUrl} nicht gefunden`));
}

export function errorHandler(
  err: unknown,
  _req: Request,
  res: Response,
  next: NextFunction,
) {
  if (res.headersSent) {
    next(err);
    return;
  }

  console.error(err);
  const status =
    err instanceof HttpError
      ? err.status
      : typeof err === "object" &&
          err !== null &&
          "status" in err &&
          typeof err.status === "number" &&
          Number.isInteger(err.status) &&
          err.status >= 400 &&
          err.status <= 599
        ? err.status
        : 500;
  const message = err instanceof Error ? err.message : "Unbekannter Fehler";
  res.status(status).json({ fehler: message });
}