export class FavoriteError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "FavoriteError";
    Object.setPrototypeOf(this, FavoriteError.prototype);
  }
}
