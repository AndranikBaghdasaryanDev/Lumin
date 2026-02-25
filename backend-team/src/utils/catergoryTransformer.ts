import type { Category, TransformedCategory } from "../types/api-responses/category.ts";

export function categoryTransform(category: Category) : TransformedCategory{
  return {
    id: category.id,
    name: category.name,
    slug: category.slug,
    icon: category.icon,
    coursesCount: category.coursesCount,
    subCategories: (category.children ?? []).map(categoryTransform),
  };
}
