import * as z from "zod";

export const profileSchema = z.object({
  body: z
    .object({
      firstName: z
        .string()
        .trim()
        .min(2, "First name must be at least 2 characters")
        .optional(),
      lastName: z
        .string()
        .trim()
        .min(2, "Last name must be at least 2 characters")
        .optional(),
      phone: z
        .string()
        .trim()
        .regex(/^\+?[0-9]{7,15}$/, "Invalid phone number")
        .optional(),
      dateOfBirth: z.iso.date("Date must be in YYYY-MM-DD format").optional(),
      profileImage: z.url("Profile image must be valid URL").optional(),
      studentProfile: z
        .object({
          jobTitle: z
            .string()
            .trim()
            .min(2, "Job title must be at least 2 characters")
            .optional(),

          learningGoal: z
            .string()
            .trim()
            .min(2, "Learning goal must be at least 2 characters")
            .optional(),

          learningInterests: z
            .array(z.string().trim().min(2, "Interest cannot be empty"))
            .min(1, "At least one learning interest is required")
            .optional(),
        })
        .optional(),
    })
    .refine((data) => Object.keys(data).length > 0, {
      message: "At least one field must be provided",
    }),
  query: z.object({}).optional(),
  params: z.object({}).optional(),
});
