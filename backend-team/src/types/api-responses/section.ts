export interface Section {
  id: number;
  title: string;
  description: string;
  order: number;
  courseId: number;
  createdAt: Date;
  updatedAt: Date;
  lessons: any[];
}