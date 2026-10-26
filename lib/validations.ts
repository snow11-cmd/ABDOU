import { z } from "zod";

// Only allow real web links (no javascript:, data:, etc.) in user-editable URLs.
const httpUrl = z
  .string()
  .trim()
  .max(300)
  .url()
  .refine((value) => /^https?:\/\//i.test(value), "URL must start with http:// or https://");

export const contactSchema = z.object({
  name: z.string().trim().min(2, "contact.required").max(80),
  email: z.string().trim().email("contact.emailInvalid").max(160),
  subject: z.string().trim().min(3, "contact.required").max(140),
  message: z.string().trim().min(10, "contact.messageShort").max(4000),
  // Honeypot: real users leave this empty. Accept a bounded value so the API
  // can silently ignore bots instead of leaking a validation error.
  website: z.string().max(200).optional().or(z.literal("")),
});

export type ContactInput = z.infer<typeof contactSchema>;

export const checkoutSchema = z.object({
  serviceSlug: z.string().trim().min(1, "contact.required").max(100),
  name: z.string().trim().min(2, "contact.required").max(80),
  email: z.string().trim().email("contact.emailInvalid").max(160),
  notes: z.string().trim().max(2000).optional().or(z.literal("")),
});

export type CheckoutInput = z.infer<typeof checkoutSchema>;

export const projectSchema = z.object({
  id: z.string().uuid().optional(),
  slug: z
    .string()
    .trim()
    .min(2)
    .max(80)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug must be lowercase letters, numbers and dashes"),
  titleAr: z.string().trim().min(2).max(160),
  titleEn: z.string().trim().min(2).max(160),
  descriptionAr: z.string().trim().min(5).max(600),
  descriptionEn: z.string().trim().min(5).max(600),
  longDescriptionAr: z.string().trim().max(4000).optional().or(z.literal("")),
  longDescriptionEn: z.string().trim().max(4000).optional().or(z.literal("")),
  category: z.enum(["web", "ecommerce", "saas", "uiux"]),
  tech: z.string().trim().max(400).optional().or(z.literal("")),
  imageUrl: httpUrl.optional().or(z.literal("")),
  demoUrl: httpUrl.optional().or(z.literal("")),
  repoUrl: httpUrl.optional().or(z.literal("")),
  featured: z.boolean(),
  published: z.boolean(),
  sortOrder: z.number().int().min(0).max(9999),
});

export type ProjectInput = z.infer<typeof projectSchema>;

export const serviceSchema = z.object({
  id: z.string().uuid().optional(),
  slug: z
    .string()
    .trim()
    .min(2)
    .max(80)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  titleAr: z.string().trim().min(2).max(160),
  titleEn: z.string().trim().min(2).max(160),
  descriptionAr: z.string().trim().min(5).max(800),
  descriptionEn: z.string().trim().min(5).max(800),
  icon: z.string().trim().min(1).max(60),
  price: z.number().min(0).max(1000000),
  active: z.boolean(),
  sortOrder: z.number().int().min(0).max(9999),
});

export type ServiceInput = z.infer<typeof serviceSchema>;

export const settingsSchema = z.object({
  nameAr: z.string().trim().min(2).max(120),
  nameEn: z.string().trim().min(2).max(120),
  titleAr: z.string().trim().min(2).max(180),
  titleEn: z.string().trim().min(2).max(180),
  bioAr: z.string().trim().min(10).max(2000),
  bioEn: z.string().trim().min(10).max(2000),
  email: z.string().trim().email().max(160),
  whatsapp: z.string().trim().max(40),
  github: httpUrl.or(z.literal("")),
  linkedin: httpUrl.or(z.literal("")),
  x: httpUrl.or(z.literal("")),
  telegram: httpUrl.or(z.literal("")),
});

export type SettingsInput = z.infer<typeof settingsSchema>;

export const signInSchema = z.object({
  email: z.string().trim().email("contact.emailInvalid"),
  password: z.string().min(8, "auth.passwordShort"),
});

export const signUpSchema = z
  .object({
    fullName: z.string().trim().min(2, "contact.required").max(80),
    email: z.string().trim().email("contact.emailInvalid"),
    password: z.string().min(8, "auth.passwordShort"),
    confirmPassword: z.string().min(8, "auth.passwordShort"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "auth.passwordMismatch",
    path: ["confirmPassword"],
  });

export const resetRequestSchema = z.object({
  email: z.string().trim().email("contact.emailInvalid"),
});

export const updatePasswordSchema = z
  .object({
    password: z.string().min(8, "auth.passwordShort"),
    confirmPassword: z.string().min(8, "auth.passwordShort"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "auth.passwordMismatch",
    path: ["confirmPassword"],
  });
