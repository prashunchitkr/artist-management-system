export interface PaginatedDto<T> {
  data: T[];
  total: number;
  count: number;
}
