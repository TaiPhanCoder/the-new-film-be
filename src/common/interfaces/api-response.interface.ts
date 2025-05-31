export interface ApiResponse<T = any> {
  status: number;
  message: string;
  data: T;
  timestamp: string;
}

export interface ApiErrorResponse {
  status: number;
  message: string;
  error?: string;
  timestamp: string;
}
