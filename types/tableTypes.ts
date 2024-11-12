import { Tables } from "./supabase";

export type Vocabulary = Tables<"vocabularies">;
export type HirakataGame = Tables<"hirakata_games">;
export type User = Tables<"users">;
export type Credit = Tables<"credits">;
export type Transaction = Tables<"transactions">;
