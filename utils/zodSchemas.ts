import z from "zod";

export const signupSchema = z
  .object({
    fullName: z.string().min(3, { message: "Full name must be at least 3 characters" }).max(32, { message: "Full name must be at most 32 characters" }).trim(),
    username: z
      .string()
      .min(3, { message: "Username must be at least 3 characters" })
      .max(32, { message: "Username must be at most 32 characters" })
      .trim()
      .regex(/^[a-zA-Z0-9]+$/, { message: "Username must contain only letters, numbers and no spaces" }),
    email: z.string().email().min(5, { message: "Email must be at least 5 characters" }).max(50, { message: "Email must be at most 50 characters" }).trim(),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" })
      .max(32, { message: "Password must be at most 32 characters" })
      .trim()
      .regex(/^[\w!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?`~]+$/, { message: "Password must contain only letters, numbers, symbols and no spaces" }),
    confirmPassword: z
      .string()
      .min(1, { message: "Please confirm your password" })
      .max(32, { message: "Password must be at most 32 characters" })
      .trim()
      .regex(/^[\w!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?`~]+$/, { message: "Password must contain only letters, numbers, symbols and no spaces" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export type SignupFormData = z.infer<typeof signupSchema>;

export const editProfileSchemaServer = z.object({
  fullName: z.string().min(3, { message: "Full name must be at least 3 characters" }).max(32, { message: "Full name must be at most 32 characters" }).trim(),
  avatar: z
    .unknown()
    .transform((file) => file as File)
    .refine((file) => file.size <= 5 * 1024 * 1024, `Max file size is 5MB.`)
    .refine((file) => ["image/jpg", "image/jpeg", "image/png", "image/webp"].includes(file?.type), ".jpg, .jpeg, .png and .webp files are accepted.")
    .nullable(),
});

export type EditProfileFormDataServer = z.infer<typeof editProfileSchemaServer>;

export const loginSchema = z.object({
  email: z.string().email().min(5, { message: "Email must be at least 5 characters" }).max(50, { message: "Email must be at most 50 characters" }).trim(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .max(32, { message: "Password must be at most 32 characters" })
    .trim()
    .regex(/^[\w!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?`~]+$/, { message: "Password must contain only letters, numbers, symbols and no spaces" }),
});

export type LoginFormData = z.infer<typeof loginSchema>;

export const forgotPasswordSchema = z.object({
  email: z.string().email().min(5, { message: "Email must be at least 5 characters" }).max(50, { message: "Email must be at most 50 characters" }).trim(),
});

export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

export const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" })
      .max(32, { message: "Password must be at most 32 characters" })
      .trim()
      .regex(/^[\w!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?`~]+$/, { message: "Password must contain only letters, numbers, symbols and no spaces" }),
    confirmPassword: z
      .string()
      .min(1, { message: "Please confirm your password" })
      .max(32, { message: "Password must be at most 32 characters" })
      .trim()
      .regex(/^[\w!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?`~]+$/, { message: "Password must contain only letters, numbers, symbols and no spaces" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

export const buyCreditsSchema = z.object({
  sku: z.string().min(1, { message: "SKU is required" }).max(100, { message: "SKU must be at most 100 characters" }),
  id: z.string().min(1, { message: "ID is required" }),
  userId: z.string().min(1, { message: "User ID is required" }),
});

export type BuyCreditsFormData = z.infer<typeof buyCreditsSchema>;
