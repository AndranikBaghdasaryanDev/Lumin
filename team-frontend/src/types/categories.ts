export interface Category {
  id: string;
  name: string;
  courseCount: number;
  subcategories?: {
    id: string;
    name: string;
  }[];
}