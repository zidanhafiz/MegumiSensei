import { type EmailOtpType } from "@supabase/supabase-js";
import { type NextRequest, NextResponse } from "next/server";

import { createClient } from "@/utils/supabase/server";

// Creating a handler to a GET request to route /auth/confirm
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const token_hash = searchParams.get("token_hash");
  const type = searchParams.get("type") as EmailOtpType | null;
  const next = searchParams.get("next") ?? "/profile";
  const reset = searchParams.get("reset") ?? "false";

  // Create redirect link without the secret token
  const redirectTo = request.nextUrl.clone();
  redirectTo.pathname = next;
  redirectTo.searchParams.delete("token_hash");
  redirectTo.searchParams.delete("type");
  redirectTo.searchParams.delete("reset");

  try {
    if (!token_hash || !type) {
      throw new Error("Invalid token or type");
    }

    const supabase = await createClient();

    const { data, error } = await supabase.auth.verifyOtp({
      type,
      token_hash,
    });

    if (error || !data.user) {
      throw error;
    }

    let updatedUser;

    if (reset === "true") {
      updatedUser = {
        is_reset: true,
      };
    } else {
      updatedUser = {
        is_verified: true,
      };
    }

    const { error: updateError } = await supabase.from("users").update(updatedUser).eq("user_id", data.user.id);

    if (updateError) {
      throw updateError;
    }

    console.log("Email confirmed");
    redirectTo.searchParams.delete("next");
    return NextResponse.redirect(redirectTo);
  } catch (error) {
    console.error(error);
    redirectTo.pathname = "/error";
    return NextResponse.redirect(redirectTo);
  }
}
