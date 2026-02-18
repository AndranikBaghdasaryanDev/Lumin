export interface Course {
  id: number;
  title: string;
  slug: string;
  description: string;
  shortDescription: string;
  thumbnailUrl: string;
  level: string;
  language: string;
  price: number;
  discountPrice: number;
  categories: string[]; //not listed in swagger, must be
  isFree: boolean;
  previewVideoUrl: string;
  status: string;
  sections: any[]; //not listed in swagger, must be
  rejectionReason: string;
  requirements: string[];
  whatYouLearn: string[];
  targetAudience: string; //not listed in swagger
  isActive: boolean;
  instructor: any; // instructor must be object with some fields not instructorId as in swagger
  publishedAt: Date;
  createdAt: Date;
  updatedAt: Date;
  rating?: number; //sprint 3
  ratingCount?: number; //sprint 3
  enrollmentCount?: number; //sprint 3
  isEnrolled?: boolean; //sprint 3
  enrollmentProgress?: any; //sprint 3
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
