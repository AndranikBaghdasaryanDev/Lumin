export interface Category {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  icon: string;
  coursesCount: number;
  order: number;
  parentId: number | null;
  children: Category[] | [];
}

export type TransformedCategory = Omit<
  Category,
  "description" | "order" | "parentId" | "children"
> & {
  subCategories: TransformedCategory[];
};