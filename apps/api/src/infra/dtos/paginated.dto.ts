export interface PaginatedDto<T> {
  data: T[];
  total: number;
  count: number;
  prev?: string;
  next?: string;
}
