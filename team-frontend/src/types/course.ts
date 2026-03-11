export interface Instructor {
  id: number;
  name: string;
  image: string;
}

export type CourseLevel = "BEGINNER" | "INTERMEDIATE" | "ADVANCED";

export interface CourseSectionLesson {
  id: number;
  title: string;
  description: string;
  durationSeconds: number;
  isPreview: boolean;
}

export interface CourseSection {
  id: number;
  title: string;
  description: string;
  duration: number;
  lessonsCount: number;
  lessons: CourseSectionLesson[];
}

export type CourseListItem = {
  id: number;
  title: string;
  thumbnail: string;
  instructor: Instructor;
  rating: number;
  ratingCount: number;
  isFree: boolean;
  price: number;
  discountPrice: number;
  duration: number;
  lectureCount?: number;
  level: CourseLevel;
  slug: string;
  shortDescription: string;
  enrollmentCount: number;
  description?: string;
  language?: string;
  requirements?: string[];
  whatYouLearn?: string[];
  targetAudience?: string | string[];
  categories?: string[];
  sections?: CourseSection[];
  previewVideo?: string;
  status?: string;
  rejectionReason?: string | null;
  isActive?: boolean;
  publishedAt?: string;
  createdAt?: string;
  updatedAt?: string;
  isEnrolled?: boolean;
  enrollmentProgress?: number | null;
};

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

export interface CoursesFilters {
  page?: number;
  limit?: number;
  categoryId?: number;
  level?: CourseLevel;
  search?: string;
  sort?: "newest" | "price_low" | "price_high";
  isFree?: boolean;
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
