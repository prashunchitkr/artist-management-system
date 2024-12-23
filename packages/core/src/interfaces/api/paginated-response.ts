export interface IPaginatedResponse<T> {
  data: T[];
  total: number;
  count: number;
}
