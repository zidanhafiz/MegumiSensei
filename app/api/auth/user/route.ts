import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const supabase = await createClient();

    const { data: authUser, error: authUserError } = await supabase.auth.getUser();

    if (authUserError) {
      console.error(authUserError);
      return NextResponse.json({ error: authUserError.message }, { status: 400 });
    }

    const { data: userData, error: userDataError } = await supabase.from("users").select("*").eq("user_id", authUser.user.id).single();

    if (userDataError) {
      console.error(userDataError);
      return NextResponse.json({ error: userDataError.message }, { status: 400 });
    }

    const { data: avatar, error: avatarError } = await supabase.storage.from("avatars").createSignedUrl(userData.avatar_url ?? "default.jpg", 3600);

    if (avatarError) {
      console.error(avatarError);
      return NextResponse.json({ error: avatarError.message }, { status: 400 });
    }

    return NextResponse.json({
      ...userData,
      avatar_url: avatar.signedUrl,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
