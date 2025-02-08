import * as z from "zod";

// Improved phone regex for international format
const phoneRegex =
  /^(\+?1)?[-. ]?\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;

// Improved postal code regex for international format
const postalRegex = /^[A-Z0-9]{3,10}$/i;

export const shippingSchema = z.object({
  firstName: z
    .string()
    .min(2, "First name must be at least 2 characters")
    .max(50, "First name must be less than 50 characters")
    .regex(
      /^[a-zA-Z\s-']+$/,
      "First name can only contain letters, spaces, hyphens and apostrophes"
    ),

  lastName: z
    .string()
    .min(2, "Last name must be at least 2 characters")
    .max(50, "Last name must be less than 50 characters")
    .regex(
      /^[a-zA-Z\s-']+$/,
      "Last name can only contain letters, spaces, hyphens and apostrophes"
    ),

  email: z
    .string()
    .email("Please enter a valid email address")
    .min(5, "Email is too short")
    .max(100, "Email is too long"),

  phone: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .max(17, "Phone number is too long")
    .regex(
      phoneRegex,
      "Please enter a valid phone number (e.g., +1 (234) 567-8900)"
    )
    .transform((val) => val.replace(/\D/g, "")), // Strip non-digits for storage

  address1: z
    .string()
    .min(5, "Address must be at least 5 characters")
    .max(100, "Address is too long")
    .regex(
      /^[a-zA-Z0-9\s,.-]+$/,
      "Address can only contain letters, numbers, spaces, and basic punctuation"
    ),

  address2: z
    .string()
    .max(100, "Address is too long")
    .regex(
      /^[a-zA-Z0-9\s,.-]*$/,
      "Address can only contain letters, numbers, spaces, and basic punctuation"
    )
    .optional(),

  city: z
    .string()
    .min(2, "City must be at least 2 characters")
    .max(50, "City name is too long")
    .regex(
      /^[a-zA-Z\s.-]+$/,
      "City can only contain letters, spaces, periods, and hyphens"
    ),

  state: z.string().min(2, "Please select a state"),

  postalCode: z
    .string()
    .regex(postalRegex, "Please enter a valid postal code")
    .min(3, "Postal code is too short")
    .max(10, "Postal code is too long"),

  country: z.string().min(2, "Please select a country"),
});

export type ShippingFormValues = z.infer<typeof shippingSchema>;

export const paymentFormSchema = z.object({
  name: z.string().min(2, "Name is required"),
  // Add other payment fields as needed
});

export type PaymentFormValues = z.infer<typeof paymentFormSchema>;
