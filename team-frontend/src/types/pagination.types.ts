export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  isLoading?: boolean;
}

export interface PaginationState {
  currentPage: number;
  totalPages: number;
}

export type PageChangeHandler = (page: number) => void | Promise<void>;
