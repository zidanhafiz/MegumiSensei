"use server";
import { createClient } from "@/utils/supabase/server";
import { editProfileSchemaServer } from "@/utils/zodSchemas";
import { revalidatePath, revalidateTag } from "next/cache";

export async function updateProfile(userId: string, formData: FormData): Promise<{ success: boolean; data?: string }> {
  const { fullName, avatar } = editProfileSchemaServer.parse({
    fullName: formData.get("fullName"),
    avatar: formData.get("avatar"),
  });

  const supabase = await createClient();

  let newAvatar;
  if (avatar) {
    const format = avatar.name.split(".").pop();
    const pathname = `${userId}.${format}`;

    const { data: avatarData, error: avatarError } = await supabase.storage.from("avatars").upload(pathname, avatar, {
      upsert: true,
    });

    if (avatarError) {
      newAvatar = "default.jpg";
    } else {
      newAvatar = avatarData.path;
    }
  }

  const { error: profileError } = await supabase
    .from("users")
    .update({
      full_name: fullName,
      avatar_url: newAvatar,
    })
    .eq("user_id", userId);

  if (profileError) {
    return {
      success: false,
      data: profileError.message,
    };
  }

  revalidateTag("user");
  revalidatePath("/");
  revalidatePath("/profile");
  revalidatePath("/profile/edit");

  return {
    success: true,
    data: "Profile updated successfully",
  };
}

export async function deductUserCredits(amount: number): Promise<{ success: boolean; data: string }> {
  const supabase = await createClient();

  const { data: authUser, error: authUserError } = await supabase.auth.getUser();

  if (authUserError || !authUser) {
    return {
      success: false,
      data: "User not found",
    };
  }

  const { data: user, error: userError } = await supabase.from("users").select("credits").eq("user_id", authUser.user.id).single();

  if (userError || !user) {
    return {
      success: false,
      data: "User not found",
    };
  }

  if (user.credits < amount || user.credits === 0) {
    return {
      success: false,
      data: "Credits anda habis!",
    };
  }

  const { error: deductError } = await supabase
    .from("users")
    .update({
      credits: user.credits - amount,
    })
    .eq("user_id", authUser.user.id);

  if (deductError) {
    return {
      success: false,
      data: deductError.message,
    };
  }

  revalidateTag("user");
  revalidatePath("/");

  return {
    success: true,
    data: "Credits deducted successfully",
  };
}
