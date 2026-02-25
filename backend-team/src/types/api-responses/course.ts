import type { Lesson } from "./lesson.ts";

export interface Course {
  id: number;
  title: string;
  slug: string;
  description: string;
  shortDescription: string;
  thumbnailUrl: string;
  previewVideoUrl: string;
  level: string;
  language: string;
  price: number;
  discountPrice: number;
  isFree: boolean;
  status: string;
  rejectionReason: string | null;
  requirements: string[];
  whatYouLearn: string[];
  publishedAt: Date;
  isActive: boolean;
  targetAudience: string;
  rating?: number; //sprint 3
  categories: Category[];
  sections: Section[];
  instructorId: number;
  instructor: Instructor;
  createdAt: Date;
  updatedAt: Date;
  duration: number;
  lectureCount: number;
  _count: {
    enrollments: number;
  };
  ratingCount?: number; //sprint 3
  enrollmentCount?: number; //sprint 3
  isEnrolled?: boolean; //sprint 3
  enrollmentProgress?: any; //sprint 3
}

export interface Category {
  id: number;
  name: string;
  slug: string;
}

interface Section {
  id: number;
  title: string;
  description: string;
  order: number;
  courseId: number;
  createdAt: Date;
  updatedAt: Date;
  lessons: any[];
}

interface Instructor {
  id: number;
  firstName: string;
  lastName: string;
  profileImage: string;
}

export interface TransformedCourse {
  id: number;
  title: string;
  slug: string;
  description: string;
  shortDescription: string;
  thumbnail: string;
  level: string;
  language: string;
  duration: number;
  lectureCount: number;
  price: number;
  discountPrice: number;
  isFree: boolean;
  status: string;
  categories: string[]; //not listed in swagger, must be
  rejectionReason: string;
  previewVideo: string; //not listed in swagger, must be
  requirements: string[];
  whatYouLearn: string[];
  targetAudience: string; //not listed in swagger
  isActive: boolean;
  instructor: {
    id: number;
    name: string;
    image: string;
  };
  sections: any[]; //not listed in swagger, must be
  publishedAt: Date;
  createdAt: Date;
  updatedAt: Date;
  rating?: number | undefined; //sprint 3
  ratingCount?: number | undefined; //sprint 3
  enrollmentCount?: number | undefined; //sprint 3
  isEnrolled: boolean; //sprint 3
  enrollmentProgress: any; //sprint 3
}
