export interface Instructor {
  id: number;
  name: string;
  image: string;
}

export type CourseListItem = {
  id: string;
  title: string;
  thumbnail: string;
  instructor: { name: string };
  rating: number;
  ratingCount: number;
  isFree: boolean;
  price: number;
  discountPrice: number;
  duration: number; // seconds
  level: string;
  slug: string;
  shortDescription: string;
  enrollmentCount: number 
};

export type CourseApiData = {
    courses: CourseListItem[],
    total: number
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
