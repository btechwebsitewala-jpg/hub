export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      appointments: {
        Row: {
          admin_notes: string | null
          appointment_date: string
          collection_address: string | null
          confirmed_at: string | null
          confirmed_by: string | null
          created_at: string
          email: string
          first_name: string
          id: string
          last_name: string
          notes: string | null
          phone: string
          reference_number: string
          report_id: string | null
          results_ready_at: string | null
          results_status: string | null
          sample_collection: string
          status: Database["public"]["Enums"]["appointment_status"]
          test_type: string
          time_slot: string
          updated_at: string
          user_id: string | null
        }
        Insert: {
          admin_notes?: string | null
          appointment_date: string
          collection_address?: string | null
          confirmed_at?: string | null
          confirmed_by?: string | null
          created_at?: string
          email: string
          first_name: string
          id?: string
          last_name: string
          notes?: string | null
          phone: string
          reference_number: string
          report_id?: string | null
          results_ready_at?: string | null
          results_status?: string | null
          sample_collection: string
          status?: Database["public"]["Enums"]["appointment_status"]
          test_type: string
          time_slot: string
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          admin_notes?: string | null
          appointment_date?: string
          collection_address?: string | null
          confirmed_at?: string | null
          confirmed_by?: string | null
          created_at?: string
          email?: string
          first_name?: string
          id?: string
          last_name?: string
          notes?: string | null
          phone?: string
          reference_number?: string
          report_id?: string | null
          results_ready_at?: string | null
          results_status?: string | null
          sample_collection?: string
          status?: Database["public"]["Enums"]["appointment_status"]
          test_type?: string
          time_slot?: string
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      inquiries: {
        Row: {
          admin_response: string | null
          company_name: string | null
          created_at: string
          department: string | null
          email: string
          estimated_volume: string | null
          id: string
          inquiry_type: Database["public"]["Enums"]["inquiry_type"]
          message: string | null
          name: string
          original_reference: string | null
          phone: string | null
          reference_number: string
          responded_at: string | null
          responded_by: string | null
          selected_tests: string[] | null
          status: Database["public"]["Enums"]["inquiry_status"]
          subject: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          admin_response?: string | null
          company_name?: string | null
          created_at?: string
          department?: string | null
          email: string
          estimated_volume?: string | null
          id?: string
          inquiry_type: Database["public"]["Enums"]["inquiry_type"]
          message?: string | null
          name: string
          original_reference?: string | null
          phone?: string | null
          reference_number: string
          responded_at?: string | null
          responded_by?: string | null
          selected_tests?: string[] | null
          status?: Database["public"]["Enums"]["inquiry_status"]
          subject?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          admin_response?: string | null
          company_name?: string | null
          created_at?: string
          department?: string | null
          email?: string
          estimated_volume?: string | null
          id?: string
          inquiry_type?: Database["public"]["Enums"]["inquiry_type"]
          message?: string | null
          name?: string
          original_reference?: string | null
          phone?: string | null
          reference_number?: string
          responded_at?: string | null
          responded_by?: string | null
          selected_tests?: string[] | null
          status?: Database["public"]["Enums"]["inquiry_status"]
          subject?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          address: string | null
          created_at: string
          date_of_birth: string | null
          email: string | null
          first_name: string | null
          id: string
          last_name: string | null
          phone: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          address?: string | null
          created_at?: string
          date_of_birth?: string | null
          email?: string | null
          first_name?: string | null
          id?: string
          last_name?: string | null
          phone?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          address?: string | null
          created_at?: string
          date_of_birth?: string | null
          email?: string | null
          first_name?: string | null
          id?: string
          last_name?: string | null
          phone?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      reports: {
        Row: {
          appointment_id: string
          created_at: string | null
          created_by: string | null
          critical_values: string | null
          doctor_notes: string | null
          file_url: string | null
          findings: string | null
          id: string
          is_abnormal: boolean | null
          recommendations: string | null
          report_date: string
          report_number: string
          report_status: string | null
          test_results: string
          updated_at: string | null
        }
        Insert: {
          appointment_id: string
          created_at?: string | null
          created_by?: string | null
          critical_values?: string | null
          doctor_notes?: string | null
          file_url?: string | null
          findings?: string | null
          id?: string
          is_abnormal?: boolean | null
          recommendations?: string | null
          report_date?: string
          report_number: string
          report_status?: string | null
          test_results: string
          updated_at?: string | null
        }
        Update: {
          appointment_id?: string
          created_at?: string | null
          created_by?: string | null
          critical_values?: string | null
          doctor_notes?: string | null
          file_url?: string | null
          findings?: string | null
          id?: string
          is_abnormal?: boolean | null
          recommendations?: string | null
          report_date?: string
          report_number?: string
          report_status?: string | null
          test_results?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "reports_appointment_id_fkey"
            columns: ["appointment_id"]
            isOneToOne: false
            referencedRelation: "appointments"
            referencedColumns: ["id"]
          },
        ]
      }
      test_bookings: {
        Row: {
          created_at: string | null
          id: string
          notes: string | null
          patient_address: string
          patient_email: string
          patient_name: string
          patient_phone: string
          preferred_date: string
          preferred_time: string
          reference_number: string
          sample_collection: string
          status: string
          test_category: string
          test_name: string
          test_price: number
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          notes?: string | null
          patient_address: string
          patient_email: string
          patient_name: string
          patient_phone: string
          preferred_date: string
          preferred_time: string
          reference_number: string
          sample_collection: string
          status?: string
          test_category: string
          test_name: string
          test_price: number
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          notes?: string | null
          patient_address?: string
          patient_email?: string
          patient_name?: string
          patient_phone?: string
          preferred_date?: string
          preferred_time?: string
          reference_number?: string
          sample_collection?: string
          status?: string
          test_category?: string
          test_name?: string
          test_price?: number
          updated_at?: string | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      assign_admin_role: {
        Args: { secret_key: string; target_user_id: string }
        Returns: boolean
      }
      generate_report_number: { Args: never; Returns: string }
      generate_test_booking_reference: { Args: never; Returns: string }
      has_role:
        | {
            Args: {
              _role: Database["public"]["Enums"]["app_role"]
              _user_id: string
            }
            Returns: boolean
          }
        | { Args: { role_name: string }; Returns: boolean }
      is_admin: { Args: never; Returns: boolean }
    }
    Enums: {
      app_role: "admin" | "user"
      appointment_status:
        | "pending"
        | "confirmed"
        | "completed"
        | "cancelled"
        | "no_show"
      inquiry_status: "pending" | "in_progress" | "completed" | "cancelled"
      inquiry_type: "contact" | "quote" | "results" | "appointment"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "user"],
      appointment_status: [
        "pending",
        "confirmed",
        "completed",
        "cancelled",
        "no_show",
      ],
      inquiry_status: ["pending", "in_progress", "completed", "cancelled"],
      inquiry_type: ["contact", "quote", "results", "appointment"],
    },
  },
} as const
