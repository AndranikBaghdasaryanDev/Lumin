export interface CoreBackendResponse<T> {
  success: boolean;
  data?: T;
  error?: CoreBackendError;
}

export interface CoreBackendError {
  code: string;
  message: string;
}
