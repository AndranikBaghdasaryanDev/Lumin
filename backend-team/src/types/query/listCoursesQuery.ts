export interface CoursesCoreQuery {
  page: number;
  limit: number;
  categoryId?: number;
  level?: "BEGINNER" | "INTERMEDIATE" | "ADVANCED";
  search?: string;
  sort?: "newest" | "price_low" | "price_high";
  isFree?: "true" | "false";
}
