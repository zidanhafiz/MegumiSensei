"use server";
import { revalidatePath } from "next/cache";
import { createClient } from "@/utils/supabase/server";
import { forgotPasswordSchema, resetPasswordSchema, SignupFormData } from "@/utils/zodSchemas";
import { loginSchema, LoginFormData, signupSchema } from "@/utils/zodSchemas";
import { User } from "@/types/tableTypes";

export async function login(formData: FormData): Promise<{ success: boolean; data: string }> {
  const supabase = await createClient();

  const data: LoginFormData = loginSchema.parse({
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  });

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    console.error(error);
    return {
      success: false,
      data: error.message,
    };
  }

  revalidatePath("/", "layout");

  return {
    success: true,
    data: "Login successful",
  };
}

export async function signup(formData: FormData): Promise<{ success: boolean; data: string }> {
  const supabase = await createClient();

  const data: SignupFormData = signupSchema.parse({
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    fullName: formData.get("fullName") as string,
    username: formData.get("username") as string,
    confirmPassword: formData.get("confirmPassword") as string,
  });

  const { error } = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
    options: {
      data: {
        username: data.username,
        full_name: data.fullName,
        avatar_url: "default.jpg",
        credits: 100,
      },
    },
  });

  if (error) {
    console.error(error);
    return {
      success: false,
      data: error.message,
    };
  }

  revalidatePath("/", "layout");

  return {
    success: true,
    data: "Signup successful",
  };
}

export async function logout(): Promise<{ success: boolean; data: string }> {
  const supabase = await createClient();
  await supabase.auth.signOut();

  revalidatePath("/", "layout");

  return {
    success: true,
    data: "Logout successful",
  };
}

export async function loginAsGuest(): Promise<{ success: boolean; data: string }> {
  const supabase = await createClient();

  const { error } = await supabase.auth.signInAnonymously({
    options: {
      data: {
        full_name: "Guest",
        credits: 10,
      },
    },
  });

  if (error) {
    console.error(error);
    return {
      success: false,
      data: error.message,
    };
  }

  revalidatePath("/", "layout");

  return {
    success: true,
    data: "Login as guest successful",
  };
}

export async function getUserData(): Promise<User | null> {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();

  if (error || !data) {
    console.error(error);
    return null;
  }

  const { data: userData, error: userDataError } = await supabase.from("users").select("*").eq("user_id", data.user.id).single();

  if (userDataError || !userData) {
    console.error(userDataError);
    return null;
  }

  return userData;
}

export async function forgotPassword(formData: FormData): Promise<{ success: boolean; data: string }> {
  const supabase = await createClient();

  const { email } = forgotPasswordSchema.parse({
    email: formData.get("email") as string,
  });

  const { error } = await supabase.auth.resetPasswordForEmail(email);

  if (error) {
    console.error(error);
    return {
      success: false,
      data: error.message,
    };
  }

  return {
    success: true,
    data: "Forgot password successful",
  };
}

export async function resetPassword(formData: FormData): Promise<{ success: boolean; data: string }> {
  const supabase = await createClient();

  const { password } = resetPasswordSchema.parse({
    password: formData.get("password") as string,
    confirmPassword: formData.get("confirmPassword") as string,
  });

  const { data, error } = await supabase.auth.updateUser({
    password,
  });

  if (error || !data) {
    console.error(error);
    return {
      success: false,
      data: error?.message ?? "Error resetting password",
    };
  }

  const { error: userDataError } = await supabase
    .from("users")
    .update({
      is_reset: false,
    })
    .eq("user_id", data.user.id);

  if (userDataError) {
    console.error(userDataError);
    return {
      success: false,
      data: userDataError.message,
    };
  }

  return {
    success: true,
    data: "Reset password successful",
  };
}
