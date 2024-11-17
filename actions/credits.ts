"use server";
import { createClient } from "@/utils/supabase/server";
import { buyCreditsSchema } from "@/utils/zodSchemas";
import { randomUUID } from "crypto";

// eslint-disable-next-line @typescript-eslint/no-require-imports
const midtransClient = require("midtrans-client");

export const buyCredits = async (formData: FormData) => {
  const { sku, id, userId } = buyCreditsSchema.parse({
    sku: formData.get("sku"),
    id: formData.get("id"),
    userId: formData.get("userId"),
  });

  try {
    const supabase = await createClient();
    const { data, error } = await supabase.from("credits").select("*").eq("id", id).single();

    if (error) {
      throw new Error(error.message);
    }

    if (data.sku !== sku) {
      throw new Error("SKU tidak valid");
    }

    const {
      data: { user: userSession },
      error: userSessionError,
    } = await supabase.auth.getUser();

    if (userSessionError) {
      throw new Error(userSessionError.message);
    }

    if (!userSession) {
      throw new Error("User tidak ditemukan");
    }

    if (userId !== userSession.id) {
      throw new Error("User tidak valid");
    }

    const [firstName, ...lastName] = userSession.user_metadata?.full_name?.split(" ") ?? [];

    const snap = new midtransClient.Snap({
      isProduction: false,
      serverKey: process.env.MIDTRANS_SERVER_KEY!,
      clientKey: process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY!,
    });

    const orderId = randomUUID();

    const parameter = {
      transaction_details: {
        order_id: orderId,
        gross_amount: data.price,
      },
      item_details: [
        {
          id: data.id,
          price: data.price,
          quantity: 1,
          name: data.sku,
        },
      ],
      customer_details: {
        first_name: firstName ?? "",
        last_name: lastName.join(" ") ?? "",
        email: userSession.email,
        phone: "",
      },
    };

    const response = await snap.createTransaction(parameter);
    const { token } = response;

    const { error: transactionError } = await supabase.from("transactions").insert({
      id: orderId,
      user_id: userId,
      product_id: data.id,
      amount: data.price,
      status: "created",
    });

    if (transactionError) {
      throw new Error(transactionError.message);
    }

    return {
      success: true,
      data: token,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Terjadi kesalahan",
    };
  }
};
