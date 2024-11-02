"use server";
import { createClient } from "@/utils/supabase/server";
import { editProfileSchemaServer } from "@/utils/zodSchemas";
import { revalidatePath } from "next/cache";

export async function updateProfile(userId: string, formData: FormData) {
  const { fullName, avatar } = editProfileSchemaServer.parse({
    fullName: formData.get("fullName"),
    avatar: formData.get("avatar"),
  });

  const format = avatar.name.split(".").pop();
  const pathname = `${userId}.${format}`;

  const supabase = await createClient();

  const { data: avatarData, error: avatarError } = await supabase.storage.from("avatars").upload(pathname, avatar);

  if (avatarError) {
    throw new Error(avatarError.message);
  }

  const { error: profileError } = await supabase.auth.updateUser({
    data: {
      full_name: fullName,
      avatar_url: avatarData?.path,
    },
  });

  if (profileError) {
    throw new Error(profileError.message);
  }

  revalidatePath("/");
  revalidatePath("/profile");
  revalidatePath("/profile/edit");

  return;
}

export async function getUserAvatar(avatarUrl: string) {
  const supabase = await createClient();

  const { data } = await supabase.storage.from("avatars").createSignedUrl(avatarUrl, 3600 * 24);

  return data?.signedUrl ?? null;
}
