import * as z from "zod";

export const registerSchema = z.object({
  body: z.object({
    email: z.email("Invalid email"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/\d/, "Password must contain at least one number"),
    firstName: z.string().min(2, "First name must be at least 2 characters"),
    lastName: z.string().min(2, "Last name must be at least 2 characters"),
  }),
  query: z.object({}).optional(),
  params: z.object({}).optional(),
});

export const loginSchema = z.object({
  body: z.object({
    email: z.email("Invalid email"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/\d/, "Password must contain at least one number"),
  }),

  query: z.object({}).optional(),
  params: z.object({}).optional(),
});

export const profileSchema = z.object({
  body: z.object({
    firstName: z
      .string()
      .min(2, "First name must be at least 2 characters")
      .optional(),
    lastName: z
      .string()
      .min(2, "Last name must be at least 2 characters")
      .optional(),
    phone: z
      .string()
      .regex(/^\+?[0-9]{7,15}$/, "Invalid phone number")
      .optional(),
    dateOfBirth: z.iso.date("Date must be in YYYY-MM-DD format").optional(),
    profileImage: z.url("Profile image must be valid URL").optional(),
    studentProfile: z
      .object({
        jobTitle: z
          .string()
          .min(2, "Job title must be at least 2 characters")
          .optional(),

        learningGoal: z
          .string()
          .min(2, "Learning goal must be at least 5 characters")
          .optional(),

        learningInterests: z
          .array(z.string().min(1, "Interest cannot be empty"))
          .min(1, "At least one learning interest is required")
          .optional(),
      })
      .optional(),
  }),
  query: z.object({}).optional(),
  params: z.object({}).optional(),
});
