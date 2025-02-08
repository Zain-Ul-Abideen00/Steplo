export interface ApiError {
  message: string;
  code: string;
  details?: unknown;
}

export interface ValidationError {
  field: string;
  message: string;
}
