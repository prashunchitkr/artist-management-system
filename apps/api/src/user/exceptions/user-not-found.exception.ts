export class UserNotFoundException extends Error {
  constructor(id: number) {
    super(`User with id ${id} not found`);
  }
}
