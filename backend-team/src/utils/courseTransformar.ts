export const transformCourse = (course: any) => {
  const duration = course.sections.reduce(
    (total: number, section: any) =>
      total +
      section.lessons.reduce(
        (sectionTotal: number, lesson: any) =>
          sectionTotal + lesson.duration,
        0
      ),
    0
  );

  const lectureCount = course.sections.reduce(
    (total: number, section: any) => total + section.lessons.length,
    0
  );

  const sections = course.sections.map((section: any) => ({
    ...section,
    lessonsCount: section.lessons.length,
  }));

  return {
    ...course,
    duration,
    lectureCount,
    sections,
    rating: 0,
    ratingCount: 0,
    enrollmentCount: 0,
    isEnrolled: false,
    enrollmentProgress: null,
  };
};
