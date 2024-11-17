import { getPaymentChannel } from "@/utils/credits";
import { createClient } from "@/utils/supabase/server";
import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

// eslint-disable-next-line @typescript-eslint/no-require-imports
const midtransClient = require("midtrans-client");

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const apiClient = new midtransClient.Snap({
      isProduction: false,
      serverKey: process.env.MIDTRANS_SERVER_KEY,
      clientKey: process.env.MIDTRANS_CLIENT_KEY,
    });

    const response = await apiClient.transaction.notification(body);

    const supabase = await createClient();

    if (["deny", "cancel", "expire", "failure"].includes(response.transaction_status)) {
      const { error: transactionError } = await supabase
        .from("transactions")
        .update({
          status: response.transaction_status,
          payment_method: response.payment_type,
          payment_channel: getPaymentChannel(response),
        })
        .eq("id", response.order_id);

      if (transactionError) {
        console.error(transactionError);
      }
    }

    if (["capture", "settlement"].includes(response.transaction_status)) {
      const { data: transaction, error: transactionError } = await supabase
        .from("transactions")
        .update({
          status: response.transaction_status,
          payment_method: response.payment_type,
          payment_channel: getPaymentChannel(response),
          mt_transaction_id: response.transaction_id,
        })
        .eq("id", response.order_id)
        .select()
        .single();

      if (transactionError || !transaction) {
        console.error(transactionError);
        return NextResponse.json({ status: 400 });
      }

      const { data: credit, error: creditError } = await supabase.from("credits").select("*").eq("id", transaction.product_id).single();

      if (creditError || !credit) {
        console.error(creditError);
        return NextResponse.json({ status: 400 });
      }

      const { data: userCredit, error: userCreditError } = await supabase.from("users").select("credits").eq("user_id", transaction.user_id).single();

      if (userCreditError || !userCredit) {
        console.error(userCreditError);
        return NextResponse.json({ status: 400 });
      }

      const newCredits = userCredit.credits + credit.amount;

      const { error: userUpdateError } = await supabase.from("users").update({ credits: newCredits }).eq("user_id", transaction.user_id);

      if (userUpdateError) {
        console.error(userUpdateError);
        return NextResponse.json({ status: 400 });
      }
    }

    revalidateTag("user");

    return NextResponse.json({ status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ status: 500 });
  }
}
