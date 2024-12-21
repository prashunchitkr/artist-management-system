export class CannotUpdateUserException extends Error {
  constructor(id: number, data: any) {
    super(`Cannot update user with id ${id} and data ${JSON.stringify(data)}`);
  }
}
