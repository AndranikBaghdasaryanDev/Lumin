import * as z from "zod";

export const querySchema = z.object({
  query: z.object({
    page: z.coerce
      .number()
      .int("page must be integer")
      .positive("page must be positive")
      .default(1),
    limit: z.coerce
      .number()
      .int("limit must be integer")
      .positive("limit must be positive")
      .default(12),
    categoryId: z.coerce
      .number()
      .int("categoryId must be integer")
      .positive("categoryId must be positive")
      .optional(),
    level: z.enum(["BEGINNER", "INTERMEDIATE", "ADVANCED"]).optional(),
    search: z.string().trim().min(1).optional(),
    sort: z.enum(["newest", "price_low", "price_high"]).optional(),
    isFree: z.enum(["true", "false"]).optional(),
  }),
});