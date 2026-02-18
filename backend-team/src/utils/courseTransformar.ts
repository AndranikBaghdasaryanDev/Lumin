import type {
  Course,
  TransformedCourse,
} from "../types/api-responses/course.ts";

export const transformCourse = (course: Course) => {
  let courseDuration: number = 0;
  let lectureCount: number = 0;

  const sections = course.sections.map((s: any) => { //create type for section
    let sectionDuration = 0;
    let sectionLessonsCount = s.lessons.length;

    for (let i = 0; i < sectionLessonsCount; ++i) {
      sectionDuration += s.lessons[i].durationSeconds;
    }

    lectureCount += sectionLessonsCount;
    courseDuration += sectionDuration;

    return {
      ...s,
      duration: sectionDuration,
      lessonsCount: sectionLessonsCount,
    };
  });

  const transformedCourse: TransformedCourse = {
    id: course.id,
    title: course.title,
    slug: course.slug,
    description: course.description,
    shortDescription: course.shortDescription,
    level: course.level,
    language: course.language,
    price: course.price,
    discountPrice: course.discountPrice,
    duration: courseDuration,
    lectureCount,
    isFree: course.isFree,
    requirements: course.requirements,
    rejectionReason: course.rejectionReason,
    status: course.status,
    isActive: course.isActive,
    sections,
    whatYouLearn: course.whatYouLearn,
    targetAudience: course.targetAudience,
    thumbnail: course.thumbnailUrl,
    previewVideo: course.previewVideoUrl,
    categories: course.categories.map((c: any) => c.name), //create type for category 
    instructor: {
      id: course.instructor.id,
      name: `${course.instructor.firstName} ${course.instructor.lastName}`,
      image: course.instructor.profileImage,
    },
    publishedAt: course.publishedAt,
    createdAt: course.createdAt,
    updatedAt: course.updatedAt,
    rating: course.rating ? course.rating : 0, //sprint 3
    ratingCount: course.ratingCount ? course.ratingCount : 0, //sprint 3
    enrollmentCount: course.enrollmentCount ? course.enrollmentCount : 0, //sprint 3
    isEnrolled: false, // sprint 3
    enrollmentProgress: null, //sprint 3
  };

  return transformedCourse;
};
