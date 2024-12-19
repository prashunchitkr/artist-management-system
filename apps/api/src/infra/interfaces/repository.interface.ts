export interface IPagination {
  take: number;
  skip: number;
}

export interface IRepository<T> {
  findOne(id: number): Promise<T | null>;
  findAll(pagination: IPagination): Promise<T[]>;
  create(entity: T): Promise<T>;
  update(id: number, entity: T): Promise<T>;
  delete(id: number): Promise<void>;
}
