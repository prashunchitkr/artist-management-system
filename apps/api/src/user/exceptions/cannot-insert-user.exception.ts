export class CannotInsertUserException extends Error {
  constructor() {
    super('Error inserting into user');
  }
}
