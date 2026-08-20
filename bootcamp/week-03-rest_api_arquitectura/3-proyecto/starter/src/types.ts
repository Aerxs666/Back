
export interface Guard {
  id: number;
  name: string;
  category: string;
  hourlyRate: number;
  yearsOfExperience: number;
  active: boolean;
  createdAt: string;
}

export type CreateGuardDto = Omit<Guard, 'id' | 'createdAt'>;
export type UpdateGuardDto = Partial<CreateGuardDto>;


export interface SingleResponse<T> {
  data: T;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}

export interface ErrorResponse {
  error: string;
  message: string;
}

export interface PaginationParams {
  page: number;
  limit: number;
}