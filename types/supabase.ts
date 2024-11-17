export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          operationName?: string
          query?: string
          variables?: Json
          extensions?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      credits: {
        Row: {
          amount: number
          created_at: string
          id: number
          price: number
          sku: string
        }
        Insert: {
          amount: number
          created_at?: string
          id?: number
          price: number
          sku: string
        }
        Update: {
          amount?: number
          created_at?: string
          id?: number
          price?: number
          sku?: string
        }
        Relationships: []
      }
      game_sessions: {
        Row: {
          created_at: string
          expired_at: string
          game_type: string
          id: number
          is_finished: boolean
          is_started: boolean
          user_id: string | null
        }
        Insert: {
          created_at?: string
          expired_at: string
          game_type: string
          id?: number
          is_finished?: boolean
          is_started?: boolean
          user_id?: string | null
        }
        Update: {
          created_at?: string
          expired_at?: string
          game_type?: string
          id?: number
          is_finished?: boolean
          is_started?: boolean
          user_id?: string | null
        }
        Relationships: []
      }
      hirakata_games: {
        Row: {
          answer: string
          created_at: string
          id: number
          is_answered: boolean
          is_correct: boolean | null
          options: string[]
          question: string
          updated_at: string
          user_answer: string | null
        }
        Insert: {
          answer: string
          created_at?: string
          id?: number
          is_answered?: boolean
          is_correct?: boolean | null
          options: string[]
          question: string
          updated_at?: string
          user_answer?: string | null
        }
        Update: {
          answer?: string
          created_at?: string
          id?: number
          is_answered?: boolean
          is_correct?: boolean | null
          options?: string[]
          question?: string
          updated_at?: string
          user_answer?: string | null
        }
        Relationships: []
      }
      transactions: {
        Row: {
          amount: number | null
          created_at: string
          id: string
          mt_transaction_id: string | null
          payment_channel: string | null
          payment_method: string | null
          product_id: number
          status: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          amount?: number | null
          created_at?: string
          id: string
          mt_transaction_id?: string | null
          payment_channel?: string | null
          payment_method?: string | null
          product_id: number
          status: string
          updated_at?: string | null
          user_id?: string
        }
        Update: {
          amount?: number | null
          created_at?: string
          id?: string
          mt_transaction_id?: string | null
          payment_channel?: string | null
          payment_method?: string | null
          product_id?: number
          status?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "transactions_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "credits"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "transactions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["user_id"]
          },
        ]
      }
      users: {
        Row: {
          avatar_url: string | null
          created_at: string
          credits: number
          email: string | null
          full_name: string | null
          is_anonymous: boolean | null
          is_reset: boolean
          is_verified: boolean
          updated_at: string | null
          user_id: string
          username: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          credits?: number
          email?: string | null
          full_name?: string | null
          is_anonymous?: boolean | null
          is_reset?: boolean
          is_verified?: boolean
          updated_at?: string | null
          user_id?: string
          username?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          credits?: number
          email?: string | null
          full_name?: string | null
          is_anonymous?: boolean | null
          is_reset?: boolean
          is_verified?: boolean
          updated_at?: string | null
          user_id?: string
          username?: string | null
        }
        Relationships: []
      }
      vocabularies: {
        Row: {
          category: string
          created_at: string
          id: number
          kanji: string | null
          level: string[]
          meaning: string
          romaji: string
          type: string
          word: string
        }
        Insert: {
          category: string
          created_at?: string
          id?: number
          kanji?: string | null
          level: string[]
          meaning: string
          romaji: string
          type: string
          word: string
        }
        Update: {
          category?: string
          created_at?: string
          id?: number
          kanji?: string | null
          level?: string[]
          meaning?: string
          romaji?: string
          type?: string
          word?: string
        }
        Relationships: []
      }
      vocabularies_length: {
        Row: {
          created_at: string
          current_length: number
          id: number
          previous_length: number
          updated_at: string | null
        }
        Insert: {
          created_at?: string
          current_length: number
          id?: number
          previous_length: number
          updated_at?: string | null
        }
        Update: {
          created_at?: string
          current_length?: number
          id?: number
          previous_length?: number
          updated_at?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_vocabularies_length: {
        Args: {
          vocab_length: number
        }
        Returns: number
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

