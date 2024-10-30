"use server";
import { createClient } from "@/utils/supabase/server";

export async function getAllVocabularies() {
  const supabase = await createClient();
  const { data, error } = await supabase.from("vocabularies").select("*");

  if (error) {
    throw new Error(error.message);
  }

  if (!data || data.length === 0) {
    throw new Error("No data found");
  }

  return data;
}
