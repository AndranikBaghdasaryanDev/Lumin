export interface Instructor {
  id: number;
  name: string;
  image: string;
}

export interface CourseListItem {
  id: number;
  title: string;
  slug: string;
  shortDescription: string;
  thumbnail: string;

  instructor: Instructor;

  level: "BEGINNER" | "INTERMEDIATE" | "ADVANCED" | string;

  price: number;
  discountPrice: number;
  isFree: boolean;

  rating: number;          // 0 for placeholder
  ratingCount: number;     // 0 for placeholder
  enrollmentCount: number; // 0 for placeholder

  duration: number; // in seconds
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface CoursesData {
  courses: CourseListItem[];
  pagination: Pagination;
}

export interface Subcategory {
  id: number;
  name: string;
  slug: string;
  courseCount: number;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  courseCount: number;
  subcategories: Subcategory[];
}

export interface CategoriesResponse {
  categories: Category[];
}
