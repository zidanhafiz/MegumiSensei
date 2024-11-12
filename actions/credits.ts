"use server";
import { createClient } from "@/utils/supabase/server";
import { buyCreditsSchema } from "@/utils/zodSchemas";
import Xendit from "xendit-node";

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

    const { data: session, error: sessionError } = await supabase.auth.getUser();

    if (sessionError) {
      throw new Error(sessionError.message);
    }

    if (!session.user) {
      throw new Error("User tidak ditemukan");
    }

    if (userId !== session.user.id) {
      throw new Error("User tidak valid");
    }

    const { email } = session.user;

    const xendit = new Xendit({
      secretKey: process.env.XENDIT_SECRET_KEY!,
    });

    const response = await xendit.Invoice.createInvoice({
      data: {
        amount: data.price,
        currency: "IDR",
        externalId: `credits-${data.id}-user-${userId}`,
        shouldSendEmail: email ? true : false,
        payerEmail: email,
        description: `Pembelian kredit ${data.sku} untuk ${email}`,
        customer: {
          customerId: userId,
          email: email,
        },
        items: [
          {
            name: data.sku,
            price: data.price,
            quantity: 1,
            referenceId: data.id.toString(),
            category: "CREDITS",
          },
        ],
        successRedirectUrl: `${process.env.NEXT_PUBLIC_APP_URL}/profile`,
        failureRedirectUrl: `${process.env.NEXT_PUBLIC_APP_URL}/profile/buy-credits/error`,
      },
    });

    return {
      success: true,
      data: response.invoiceUrl,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Terjadi kesalahan",
    };
  }
};
