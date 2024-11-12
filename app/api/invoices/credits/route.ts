import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const headers = req.headers;

    // Need to return a response to avoid callback timeout
    NextResponse.json({ status: 200 });

    if (body.status !== "PAID") {
      return NextResponse.json({ status: 200 });
    }

    const callbackToken = headers.get("X-CALLBACK-TOKEN");
    const callbackId = headers.get("webhook-id");

    if (!callbackToken || !callbackId) {
      return NextResponse.json({ status: 400 });
    }

    if (callbackToken !== process.env.XENDIT_CALLBACK_TOKEN) {
      return NextResponse.json({ status: 401 });
    }

    const supabase = await createClient();

    const { data: existingTransaction } = await supabase.from("transactions").select("*").eq("webhook_id", callbackId);

    if (existingTransaction && existingTransaction.length > 0) {
      console.log("Transaction already exists");
      return NextResponse.json({ status: 200 });
    }

    const { data: user, error: userError } = await supabase.from("users").select("*").eq("email", body.payer_email).single();

    if (userError || !user) {
      console.error(userError);
      return NextResponse.json({ status: 400 });
    }

    const productId = body.external_id.split("-")[1];

    const { error } = await supabase.from("transactions").insert({
      user_id: user.user_id,
      product_id: parseInt(productId),
      status: body.status,
      amount: body.amount,
      paid_amount: body.paid_amount,
      payment_channel: body.payment_channel,
      payment_method: body.payment_method,
      webhook_id: callbackId,
    });

    if (error) {
      console.error(error);
      return NextResponse.json({ status: 500 });
    }

    const { data: product, error: productError } = await supabase.from("credits").select("*").eq("id", parseInt(productId)).single();

    if (productError || !product) {
      console.error(productError);
      return NextResponse.json({ status: 400 });
    }

    const newCredits = user.credits + product.amount;

    const { error: userUpdateError } = await supabase.from("users").update({ credits: newCredits }).eq("user_id", user.user_id);

    if (userUpdateError) {
      console.error(userUpdateError);
      return NextResponse.json({ status: 500 });
    }

    return NextResponse.json({ status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ status: 500 });
  }
}
