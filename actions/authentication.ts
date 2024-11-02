"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { SignupFormData } from "@/utils/zodSchemas";
import { loginSchema, LoginFormData, signupSchema } from "@/utils/zodSchemas";

export async function login(formData: FormData) {
  const supabase = await createClient();

  const data: LoginFormData = loginSchema.parse({
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  });

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/", "layout");
  redirect("/");
}

export async function signup(formData: FormData) {
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
      },
    },
  });

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/", "layout");
  redirect("/");
}

export async function logout() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  revalidatePath("/", "layout");
  redirect("/");
}

export async function getUserSession() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user;
}

export async function loginAsGuest() {
  const supabase = await createClient();

  const { error } = await supabase.auth.signInAnonymously({
    options: {
      data: {
        username: "Guest",
      },
    },
  });

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/", "layout");
  redirect("/");
}
