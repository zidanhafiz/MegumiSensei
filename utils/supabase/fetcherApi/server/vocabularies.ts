"use server";
import { createClient } from "@/utils/supabase/server";
import { randomInt } from "crypto";

export async function getVocabulariesLength() {
  const supabase = await createClient();
  const { data, error } = await supabase.from("vocabularies_length").select("*").single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function getAllVocabularies() {
  const { current_length: vocabulariesLength } = await getVocabulariesLength();

  const randomStartRange = randomInt(0, vocabulariesLength - 61);

  const supabase = await createClient();

  const { data, error } = await supabase
    .from("vocabularies")
    .select("*")
    .range(randomStartRange, vocabulariesLength - 1)
    .limit(30);

  if (error) {
    throw new Error(error.message);
  }

  if (!data || data.length === 0) {
    throw new Error("No data found");
  }

  return data;
}

export async function getFilteredVocabularies(filterOptions: {
  type: "both" | "hiragana" | "katakana";
  level: "mix" | "n5" | "n4";
  startRange: "random" | number;
}) {
  const supabase = await createClient();

  const levelValue = filterOptions.level === "mix" ? "mix" : filterOptions.level === "n5" ? "n4" : "n5";
  const typeValue = filterOptions.type === "both" ? ["hiragana", "katakana"] : [filterOptions.type];

  const { current_length: vocabulariesLength } = await getVocabulariesLength();

  let startRange: number;

  if (filterOptions.startRange === "random" || filterOptions.startRange >= vocabulariesLength - 61) {
    startRange = randomInt(0, vocabulariesLength - 61);
  } else {
    startRange = filterOptions.startRange;
  }

  if (!typeValue.includes("hiragana")) {
    const { data, error } = await supabase.from("vocabularies").select("*").in("type", typeValue);

    if (error) {
      throw new Error(error.message);
    }

    return data;
  }

  const { data, error } = await supabase
    .from("vocabularies")
    .select("*")
    .in("type", typeValue)
    .not("level", "cd", `{${levelValue}}`)
    .range(startRange, vocabulariesLength - 1)
    .limit(60);

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
