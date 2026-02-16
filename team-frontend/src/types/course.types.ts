import type { CourseListItem } from './course';

export interface Lesson {
  id: number;
  title: string;
  description: string;
  duration: number; // in seconds
  videoUrl?: string;
  isPreview: boolean;
  order: number;
}

export interface Module {
  id: number;
  title: string;
  description: string;
  lessons: Lesson[];
  order: number;
}

export interface Review {
  id: number;
  userId: number;
  userName: string;
  userAvatar?: string;
  rating: number;
  comment: string;
  createdAt: string;
  helpfulCount: number;
}

export interface CourseDetails {
  id: number;
  title: string;
  slug: string;
  description: string;
  fullDescription: string;
  thumbnail: string;
  previewVideo?: string;
  
  instructor: {
    id: number;
    firstName: string;
    lastName: string;
    bio?: string;
    profileImage?: string;
    coursesCount?: number;
    studentsCount?: number;
    instructorRating?: number;
  };
  
  level: "BEGINNER" | "INTERMEDIATE" | "ADVANCED";
  category: string;
  tags: string[];
  
  price: number;
  discountPrice: number;
  isFree: boolean;
  
  rating: number;
  ratingCount: number;
  enrollmentCount: number;
  duration: number; // in seconds
  totalLessons: number;
  totalModules: number;
  
  language: string;
  subtitles: string[];
  certificate: boolean;
  isEnrolled: boolean;
  progress?: number; // 0-100
  
  requirements: string[];
  whatYouWillLearn: string[];
  targetAudience: string[];
  
  modules: Module[];
  reviews: Review[];
  
  createdAt: string;
  updatedAt: string;
}

export interface CourseDetailsResponse {
  course: CourseDetails;
  relatedCourses: CourseListItem[];
}
