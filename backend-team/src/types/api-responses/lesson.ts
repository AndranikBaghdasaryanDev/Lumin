interface Resource {
  id: number;
  name: string;
  fileUrl: string;
  fileType: string;
}

export interface Lesson {
  id: number;
  title: string;
  type: string;
  description: string;
  videoUrl: string;
  content: any;
  duration: number;
  isFree: boolean;
  resources: Resource[];
  navigation: {
    previousLessonId: number | null;
    nextLessonId: number | null;
  };
}
