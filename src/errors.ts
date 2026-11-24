export class HttpError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message);
    this.name = new.target.name;
  }
}

export default class RecipeNotFoundError extends HttpError {
  constructor(id: number) {
    super(404, `Rezept mit id=${id} nicht gefunden`);
  }
}

export class InvalidRecipeError extends HttpError {
  constructor(fields: string[]) {
    super(400, `Fehlende oder ungültige Pflichtfelder: ${fields.join(", ")}`);
  }
}
