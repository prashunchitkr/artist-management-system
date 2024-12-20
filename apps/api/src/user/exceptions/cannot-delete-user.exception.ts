export class CannotDeleteUserException extends Error {
  constructor(id: number, error: any) {
    super(`Cannot delete user with id ${id}: ${error}`);
  }
}
