export interface Guard {
  id: number;
  name: string;
  category: string; 
  hourlyRate: number;
  yearsOfExperience: number;
  active: boolean;
  createdAt: Date;
}


export interface SingleResponse<T> {
  data: T;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}

export interface ValidationErrorResponse {
  error: string;
  message: string;
  issues: Array<{ field: string; message: string }>;
}

export interface ErrorResponse {
  error: string;
  message: string;
  stack?: string;
}