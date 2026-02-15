export interface Category {
  id: number;
  name: string;
}

export interface FilterState {
  categoryId?: number;
  level?: "BEGINNER" | "INTERMEDIATE" | "ADVANCED";
  isFree?: boolean;
}
