import * as z from "zod";
import zxcvbn from "zxcvbn";

export const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password is required")
    .max(72, "Password too long"),
});

export const signupSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(24, "Password must be less than 24 characters")
    .refine((password) => {
      const result = zxcvbn(password);
      return result.score >= 3; // Requires a strong password (score 3 or 4)
    }, "Password is too weak. Include a mix of letters, numbers, symbols, and avoid common patterns.")
    .refine(
      (password) =>
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]/.test(
          password
        ),
      "Password must contain at least one uppercase letter, lowercase letter, number, and special character"
    )
    .refine(
      (password) => !/(.)\1{2,}/.test(password),
      "Password cannot contain repeating characters"
    ),
  fullName: z
    .string()
    .min(2, "Full name must be at least 2 characters")
    .max(50, "Full name must be less than 50 characters"),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  country: z.string().min(1, "Country is required"),
  gender: z.string().optional(),
  newsletter: z.boolean().default(false),
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type SignupFormData = z.infer<typeof signupSchema>;
