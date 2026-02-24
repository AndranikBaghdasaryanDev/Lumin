import * as z from "zod";

export const paginationSchema = z.object({
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
  }),
});
